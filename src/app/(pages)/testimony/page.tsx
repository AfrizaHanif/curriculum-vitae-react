import AppLayout from "@/components/layouts/layout";
import Card from "@/components/ui/bootstrap/card";
import CardGroup from "@/components/ui/bootstrap/card-group";
import { testimonyItems } from "@/lib/data/testimonyData";
import { Metadata } from "next";
import jumbotronImage from "../../../assets/images/jumbotron/testimonial.jpg";
import Alert from "@/components/ui/bootstrap/alert";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Testimoni",
  description:
    "Koleksi testimoni-testimoni dari proyek yang telah saya kerjakan",
};

export default function Testimony() {
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
        name: `${item.name} - ${item.title}`,
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
      <Alert color={"warning"}>
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
                    <cite title="Source Title">{item.title}</cite>)
                  </figcaption>
                </figure>
              </Card>
            ))}
          </CardGroup>
        ) : (
          <Alert color={"danger"}>Tidak ada testimoni yang tersedia.</Alert>
        )}
      </section>
    </AppLayout>
  );
}
