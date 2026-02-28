"use client";

import { use } from "react";
import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import {
  portfolioItems,
  repositoryItems,
  caseStudyItems,
} from "@/lib/data/portfolioData";
import { notFound, redirect } from "next/navigation";
import ProjectGallery from "@/components/ui/customs/project-gallery";
import Link from "next/link";
import ButtonGroup from "@/components/ui/bootstrap/button-group";
import { DropdownItem } from "@/lib/bootstrap-types";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";

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

  // Navigation's Function
  const currentIndex = portfolioItems.findIndex((p) => p.slug === item.slug);
  const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < portfolioItems.length - 1
      ? portfolioItems[currentIndex + 1]
      : null;

  // Item of repository
  const filteredRepositoryItems: DropdownItem[] = repositoryItems
    .filter((repo) => repo?.portfolio_id === item.id)
    .map((repo) => ({ ...repo, newTab: true })) as DropdownItem[];

  // Check if case study exists
  const hasCaseStudy = caseStudyItems.some((cs) => cs.portfolio_id === item.id);

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
        <article className="col-12 col-lg-8 order-2 order-lg-1">
          <section id="project-gallery">
            <ProjectGallery
              mainImage={item.image}
              images={item.gallery}
              altText={item.title}
            />
          </section>
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
        </article>
        <aside className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            {/* Menu button */}
            <nav className="pb-3" aria-label="Portfolio item navigation">
              <div className="row justify-content-center g-2">
                {/* Back to list of portfolio */}
                <div className="col">
                  <Link href={`/portfolio`}>
                    <Button color="secondary" outline>
                      <i className="bi bi-arrow-return-left pe-2"></i>
                      Kembali
                    </Button>
                  </Link>
                </div>
                {/* Navigation */}
                <div className="col text-end">
                  <ButtonGroup role={"group"} arialabel={"port-nav"}>
                    {/* Prev Item */}
                    {prevItem ? (
                      <Link href={`/portfolio/${prevItem.slug}`}>
                        <Button
                          color="secondary"
                          style={{
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }}
                          outline
                        >
                          <i className="bi bi-arrow-left pe-2"></i>
                          Prev
                        </Button>
                      </Link>
                    ) : (
                      <Button color="secondary" outline disabled>
                        <i className="bi bi-arrow-left pe-2"></i>
                        Prev
                      </Button>
                    )}
                    {/* Next Item */}
                    {nextItem ? (
                      <Link href={`/portfolio/${nextItem.slug}`}>
                        <Button
                          color="secondary"
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                          }}
                          outline
                        >
                          Next
                          <i className="bi bi-arrow-right ps-2"></i>
                        </Button>
                      </Link>
                    ) : (
                      <Button color="secondary" outline disabled>
                        Next
                        <i className="bi bi-arrow-right ps-2"></i>
                      </Button>
                    )}
                  </ButtonGroup>
                </div>
              </div>
            </nav>
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
