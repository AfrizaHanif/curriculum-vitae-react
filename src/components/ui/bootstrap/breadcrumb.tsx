import Link from "next/link";
import "./breadcrumb.css";
import { BreadcrumbItem } from "@/lib/bootstrap-types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
        {/* Home */}
        <li key="home" className="breadcrumb-item">
          <Link className="link-body-emphasis" href="/">
            <svg className="bi" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#home"></use>
            </svg>
            <span className="visually-hidden">Home</span>
          </Link>
        </li>
        {/* Item of breadcrumb */}
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${item.isCurrent ? "active" : ""}`}
            aria-current={item.isCurrent ? "page" : undefined}
          >
            {/* If landing in current page */}
            {item.isCurrent ? (
              item.label
            ) : (
              <Link
                className="link-body-emphasis fw-semibold text-decoration-none"
                href={item.href}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
