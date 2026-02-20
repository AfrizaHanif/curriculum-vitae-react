"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./header.css";
import { profileItem } from "@/lib/data/profileData";
import NextImage from "../ui/next/next-image";
import logoImage from "../../assets/images/logo/logo-only-white.png";
import ColorModeToggle from "../ui/bootstrap/color-mode-toggle";
import { getPathname, isActiveLink } from "@/lib/utils";
import { headerItems } from "@/lib/data/headerData";

// Get Data from JSON (Single)
const userProfile = profileItem[0];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header>
      {/* Main Header */}
      <div className="px-3 py-2 text-bg-dark border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <NextImage
                src={logoImage}
                alt={"Logo"}
                className="me-2"
                height={40}
              />
              <span className="fs-4 d-none d-lg-inline">
                {userProfile.fullname}
              </span>
            </Link>
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              {headerItems.map((item) => {
                if (item.subItems) {
                  const isDropdownActive = item.subItems.some((subItem) =>
                    isActiveLink(pathname, getPathname(subItem.href)),
                  );
                  return (
                    <li key={item.label} className="nav-item dropdown">
                      <a
                        className={`nav-link dropdown-toggle ${
                          isDropdownActive ? "text-secondary" : "text-white"
                        }`}
                        href="#"
                        id={`dropdown-${item.label}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          className="bi d-block mx-auto mb-1"
                          width="24"
                          height="24"
                        >
                          <use xlinkHref={`#${item.icon}`} />
                        </svg>
                        {item.label}
                      </a>
                      <ul
                        className="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px"
                        aria-labelledby={`dropdown-${item.label}`}
                      >
                        {item.subItems.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href ?? "#"}
                              className={`dropdown-item rounded-2 ${
                                isActiveLink(pathname, subItem.href)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <svg
                                className="bi me-2"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <use xlinkHref={`#${subItem.icon}`}></use>
                              </svg>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                const isActive = isActiveLink(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#"}
                      className={`nav-link ${
                        isActive ? "text-secondary" : "text-white"
                      }`}
                    >
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width="24"
                        height="24"
                        aria-hidden="true"
                      >
                        <use xlinkHref={`#${item.icon}`} />
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* Sub Header */}
      <div className="px-3 py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <form
            className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Cari portfolio..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="text-end">
            {/* <button type="button" className="btn btn-light text-dark me-2">
              Login
            </button> */}
            <ColorModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
