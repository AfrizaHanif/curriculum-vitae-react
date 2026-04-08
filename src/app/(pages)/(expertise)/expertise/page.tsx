import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import Feature from "@/components/ui/bootstrap/feature";
import Modal from "@/components/ui/bootstrap/modal";
import { expertiseItems } from "@/lib/data/expertiseData";
import { portfolioItems } from "@/lib/data/portfolioData";
import {
  HeroesButtonItem,
  ModalButtonItem,
  FeatureItem,
} from "@/types/bootstrap-types";
import { Metadata } from "next";
import Link from "next/link";
import jumbotronImage from "../../../../assets/images/jumbotron/expertise.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import { ExpertiseItem } from "@/types/customs/data-type";
import ErrorToast from "@/components/home/error-toast";
import { normalizeData } from "@/lib/normalize";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Ringkasan Keahlian",
  description:
    "Pelajari keahlian yang saya miliki beserta proyek yang terlibat",
};

export default async function Expertise() {
  const [expertiseResult] = await Promise.all([
    fetchWithFallback<ExpertiseItem[]>(
      fetchLaravel<ExpertiseItem[]>("api/expertises", {
        next: { revalidate: 3600, tags: ["profile"] },
        skipAuth: true,
      }),
      expertiseItems, // Static Fallback
      "Gagal memuat data Keahlian terbaru.", // Error Message
      (data) => Array.isArray(data), // Relaxed Validator
    ),
  ]);

  const fetchErrorMessage = expertiseResult.error;

  // Items of button for modal
  const modalButtonItems: ModalButtonItem[] = [
    {
      label: "Tutup",
      type: "button",
      color: "secondary",
      dismiss: true,
    },
  ];

  // Map expertise items to include button configuration
  const expertiseItemsWithButton: FeatureItem[] = normalizeData<FeatureItem>(
    expertiseResult.data,
    {
      // Using the new explicit transform rule for the complex button object
      button: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transform: (item: any) => ({
          label: "Dibuktikan dalam proyek...",
          dataToggle: "modal",
          dataTarget: item.id,
          href: "#",
        }),
      },
    },
    { icon: "patch-check" }, // Provide default icon via the new defaults parameter
  );

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat Portofolio",
      color: "primary",
      href: `/portfolio`,
    },
    {
      label: "Hubungi Saya",
      color: "secondary",
      href: `/contact`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ringkasan Keahlian | Muhammad Afriza Hanif",
    description:
      "Pelajari keahlian yang saya miliki beserta proyek yang terlibat",
    url: "https://afrizahanif.com/expertise",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: expertiseResult.data.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
      })),
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Ringkasan Keahlian"
        description="Saya mengubah ide kompleks menjadi solusi web yang fungsional, intuitif, dan berbasis data."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* List of Expertise */}
      {expertiseResult.data.length > 0 ? (
        <section aria-label="Daftar Keahlian">
          <Feature
            items={expertiseItemsWithButton}
            id="expertise"
            type="columns"
            itemPerRow={2}
            iconType="bi"
            chevron
          />
        </section>
      ) : (
        <div className="text-center py-5">
          <p className="lead">Informasi keahlian belum tersedia.</p>
        </div>
      )}

      {/* Modal */}
      {expertiseResult.data
        .filter((item) => item.id)
        .map((item) => {
          const linkedProjects = item.projects
            ? portfolioItems.filter((project) =>
                item.projects!.includes(project.id),
              )
            : [];

          return (
            <Modal
              key={item.id}
              id={item.id}
              buttonItems={modalButtonItems}
              title={item.title}
              size="lg"
            >
              {/* Check if linked projects are available */}
              {linkedProjects.length > 0 ? (
                <>
                  <p className="lead">
                    Keahlian ini telah dibuktikan pada proyek sebagai berikut:
                  </p>
                  <ul className="list-unstyled">
                    {linkedProjects.map((project) => (
                      <li key={project.id} className="mb-2">
                        <div className="row justify-content-center align-items-center gy-3 g-sm-2">
                          <div className="col-12 col-sm-8 fw-medium">
                            {project.title}
                          </div>
                          <div className="col-12 col-sm-4">
                            <Link href={`/portfolio/${project.slug}`}>
                              <div className="d-grid" data-bs-dismiss="modal">
                                <Button color="primary">Lihat Proyek</Button>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="lead">
                  Saat ini belum ada proyek yang dapat ditampilkan untuk
                  keahlian ini.
                </p>
              )}
            </Modal>
          );
        })}

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Lihat Penerapannya"
          buttonItem={nextPageHeroesButtonItem}
          icon="portfolio"
        >
          Ingin melihat bagaimana saya menerapkan keahlian ini? Lihat
          proyek-proyek yang telah saya kerjakan, atau hubungi saya
        </Heroes>
      </section>

      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
