"use client";

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

type ColorModeToggleProps = ComponentPropsWithoutRef<"button"> & {
  disableTooltip?: boolean;
};

export default function ColorModeToggle({
  className,
  disableTooltip = false,
  ...props
}: ColorModeToggleProps) {
  const [theme, setTheme] = useState("auto");
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null); // Get reference of button

  useEffect(() => {
    if (disableTooltip) return; // Check if tooltip want to be disabled
    const button = buttonRef.current; // Get current value of button
    if (!button) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tooltip: any;
    let isMounted = true;

    // IMPORTANT: Do not remove this tooltip function
    import("bootstrap/js/dist/tooltip").then(({ default: Tooltip }) => {
      if (!isMounted) return;
      tooltip = new Tooltip(button, {
        title: `Mode warna saat ini: ${
          theme.charAt(0).toUpperCase() + theme.slice(1)
        }`,
        trigger: "hover focus",
      });
    });

    return () => {
      isMounted = false;
      tooltip?.dispose();
    };
  }, [theme, disableTooltip]);

  useEffect(() => {
    // Initialize theme from cookie on mount
    const match = document.cookie.match(new RegExp("(^| )theme=([^;]+)"));
    if (match) {
      setTheme(match[2]);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme function
    const applyTheme = (targetTheme: string) => {
      if (
        targetTheme === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else if (targetTheme === "auto") {
        document.documentElement.setAttribute("data-bs-theme", "light");
      } else {
        document.documentElement.setAttribute("data-bs-theme", targetTheme);
      }
    };

    applyTheme(theme);

    // If current theme is auto
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("auto");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mounted]);

  // Handle changing theme
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  return (
    <div className="dropdown">
      <button
        ref={buttonRef}
        className={`btn btn-secondary dropdown-toggle d-flex align-items-center ${className || ""}`}
        type="button"
        id="bd-theme"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        {...props}
      >
        <i
          className={`bi ${
            theme === "light"
              ? "bi-sun-fill"
              : theme === "dark"
                ? "bi-moon-stars-fill"
                : "bi-circle-half"
          } me-2`}
        ></i>
        <span className="d-none">Toggle theme</span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end shadow"
        aria-labelledby="bd-theme"
      >
        <li>
          <button
            type="button"
            className={`dropdown-item d-flex align-items-center ${
              theme === "light" ? "active" : ""
            }`}
            onClick={() => handleThemeChange("light")}
          >
            <i className="bi bi-sun-fill me-2 opacity-50"></i>
            Light
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`dropdown-item d-flex align-items-center ${
              theme === "dark" ? "active" : ""
            }`}
            onClick={() => handleThemeChange("dark")}
          >
            <i className="bi bi-moon-stars-fill me-2 opacity-50"></i>
            Dark
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`dropdown-item d-flex align-items-center ${
              theme === "auto" ? "active" : ""
            }`}
            onClick={() => handleThemeChange("auto")}
          >
            <i className="bi bi-circle-half me-2 opacity-50"></i>
            Auto
          </button>
        </li>
      </ul>
    </div>
  );
}
