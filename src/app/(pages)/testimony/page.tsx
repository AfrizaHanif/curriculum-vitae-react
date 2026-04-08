import AppLayout from "@/components/layouts/layout";
import Card from "@/components/ui/bootstrap/card";
import CardGroup from "@/components/ui/bootstrap/card-group";
import { testimonyItems } from "@/lib/data/testimonyData";
import { Metadata } from "next";
import jumbotronImage from "../../../assets/images/jumbotron/testimonial.jpg";
import Alert from "@/components/ui/bootstrap/alert";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import { TestimonyItem } from "@/types/customs/data-type";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import ErrorToast from "@/components/home/error-toast";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Testimoni",
  description:
    "Koleksi testimoni-testimoni dari proyek yang telah saya kerjakan",
};

export default async function Testimony() {
  const [testimonyResult] = await Promise.all([
    fetchWithFallback<TestimonyItem[]>(
      fetchLaravel<TestimonyItem[]>("api/testimonies", {
        next: { revalidate: 3600, tags: ["profile"] },
        skipAuth: true,
      }),
      testimonyItems, // Static Fallback
      "Gagal memuat data Keahlian terbaru.", // Error Message
      (data) => Array.isArray(data), // Relaxed Validator
    ),
  ]);

  const fetchErrorMessage = testimonyResult.error;

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Hubungi Saya",
      color: "primary",
      href: `/contact`,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Testimoni | Muhammad Afriza Hanif",
    description:
      "Koleksi testimoni-testimoni dari proyek yang telah saya kerjakan",
    url: "https://afrizahanif.com/testimony",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: testimonyItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${item.name} - ${item.role}`,
      })),
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Testimoni"
        description="Koleksi testimoni-testimoni dari proyek yang telah saya kerjakan"
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Alert (Temporary) */}
      <Alert color={"warning"} withIcon>
        Halaman ini masih dalam tahap pengembangan
      </Alert>
      {/* Cards of Testimony */}
      <section aria-label="Daftar Testimoni">
        {testimonyItems.length > 0 ? (
          <CardGroup cardPerRow={2}>
            {testimonyItems.map((item) => (
              <Card key={item.id} insideGroup>
                <figure className="text-center">
                  <blockquote className="blockquote">
                    <p className="fst-italic">{item.content}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    <span className="fw-bold">{item.name}</span> (
                    <cite title="Source Title">{item.role}</cite>)
                  </figcaption>
                </figure>
              </Card>
            ))}
          </CardGroup>
        ) : (
          <Alert color={"danger"} withIcon>
            Tidak ada testimoni yang tersedia.
          </Alert>
        )}
      </section>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Hubungi Saya"
          buttonItem={nextPageHeroesButtonItem}
          icon="contact"
        >
          Yakin untuk bekerja sama? Hubungi saya sekarang untuk memulai proyek
          Anda
        </Heroes>
      </section>

      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
