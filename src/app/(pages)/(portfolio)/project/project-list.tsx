"use client";

import { useState } from "react";
import Link from "next/link";
import Alert from "@/components/ui/bootstrap/alert";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import NextImage from "@/components/ui/next/next-image";
import { formatDate, sortItems, SortOrder } from "@/lib/utils";
import { FeatureProjectItem, ProjectItem } from "@/types/customs/data-type";
import { featureProjectItems } from "@/lib/data/portfolioData";
import { resolveAssetUrl } from "@/lib/assets";
import ProgressBar from "@/components/ui/bootstrap/progress-bar";
import { AllowedColors } from "@/types/bootstrap-allowed";
import { useFetchWithFallback } from "@/hooks/use-fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";

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

interface ProjectListProps {
  items: ProjectItem[];
}

export default function ProjectList({ items }: ProjectListProps) {
  const { data: featureProjects } = useFetchWithFallback<FeatureProjectItem[]>(
    () =>
      fetchLaravel<FeatureProjectItem[]>("api/feature-projects", {
        skipAuth: true,
        retries: 3,
      }),
    featureProjectItems,
    "Gagal memuat data Fitur.",
    (data) => Array.isArray(data) && data.length > 0,
  );

  // Set useState for replacing element
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // Sort items based on selection
  const sortedItems = sortItems(items, {
    sortOrder,
    titleKey: "title",
    primaryDateKey: "start_period",
  });
  console.log("Sort selected: ", sortOrder);

  // Render cards for card item
  const renderCards = (cardItems: ProjectItem[]) => (
    <PaginatedList
      items={cardItems}
      itemsPerPage={9}
      key={sortOrder}
      renderItem={(item) => {
        // Calculate average progress for the project based on featureProjectItems
        const projectFeatures = featureProjects?.filter(
          (f) => f.project_id === item.id,
        );
        const averageProgress =
          projectFeatures?.length > 0
            ? projectFeatures.reduce((acc, f) => acc + (f.progress || 0), 0) /
              projectFeatures.length
            : 0;

        let progressBarColor: AllowedColors = "secondary"; // Default color

        if (averageProgress === 100) {
          progressBarColor = "success";
        } else if (averageProgress >= 70) {
          progressBarColor = "primary";
        } else if (averageProgress >= 40) {
          progressBarColor = "info";
        } else if (averageProgress > 0) {
          progressBarColor = "warning";
        } else {
          progressBarColor = "danger"; // For 0% progress
        }

        return (
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
              <h5 className="card-title">
                {item.is_private && <i className="bi bi-lock-fill me-1"></i>}
                {item.title}
              </h5>
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
              {/* Average Percentage */}
              <div className="mt-auto pt-2">
                <ProgressBar
                  percentNow={averageProgress}
                  withLabel
                  color={progressBarColor}
                />
              </div>
            </div>
            {/* Period date and button */}
            <div className="card-footer text-body-secondary">
              <div className="row justify-content-center align-items-center g-2">
                <div className="col-8 small">
                  {formatDate(item.start_period)}
                </div>
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
        );
      }}
    />
  );

  // Extract unique categories from project items
  const uniqueCategories = Array.from(
    new Set(items.map((item) => item.category)),
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
    <>
      {/* Status Alert */}
      <section className="mb-3">
        <Alert color="info" withIcon>
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
    </>
  );
}
