"use client";

import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import NextImage from "@/components/ui/next/next-image"; // Import the custom NextImage component
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import { portfolioItems } from "@/lib/data/portfolioData";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import jumbotronImage from "../../../../assets/images/jumbotron/portfolio.jpg";
import { useState } from "react";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";

export default function Portfolio() {
  // Set useState for replacing element
  const [sortOrder, setSortOrder] = useState("newest");

  // Sort items based on selection
  const sortedItems = [...portfolioItems].sort((a, b) => {
    // Alphabet sorting
    if (sortOrder === "az") return a.title.localeCompare(b.title);
    if (sortOrder === "za") return b.title.localeCompare(a.title);

    // Date sorting
    const valA = a.finish_period
      ? new Date(a.finish_period).getTime()
      : Infinity;
    const valB = b.finish_period
      ? new Date(b.finish_period).getTime()
      : Infinity;

    // Check if start from oldest selected
    if (sortOrder === "oldest") {
      if (valA !== valB) return valA - valB;
      return (
        new Date(a.start_period).getTime() - new Date(b.start_period).getTime()
      );
    }

    // (Default) Check if start from newest selected
    if (valA !== valB) return valB - valA;
    return (
      new Date(b.start_period).getTime() - new Date(a.start_period).getTime()
    );
  });
  console.log("Sort selected: ", sortOrder);

  // Render cards for card item
  const renderCards = (items: typeof portfolioItems) => (
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
          {/* Main image of portfolio */}
          <NextImage
            src={item.image}
            alt={item.title}
            className="card-img-top rounded-0"
            width={500}
            height={300}
            style={{
              aspectRatio: "16 / 9",
              objectFit: "cover",
              height: "auto",
              objectPosition: "top",
            }}
          />
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
    new Set(portfolioItems.map((item) => item.category)),
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
            <h1 className="display-5 fw-bold">Portfolio</h1>
            <p className="col-md-8 fs-4">
              Kumpulan proyek yang menampilkan keahlian saya dalam pengembangan
              web dan desain.
            </p>
          </div>
        </div>
      </Jumbotron>

      {/* Sorting Controls */}
      <div className="container-fluid mb-3">
        <div className="d-flex justify-content-end align-items-center">
          <label htmlFor="sortOrder" className="me-2 fw-semibold">
            Urutkan:
          </label>
          <select
            id="sortOrder"
            className="form-select w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">Judul (A-Z)</option>
            <option value="za">Judul (Z-A)</option>
          </select>
        </div>
      </div>

      {/* List of Portfolio (Cards) */}
      <NavTab id="portfolio-tab" items={tabItems} />
    </AppLayout>
  );
}
