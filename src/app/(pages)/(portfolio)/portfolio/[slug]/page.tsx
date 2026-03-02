"use client";

import { use } from "react";
import AppLayout from "@/components/layouts/layout";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import {
  portfolioItems,
  repositoryItems,
  featureItems,
  caseStudyItems,
} from "@/lib/data/portfolioData";
import { notFound, redirect } from "next/navigation";
import ProjectGallery from "@/components/ui/customs/project-gallery";
import { DropdownItem } from "@/lib/bootstrap-types";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import { techIcons } from "@/lib/data/techIcons";
import SlugNavigation from "@/components/ui/customs/slug-navigation";

// INFO: Different than project and blog page, this page are splitted out into 2 (layout.tsx and page.tsx). This page is a client component

export default function SelectedPortfolio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //
  const { slug: rawSlug } = use(params);
  const slug = decodeURIComponent(rawSlug);
  // Find portfolio item by slug (case-insensitive) or ID
  const item = portfolioItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug,
  );
  console.log("Item of selected portfolio: ", item);
  if (!item) return notFound(); // Check if item are not found

  // Redirect to canonical slug if the request was for an ID or a non-canonical case
  if (slug !== item.slug) {
    redirect(`/portfolio/${encodeURIComponent(item.slug)}`);
  }

  // Item of repository
  const filteredRepositoryItems: DropdownItem[] = repositoryItems
    .filter((repo) => repo?.portfolio_id === item.id)
    .map((repo) => ({ ...repo, newTab: true })) as DropdownItem[];

  // Check if case study exists
  const hasCaseStudy = caseStudyItems.some((cs) => cs.portfolio_id === item.id);

  // Get Data of Feature
  const filteredFeatures = featureItems.filter(
    (feature) => feature.portfolio_id === item.id,
  );

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Project",
        name: item.title,
        description: item.description,
        url: `https://afrizahanif.com/portfolio/${item.slug}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: (item.image as any)?.src || item.image, // Handle StaticImageData or string
        keywords: `${item.category}, ${item.subcategory}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://afrizahanif.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://afrizahanif.com/portfolio",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `https://afrizahanif.com/portfolio/${item.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Set Title into Breadcrumb */}
      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <JumbotronTitle
        title={item.title}
        description={`${item.category} - ${item.subcategory}`}
        className="my-3"
      />

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
          {filteredFeatures.length > 0 && (
            <section id="project-features" className="mt-4">
              <h3 className="h4 mb-3">Fitur Utama</h3>
              <ul className="list-group list-group-flush">
                {filteredFeatures.map((feature) => (
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
            <SlugNavigation
              items={portfolioItems}
              item={item}
              backURL="portfolio"
            />
            {/* Details */}
            <DetailItem
              type={"Portfolio"}
              item={item}
              repositoryItems={filteredRepositoryItems}
              caseStudyLink={
                hasCaseStudy ? `/portfolio/${item.slug}/case-study/` : undefined
              }
              shareable
            />
          </div>
        </aside>
      </main>
    </AppLayout>
  );
}
