"use client";

import { useState, useRef, useEffect } from "react";
import CardGroup from "@/components/ui/bootstrap/card-group";

interface PaginatedListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  className?: string;
}

export default function PaginatedList<T>({
  items,
  renderItem,
  itemsPerPage = 6,
  className,
}: PaginatedListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Ensure currentPage is valid if itemsPerPage or items change (Remove if ERROR)
  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={listRef}
      className={className}
      style={{ scrollMarginTop: "2rem" }}
    >
      <CardGroup>{currentItems.map((item) => renderItem(item))}</CardGroup>

      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="mt-4">
          <div className="text-center mb-2 small text-body-secondary">
            Menampilkan halaman {currentPage} dari {totalPages}
          </div>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous"
                disabled={currentPage === 1}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
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
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next"
                disabled={currentPage === totalPages}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
