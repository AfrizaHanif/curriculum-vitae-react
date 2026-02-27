"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/ui/bootstrap/loading";
import { useTopLoader } from "nextjs-toploader";

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const loader = useTopLoader();

  useEffect(() => {
    loader.start();
    let timer: ReturnType<typeof setTimeout>;

    const handleLoad = () => {
      loader.done();
      // Trigger fade out
      setFading(true);

      // Remove component after animation (500ms matches CSS transition)
      timer = setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    // Check if the page has already loaded (e.g. if the user navigates back)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Wait for the page to be fully loaded (including images)
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Render children first to keep the tree stable and avoid hydration errors */}
      {children}
      {loading && <Loading fading={fading} text="Loading..." />}
    </>
  );
}
