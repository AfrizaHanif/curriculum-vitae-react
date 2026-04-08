"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import NextImage from "@/components/ui/next/next-image";
import { formatDateRange, sortItems, SortOrder } from "@/lib/utils";
import { PortfolioItem } from "@/types/customs/data-type";
import { resolveAssetUrl } from "@/lib/assets";

interface PortfolioListProps {
  items: PortfolioItem[];
}

export default function PortfolioList({ items }: PortfolioListProps) {
  // Set useState for replacing element
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // Sort items based on selection
  const sortedItems = sortItems(items, {
    sortOrder,
    titleKey: "title",
    primaryDateKey: "finish_period",
    secondaryDateKey: "start_period",
  });

  // Render cards for card item
  const renderCards = (cardItems: PortfolioItem[]) => (
    <PaginatedList
      items={cardItems}
      itemsPerPage={9}
      key={sortOrder}
      renderItem={(item) => (
        <CardBlank key={item.id} fullHeight insideGroup>
          {/* Category and type */}
          <div className="card-header small fw-semibold text-body-secondary">
            <span className="text-uppercase">{item.category}</span> -{" "}
            {item.type}
          </div>
          {/* Main image of portfolio */}
          <div
            className="position-relative bg-body-tertiary"
            style={{ aspectRatio: "16 / 9" }}
          >
            <NextImage
              src={resolveAssetUrl(item.image)}
              alt={item.title}
              className="card-img-top rounded-0"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
              errorContent
            />
          </div>
          {/* Short content */}
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{item.title}</h5>
            <div className="mt-auto pt-2">
              {item.tags?.map((tag) => (
                <span key={tag} className="badge text-bg-secondary me-1">
                  {tag}
                </span>
              ))}
              {item.technology?.map((tech) => (
                <span key={tech} className="badge text-bg-info me-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {/* Period date and button */}
          <div className="card-footer text-body-secondary">
            <div className="row justify-content-center align-items-center g-2">
              <div className="col-8 small">
                {formatDateRange(item.start_period, item.finish_period)}
              </div>
              <div className="col-4 text-end">
                <Link href={`/portfolio/${item.slug}`}>
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

  // Extract unique categories from portfolio items
  const uniqueCategories = Array.from(
    new Set(items.map((item) => item.category)),
  );

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

  return (
    <>
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

      {/* List of Portfolio (Cards) */}
      <section aria-label="Daftar Portfolio">
        <NavTab id="portfolio-tab" items={tabItems} />
      </section>
    </>
  );
}
