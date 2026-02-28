"use client";

import Link from "next/link";
import "./header.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, FormEvent, Fragment } from "react";
import NextImage from "../ui/next/next-image";
import logoImage from "../../assets/images/logo/logo-only-white.png";
import { headerItems } from "@/lib/data/headerData";
import { getPathname, isActiveLink } from "@/lib/utils";
import Button from "../ui/bootstrap/button";

export default function NavbarDesktop() {
  const pathname = usePathname(); // Get pathname
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const [maxNavItems, setMaxNavItems] = useState(9);

  // Handle search
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200 && currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Max item depend of window's width
    // NOTE: You can change maximum items you want. This includes more menu
    const calculateMaxItems = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setMaxNavItems(9);
      } else if (width >= 992) {
        setMaxNavItems(6);
      } else {
        setMaxNavItems(2);
      }
    };

    // Set initial value on component mount
    calculateMaxItems();

    // Add event listener for window resize
    window.addEventListener("resize", calculateMaxItems);
    return () => window.removeEventListener("resize", calculateMaxItems);
  }, []);

  const visibleHeaderItems =
    headerItems.length > maxNavItems
      ? headerItems.slice(0, maxNavItems - 1)
      : headerItems;
  const overflowHeaderItems =
    headerItems.length > maxNavItems ? headerItems.slice(maxNavItems - 1) : [];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .navbar-sticky {
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            transform: translateY(-100%);
            opacity: 0;
          }
          .navbar-sticky.visible {
            transform: translateY(0);
            opacity: 1;
          }
          .form-control-dark::placeholder {
            color: rgba(255, 255, 255, 0.75);
            opacity: 1;
          }
        `,
        }}
      />
      <header
        className={`p-3 text-bg-dark fixed-top d-none d-lg-block shadow navbar-sticky ${isVisible ? "visible" : ""}`}
      >
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
              href={"/"}
            >
              <NextImage
                src={logoImage}
                alt={"Logo"}
                className="me-2"
                height={30}
                disableSpinner
              />
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* Header navigation */}
              {/* Visible (Outside 'More' menu) */}
              {visibleHeaderItems.map((item) => {
                // Check if item includes subitems
                if (item.subItems) {
                  const isDropdownActive = item.subItems.some((subItem) =>
                    isActiveLink(pathname, getPathname(subItem.href)),
                  ); // Check if pathname and href from subitem are same
                  return (
                    <li key={item.label} className="nav-item dropdown">
                      <a
                        className={`nav-link px-2 dropdown-toggle ${
                          isDropdownActive ? "text-secondary" : "text-white"
                        }`}
                        href="#"
                        id={`dropdown-${item.label}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          className="bi me-2"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <use xlinkHref={`#${item.icon}`}></use>
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
                const isActive = isActiveLink(pathname, item.href); // Check if pathname and href from item are same
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#"}
                      className={`nav-link px-2 ${
                        isActive ? "text-secondary" : "text-white"
                      }`}
                    >
                      <svg
                        className="bi me-2"
                        width="16"
                        height="16"
                        aria-hidden="true"
                      >
                        <use xlinkHref={`#${item.icon}`}></use>
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              {/* Inside 'More' menu */}
              {overflowHeaderItems.length > 0 && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle px-2 text-white"
                    href="#"
                    id="dropdown-more"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul
                    className="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px"
                    aria-labelledby="dropdown-more"
                  >
                    {overflowHeaderItems.map((item) => {
                      if (item.subItems) {
                        return (
                          <Fragment key={item.label}>
                            <li>
                              <h6 className="dropdown-header">{item.label}</h6>
                            </li>
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
                          </Fragment>
                        );
                      }
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.href ?? "#"}
                            className={`dropdown-item rounded-2 ${
                              isActiveLink(pathname, item.href) ? "active" : ""
                            }`}
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
                </li>
              )}
            </ul>
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
              onSubmit={handleSearch}
            >
              <div className="input-group">
                <input
                  type="search"
                  className="form-control form-control-dark text-bg-dark"
                  placeholder="Cari portfolio..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button color="dark" className="border-secondary" type="submit">
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </form>
            {/* <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </>
  );
}
