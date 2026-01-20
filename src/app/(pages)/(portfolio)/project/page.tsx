"use client";

import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import NextImage from "@/components/ui/react/next-image";
import { projectItems } from "@/lib/data/portfolioData";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import jumbotronImage from "../../../../assets/images/jumbotron/project.jpg";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import { useState } from "react";

export default function Project() {
  // Set useState for replacing element
  const [sortOrder, setSortOrder] = useState("newest");

  // Sort items based on selection
  const sortedItems = [...projectItems].sort((a, b) => {
    // Alphabet sorting
    if (sortOrder === "az") return a.title.localeCompare(b.title);
    if (sortOrder === "za") return b.title.localeCompare(a.title);

    // Date sorting
    const dateA = new Date(a.start_period).getTime();
    const dateB = new Date(b.start_period).getTime();

    // Check if start from oldest selected
    if (sortOrder === "oldest") return dateA - dateB;

    // (Default) Check if start from newest selected
    return dateB - dateA;
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
          {/* Main image of portfolio */}
          <NextImage
            src={item.image}
            alt={item.title} // Use item.title for alt text for better accessibility
            className="card-img-top rounded-0"
            width={500} // Adjust width as needed for your design
            height={300} // Adjust height as needed for your design
            style={{
              aspectRatio: "16 / 9",
              objectFit: "cover",
              height: "auto",
              objectPosition: "top",
            }} // Crop to widescreen, maintain aspect ratio, and align to top
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

  // Extract unique categories from portfolio items
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
            <h1 className="display-5 fw-bold">Proyek Lainnya</h1>
            <p className="col-md-8 fs-4">
              Pelajari proyek-proyek yang sedang dikerjakan oleh saya
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
      <NavTab id="project-tab" items={tabItems} />
    </AppLayout>
  );
}
