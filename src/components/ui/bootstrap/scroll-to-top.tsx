"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "./button";
import "./scroll-to-top.css";

type ScrollToTopProps = {
  showAt?: number;
};

export default function ScrollToTop({ showAt = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    // The button becomes visible when the user scrolls beyond `showAt` pixels.
    if (window.scrollY > showAt) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top on button click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  });

  return (
    <div className="scroll-to-top">
      <Button
        type="button"
        onClick={scrollToTop}
        color="primary"
        className={clsx("rounded-circle p-2 lh-1", { show: isVisible })}
        aria-label="Go to top"
      >
        <i className="bi bi-arrow-up fs-4"></i>
      </Button>
    </div>
  );
}
