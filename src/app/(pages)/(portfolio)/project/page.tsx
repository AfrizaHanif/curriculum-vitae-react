"use client";

import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import Alert from "@/components/ui/bootstrap/alert";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import NextImage from "@/components/ui/next/next-image";
import { projectItems } from "@/lib/data/portfolioData";
import { formatDate, sortItems, SortOrder } from "@/lib/utils";
import Link from "next/link";
import jumbotronImage from "../../../../assets/images/jumbotron/project.jpg";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import { useState } from "react";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/lib/bootstrap-types";

const STATUS_COLORS: Record<string, string> = {
  Planning: "text-bg-secondary",
  Active: "text-bg-primary",
  Delayed: "text-bg-warning",
  Cancelled: "text-bg-danger",
  Finished: "text-bg-success",
};

const STATUS_TEXT: Record<string, string> = {
  Planning: "Dalam Rencana",
  Active: "Aktif",
  Delayed: "Ditunda",
  Cancelled: "Dibatalkan",
  Finished: "Selesai",
};

export default function Project() {
  // Set useState for replacing element
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // Sort items based on selection
  const sortedItems = sortItems(projectItems, {
    sortOrder,
    titleKey: "title",
    primaryDateKey: "start_period",
  });
  console.log("Sort selected: ", sortOrder);

  // Render cards for card item
  const renderCards = (items: typeof projectItems) => (
    <PaginatedList
      items={items}
      itemsPerPage={9}
      key={sortOrder}
      renderItem={(item) => (
        <CardBlank key={item.id} fullHeight insideGroup>
          {/* Category and type */}
          <div className="card-header small fw-semibold text-body-secondary">
            <span className="text-uppercase">{item.category}</span> -{" "}
            {item.type}
          </div>
          {/* Main image of project */}
          <div
            className="position-relative bg-body-tertiary"
            style={{ aspectRatio: "16 / 9" }}
          >
            <NextImage
              src={item.image}
              alt={item.title}
              className="card-img-top rounded-0"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
              errorContent
            />
            {/* Status Badge */}
            {item.status && (
              <span
                className={`position-absolute top-0 end-0 badge m-2 shadow-sm ${
                  STATUS_COLORS[item.status] || "text-bg-secondary"
                }`}
              >
                {STATUS_TEXT[item.status] || "Unknown"}
              </span>
            )}
          </div>
          {/* Short content */}
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{item.title}</h5>
            <div className="mt-auto pt-2">
              {item.tags.map((tag) => (
                <span key={tag} className="badge text-bg-secondary me-1">
                  {tag}
                </span>
              ))}
              {item.technology.map((tech) => (
                <span key={tech} className="badge text-bg-info me-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {/* Period date and button */}
          <div className="card-footer text-body-secondary">
            <div className="row justify-content-center align-items-center g-2">
              <div className="col-8 small">{formatDate(item.start_period)}</div>
              <div className="col-4 text-end">
                <Link href={`/project/${item.slug}`}>
                  <Button color="primary" size="sm" stretchedLink>
                    Lihat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardBlank>
      )}
    />
  );

  // Extract unique categories from project items
  const uniqueCategories = Array.from(
    new Set(projectItems.map((item) => item.category)),
  );
  console.log("Category in tabs: ", uniqueCategories);

  // Items of tab
  const tabItems = [
    // All posts (No category filter)
    {
      id: "all",
      title: "Semua",
      content: renderCards(sortedItems),
    },
    // Post with category filter
    ...uniqueCategories.map((category) => ({
      id: category.toLowerCase().replace(/\s+/g, "-"),
      title: category,
      content: renderCards(
        sortedItems.filter((item) => item.category === category),
      ),
    })),
  ];

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Portofolio Utama",
      color: "primary",
      href: `/portfolio`,
    },
    {
      label: "Lihat Resume",
      color: "secondary",
      href: `/resume`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Proyek Lainnya | Muhammad Afriza Hanif",
    description: "Pelajari proyek-proyek yang sedang dikerjakan oleh saya",
    url: "https://afrizahanif.com/project",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projectItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://afrizahanif.com/project/${item.slug}`,
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
        title="Proyek Lainnya"
        description="Pelajari proyek-proyek yang sedang dikerjakan oleh saya"
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Status Alert */}
      <section className="container-fluid mb-3">
        <Alert color="info">
          <i className="bi bi-info-circle-fill me-2"></i>
          Proyek di halaman ini mungkin dapat ditunda, dilanjutkan, atau
          dibatalkan sewaktu-waktu.
        </Alert>
      </section>

      {/* Sorting Controls */}
      <section className="container-fluid mb-3" aria-label="Sorting Controls">
        <div className="d-flex justify-content-end align-items-center">
          <label htmlFor="sortOrder" className="me-2 fw-semibold">
            Urutkan:
          </label>
          <select
            id="sortOrder"
            className="form-select w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">Judul (A-Z)</option>
            <option value="za">Judul (Z-A)</option>
          </select>
        </div>
      </section>

      {/* List of Project (Cards) */}
      <section aria-label="Daftar Proyek">
        <NavTab id="project-tab" items={tabItems} />
      </section>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Lihat Portfolio"
          buttonItem={nextPageHeroesButtonItem}
          icon="portfolio"
        >
          Lihat proyek unggulan saya di halaman portofolio utama atau pelajari
          latar belakang saya
        </Heroes>
      </section>
    </AppLayout>
  );
}
