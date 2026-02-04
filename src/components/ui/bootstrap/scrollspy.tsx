"use client";

import { useEffect } from "react";

interface ScrollSpyProps {
  targetId: string;
  rootMargin?: string;
  smoothScroll?: boolean;
}

export default function ScrollSpy({
  targetId,
  rootMargin = "0px 0px -25%", // (Top, LR, Bottom (Detection))
  smoothScroll = true,
}: ScrollSpyProps) {
  useEffect(() => {
    // Ensure code runs only on client
    if (typeof document === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scrollSpyInstance: any = null;
    let ignore = false;

    const handleResize = () => {
      if (scrollSpyInstance) {
        scrollSpyInstance.refresh();
      }
    };

    const init = async () => {
      // Dynamically import bootstrap to avoid SSR issues with 'window'
      const { default: ScrollSpy } =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (await import("bootstrap/js/dist/scrollspy")) as any;
      if (ignore) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        console.warn(`ScrollSpy: Target element #${targetId} not found.`);
        return;
      }

      // We attach ScrollSpy to the body for full-page scrolling
      const scrollElement = document.body;

      // Initialize ScrollSpy
      scrollSpyInstance = ScrollSpy.getOrCreateInstance(scrollElement, {
        target: `#${targetId}`,
        rootMargin: rootMargin,
        smoothScroll: smoothScroll,
      });

      // Refresh to recalculate offsets in case of dynamic content loading
      scrollSpyInstance.refresh();
      window.addEventListener("resize", handleResize);
    };

    init();

    return () => {
      ignore = true;
      window.removeEventListener("resize", handleResize);
      if (scrollSpyInstance) {
        scrollSpyInstance.dispose();
      }
    };
  }, [targetId, rootMargin, smoothScroll]);

  return null;
}
