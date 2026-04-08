"use client";

import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import ProjectGallery from "@/components/ui/customs/project-gallery";
import DetailItem from "@/components/ui/customs/detail-item";
import SlugNavigation from "@/components/ui/customs/slug-navigation";
import Heroes from "@/components/ui/bootstrap/heroes";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import { techIcons } from "@/lib/data/techIcons";
import { DropdownItem, HeroesButtonItem } from "@/types/bootstrap-types";
import { PortfolioItem } from "@/types/customs/data-type";

interface PortfolioDetailProps {
  item: PortfolioItem;
  allItems: PortfolioItem[];
  repositoryItems: DropdownItem[];
  hasCaseStudy: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any[];
}

export default function PortfolioDetail({
  item,
  allItems,
  repositoryItems,
  hasCaseStudy,
  features,
}: PortfolioDetailProps) {
  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Hubungi Saya",
      color: "primary",
      href: `/contact`,
    },
    {
      label: "Lihat Proyek Lain",
      color: "secondary",
      href: `/project`,
      outline: true,
    },
  ];

  return (
    <>
      {/* Set Title into Breadcrumb */}
      <BreadcrumbSetter title={item.title} />

      {/* Contents */}
      <main className="row justify-content-center g-2">
        {/* Main */}
        <article className="col-12 col-lg-8 order-2 order-lg-1">
          {/* Gallery */}
          <section id="project-gallery">
            <ProjectGallery
              mainImage={item.image}
              images={item.gallery}
              altText={item.title}
            />
          </section>
          {/* Description */}
          <section
            id="project-description"
            aria-labelledby="project-description-heading"
            className="mt-4"
          >
            <h2 id="project-description-heading" className="lh-1">
              Deskripsi Proyek
            </h2>
            <p className="lead">{item.description}</p>
          </section>
          {/* Key Features */}
          {features.length > 0 && (
            <section id="project-features" className="mt-4">
              <h3 className="h4 mb-3">Fitur Utama</h3>
              <ul className="list-group list-group-flush">
                {features.map((feature) => (
                  <li
                    key={feature.id}
                    className="list-group-item bg-transparent px-0 d-flex align-items-start"
                  >
                    <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                    <div>
                      <span className="fw-semibold">{feature.title}</span>
                      <p className="mb-0 small text-body-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* Technology Used */}
          {item.technology && item.technology.length > 0 && (
            <section id="technology-used" className="mt-4">
              <h3 className="h4 mb-3">Teknologi yang Digunakan</h3>
              <CardGroup cardPerRow={4}>
                {item.technology.map((tech, index) => (
                  <Card key={index} insideGroup>
                    <div className="d-flex flex-column align-items-center">
                      {techIcons[tech] && (
                        <div
                          style={{ width: "40px", height: "24px" }}
                          className="mb-4"
                        >
                          {techIcons[tech]}
                        </div>
                      )}
                      <span>{tech}</span>
                    </div>
                  </Card>
                ))}
              </CardGroup>
            </section>
          )}
        </article>
        {/* Sidebar */}
        <aside className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            {/* Menu button */}
            <SlugNavigation item={item} items={allItems} backURL="portfolio" />
            {/* Details */}
            <DetailItem
              type={"Portfolio"}
              item={item}
              repositoryItems={repositoryItems}
              caseStudyLink={
                hasCaseStudy ? `/portfolio/${item.slug}/case-study/` : undefined
              }
              shareable
            />
          </div>
        </aside>
      </main>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Tertarik untuk Berkolaborasi?"
          buttonItem={nextPageHeroesButtonItem}
          icon="contact"
        >
          Jika Anda menyukai proyek ini dan ingin mendiskusikan bagaimana kita
          bisa bekerja sama, jangan ragu untuk menghubungi saya. Atau, Anda bisa
          melihat proyek saya yang lain
        </Heroes>
      </section>
    </>
  );
}
