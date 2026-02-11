"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "../ui/bootstrap/breadcrumb";
import { Container } from "react-bootstrap";
import Header from "./header";
import Footer from "./footer";
import { useBreadcrumb } from "@/context/breadcrumb-context";

// Configuration for the breadcrumb truncation length
const BREADCRUMB_TRUNCATE_LIMIT = 50;

// Define a mapping from routes to their friendly names
const breadcrumbNameMap: { [key: string]: string } = {
  "/about": "About Us",
  "/profile": "Tentang Saya",
  "/setup": "Peralatan Saya",
  "/expertise": "Ringkasan Keahlian",
  "/service": "Layanan Tersedia",
  "/portfolio": "Portfolio Utama",
  "/project": "Proyek Lainnya",
  "/testimony": "Testimoni",
  "/contact": "Kontak",
  // Add any route overrides here when the auto-generated name isn't ideal.
  // For example: "/faq": "Frequently Asked Questions",
};

// Map for specific segments (folders) that need a custom label regardless of parent path
const segmentNameMap: { [key: string]: string } = {
  "case-study": "Studi Kasus",
};

export default function AppLayout({
  children,
  showBreadcrumb = true,
}: {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
}) {
  const pathname = usePathname();
  const { dynamicCrumbs } = useBreadcrumb();
  console.log("Current Path: ", pathname);

  const breadcrumbItems = useMemo(() => {
    const pathnames = pathname.split("/").filter((x) => x);

    // Initialize an empty items array
    const items: { href: string; label: string; isCurrent: boolean }[] = [];

    pathnames.forEach((_, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isCurrent = index === pathnames.length - 1;
      const segment = to.split("/").pop() || "";

      // Determine the full label first
      const rawLabel =
        dynamicCrumbs[to] ||
        breadcrumbNameMap[to] ||
        segmentNameMap[segment] ||
        segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
        "Unknown";

      // Truncate the label if it's too long
      const label =
        rawLabel.length > BREADCRUMB_TRUNCATE_LIMIT
          ? `${rawLabel.substring(0, BREADCRUMB_TRUNCATE_LIMIT)}...`
          : rawLabel;

      items.push({
        href: to,
        label: label,
        isCurrent: isCurrent,
      });
    });

    console.log("Breadcrumb Items:", items);

    return items;
  }, [pathname, dynamicCrumbs]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="py-4 flex-grow-1 d-flex flex-column">
        {/* Render the breadcrumb only if there are items */}
        {showBreadcrumb && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}

        {/* This will render the matched child route component */}
        <div className="flex-grow-1">{children}</div>
        <Footer />
      </Container>
    </div>
  );
}
