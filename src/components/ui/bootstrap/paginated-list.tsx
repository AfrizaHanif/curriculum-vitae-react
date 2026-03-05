"use client";

import { useState, useRef, ElementType } from "react";
import CardGroup from "@/components/ui/bootstrap/card-group";

interface PaginatedListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  cardsPerRow?: 1 | 2 | 3 | 4;
  className?: string;
  as?: ElementType;
}

export default function PaginatedList<T>({
  items,
  renderItem,
  itemsPerPage = 6,
  cardsPerRow = 3,
  className,
  as: Tag = "div",
}: PaginatedListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Ensure currentPage is valid if itemsPerPage or items change
  const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  const currentItems = items.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Tag
      ref={listRef}
      className={className}
      style={{ scrollMarginTop: "2rem" }}
    >
      <CardGroup cardPerRow={cardsPerRow}>
        {currentItems.map((item) => renderItem(item))}
      </CardGroup>

      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="mt-4">
          <div className="text-center mb-2 small text-body-secondary">
            Menampilkan halaman {safePage} dari {totalPages}
          </div>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(safePage - 1)}
                aria-label="Previous"
                disabled={safePage === 1}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${safePage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                safePage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(safePage + 1)}
                aria-label="Next"
                disabled={safePage === totalPages}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </Tag>
  );
}
