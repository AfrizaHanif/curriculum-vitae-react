import AppLayout from "@/components/layouts/layout";
import NextImage from "@/components/ui/next/next-image";
import setupImage from "../../../../../public/images/Setup.png";
import { Metadata } from "next";
import Accordion from "@/components/ui/bootstrap/accordion";
import { setupItems } from "@/lib/data/profileData";
import jumbotronImage from "../../../../assets/images/jumbotron/setup.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Peralatan Saya",
  description: "Pelajari peralatan yang saya miliki selama mengerjakan proyek",
};

export default function Setup() {
  // Group items by category to fit AccordionItem structure
  const categories = Array.from(
    new Set(setupItems.map((item) => item.category)),
  );
  console.log("Categories: ", categories);

  // Get items for accordion
  const accordionItems = categories.map((category) => ({
    title: category,
    content: (
      <div className="list-group list-group-flush">
        {/* Get items data in every categories */}
        {setupItems
          .filter((item) => item.category === category)
          .map((item) => (
            <div key={item.name} className="list-group-item">
              <div className="fw-bold">{item.name}</div>
              <div className="mb-1">{item.description}</div>
              {item.why && (
                <small className="text-body-secondary">{item.why}</small>
              )}
            </div>
          ))}
      </div>
    ),
  }));
  console.log("Items of Accordion: ", accordionItems.length);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Peralatan Saya | Muhammad Afriza Hanif",
    description:
      "Pelajari peralatan yang saya miliki selama mengerjakan proyek",
    url: "https://afrizahanif.com/setup",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: setupItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      })),
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Peralatan Saya"
        description="Sekilas tentang perangkat keras, perangkat lunak, dan alat yang saya gunakan setiap hari."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Content */}
      <section className="row justify-content-center g-4">
        {/* Image of current setup */}
        <div className="col-12 col-lg-6">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            <NextImage
              src={setupImage}
              alt="Setup Image"
              className="rounded-3 w-100"
              style={{
                aspectRatio: "16 / 9",
                objectFit: "cover",
                height: "auto",
                objectPosition: "top",
                boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.5)",
              }}
            ></NextImage>
          </div>
        </div>
        {/* List of current setup */}
        <div className="col-12 col-lg-6">
          <Accordion
            id="my-new-accordion"
            items={accordionItems}
            openItemIndex={0}
          />
        </div>
      </section>
    </AppLayout>
  );
}
