"use client";

import { use } from "react";
import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { portfolioItems, repositoryItems } from "@/lib/data/portfolioData";
import { notFound, redirect } from "next/navigation";
import ProjectGallery from "@/components/ui/customs/project-gallery";
import Link from "next/link";
import ButtonGroup from "@/components/ui/bootstrap/button-group";
import { DropdownItem } from "@/lib/bootstrap-types";
import DetailItem from "@/components/ui/customs/detail-item";

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
  const filteredRepositoryItems: DropdownItem[] = repositoryItems.filter(
    (repo) => repo?.portfolio_id === item.id,
  ) as DropdownItem[];

  return (
    <AppLayout>
      {/* Set Title into Breadcrumb */}
      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <Jumbotron backgroundColor="secondary" className="my-3">
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold">{item.title}</h1>
          <p className="fs-4">
            {item.category} - {item.subcategory}
          </p>
        </div>
      </Jumbotron>
      {/* Contents */}
      <div className="row justify-content-center g-2">
        <div className="col-8">
          {/* Gallery */}
          <ProjectGallery
            mainImage={item.image}
            images={item.gallery}
            altText={item.title}
          />
          {/* Description */}
          <div className="mt-4">
            <h2 className="lh-1">Deskripsi Proyek</h2>
            <p className="lead">{item.description}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="sticky-top" style={{ top: "1rem" }}>
            {/* Navigation */}
            <div className="pb-3">
              <div className="row justify-content-center g-2">
                <div className="col">
                  <Link href={`/portfolio`}>
                    <Button color="secondary" outline>
                      <i className="bi bi-arrow-return-left pe-2"></i>
                      Kembali
                    </Button>
                  </Link>
                </div>
                <div className="col text-end">
                  <ButtonGroup role={"group"} arialabel={"port-nav"}>
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
            </div>
            {/* Details */}
            <DetailItem
              type={"Portfolio"}
              item={item}
              repositoryItems={filteredRepositoryItems}
              caseStudyLink={`/portfolio/${item.slug}/case-study/`}
              shareable
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
