// src/components/utility/breadcrumb-setter.tsx
"use client";

import { useBreadcrumb } from "@/context/breadcrumb-context";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type BreadcrumbSetterProps = {
  title: string;
};

export default function BreadcrumbSetter({ title }: BreadcrumbSetterProps) {
  const { addCrumb, removeCrumb } = useBreadcrumb();
  const pathname = usePathname(); // Gets the current path, e.g., /portfolio/POR%20001

  useEffect(() => {
    if (pathname && title) {
      // Set the dynamic breadcrumb using the current path and the provided title
      addCrumb(pathname, title);
    }

    // Cleanup function to remove the dynamic crumb when the component unmounts
    return () => {
      if (pathname) {
        removeCrumb(pathname);
      }
    };
  }, [pathname, title, addCrumb, removeCrumb]);

  // This component renders nothing to the DOM
  return null;
}
