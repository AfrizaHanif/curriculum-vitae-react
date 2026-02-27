"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./navbar.css";
import { profileItem } from "@/lib/data/profileData";
import NextImage from "../ui/next/next-image";
import logoImage from "../../assets/images/logo/logo-only-white.png";
import ColorModeToggle from "../ui/bootstrap/color-mode-toggle";
import { getPathname, isActiveLink } from "@/lib/utils";
import { headerItems } from "@/lib/data/headerData";
import Offcanvas from "../ui/bootstrap/offcanvas";
import Button from "../ui/bootstrap/button";

// Get Data from JSON (Single)
const userProfile = profileItem[0];

export default function Navbar() {
  const pathname = usePathname(); // Get pathname
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Mobile navbar"
    >
      <div className="container-fluid">
        {/* Navbar logo */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <NextImage
            src={logoImage}
            alt={"Logo"}
            className="me-2"
            height={30}
            disableSpinner
          />
          <span className="d-none d-sm-inline">{userProfile.fullname}</span>
        </Link>
        <div className="d-flex align-items-center gap-2">
          {/* Color mode toggle */}
          <div className="d-lg-none">
            <ColorModeToggle />
          </div>
          {/* Header item menu */}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <Button
            color="primary"
            dataToggle="offcanvas"
            dataTarget="offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            style={{ width: "60px" }}
          >
            <i className="bi bi-three-dots"></i>
          </Button>
        </div>

        {/* Header menu (Offcanvas) */}
        <Offcanvas
          id="offcanvasNavbar"
          title={userProfile.fullname}
          position="end"
          className="text-bg-dark"
          data-bs-theme="dark"
        >
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            {headerItems.map((item) => {
              // Check if item includes subitems
              if (item.subItems) {
                const isDropdownActive = item.subItems.some((subItem) =>
                  isActiveLink(pathname, getPathname(subItem.href)),
                ); // Check if pathname and href from subitem are same
                const collapseId = `collapse-${item.label.replace(/\s+/g, "-")}`;
                return (
                  <li key={item.label} className="nav-item">
                    <a
                      className={`nav-link dropdown-toggle ${
                        isDropdownActive ? "active" : ""
                      }`}
                      href={`#${collapseId}`}
                      data-bs-toggle="collapse"
                      aria-expanded={isDropdownActive}
                      aria-controls={collapseId}
                      role="button"
                    >
                      {item.icon && (
                        <svg
                          className="bi me-2"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <use xlinkHref={`#${item.icon}`} />
                        </svg>
                      )}
                      {item.label}
                    </a>
                    <div
                      className={`collapse ${isDropdownActive ? "show" : ""}`}
                      id={collapseId}
                    >
                      <ul className="list-unstyled m-0 ms-3">
                        {item.subItems.map((subItem) => (
                          <li
                            key={subItem.label}
                            className="nav-item"
                            data-bs-dismiss="offcanvas"
                          >
                            <Link
                              href={subItem.href ?? "#"}
                              className={`nav-link ${
                                isActiveLink(pathname, subItem.href)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {subItem.icon && (
                                <svg
                                  className="bi me-2"
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref={`#${subItem.icon}`} />
                                </svg>
                              )}
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }
              const isActive = isActiveLink(pathname, item.href); // Check if pathname and href from item are same
              return (
                <li
                  key={item.label}
                  className="nav-item"
                  data-bs-dismiss="offcanvas"
                >
                  <Link
                    href={item.href ?? "#"}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {item.icon && (
                      <svg
                        className="bi me-2"
                        width="16"
                        height="16"
                        aria-hidden="true"
                      >
                        <use xlinkHref={`#${item.icon}`} />
                      </svg>
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Search form */}
          <form className="d-flex mt-3" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cari portfolio..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-light"
              type="submit"
              data-bs-dismiss="offcanvas"
            >
              Search
            </button>
          </form>
        </Offcanvas>
      </div>
    </nav>
  );
}
