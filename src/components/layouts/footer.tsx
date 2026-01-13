"use client";

import { socialItems } from "@/lib/data/profileData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link
          href="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          aria-label="Bootstrap"
        >
          <svg className="bi" width="30" height="24" aria-hidden="true">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </Link>
        <span className="mb-3 mb-md-0 text-body-secondary">
          © 2025 Muhammad Afriza Hanif
        </span>
      </div>
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        {socialItems.map((item) => (
          <li key={item.key} className="ms-3">
            <a
              className="text-body-secondary"
              href={item.url}
              aria-label={item.name}
              // title={item.name}
              data-bs-toggle="tooltip"
              data-bs-title={item.name}
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref={`#${item.icon}`}></use>
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
