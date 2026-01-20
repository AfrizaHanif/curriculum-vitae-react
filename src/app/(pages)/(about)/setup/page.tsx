import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NextImage from "@/components/ui/react/next-image";
import setupImage from "../../../../../public/images/Setup.png";
import { Metadata } from "next";
import Accordion from "@/components/ui/bootstrap/accordion";
import { setupItems } from "@/lib/data/profileData";
import jumbotronImage from "../../../../assets/images/jumbotron/setup.jpg";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Peralatan",
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

  return (
    <AppLayout>
      {/* Jumbotron */}
      <Jumbotron
        backgroundColor="secondary"
        textColor="dark"
        className="my-3"
        img={jumbotronImage.src}
      >
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold">Peralatan Saya</h1>
            <p className="col-md-8 fs-4">
              Sekilas tentang perangkat keras, perangkat lunak, dan alat yang
              saya gunakan setiap hari.
            </p>
          </div>
        </div>
      </Jumbotron>
      {/* Content */}
      <div className="row justify-content-center g-2">
        {/* Image of current setup */}
        <div className="col-6">
          <div className="sticky-top" style={{ top: "1rem" }}>
            <NextImage
              src={setupImage}
              alt="Setup Image"
              className="rounded-3"
              width={500}
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
        <div className="col-6">
          <Accordion
            id="my-new-accordion"
            items={accordionItems}
            openItemIndex={0}
          />
        </div>
      </div>
    </AppLayout>
  );
}
