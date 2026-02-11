"use client";

import { profileItem } from "@/lib/data/profileData";
import { socialItems } from "@/lib/data/profileData";
import Link from "next/link";
import logoImage from "../../assets/images/logo/logo-only-white.png";
import NextImage from "../ui/next/next-image";

// Get Data from JSON (Single)
const userProfile = profileItem[0];

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link
          href="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          aria-label="Bootstrap"
        >
          {/* <svg className="bi" width="30" height="24" aria-hidden="true">
            <use xlinkHref="#bootstrap"></use>
          </svg> */}
          <NextImage src={logoImage} alt={"Logo"} height={24} />
        </Link>
        <span
          className="mb-3 mb-md-0 text-body-secondary"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} {userProfile.fullname}
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
