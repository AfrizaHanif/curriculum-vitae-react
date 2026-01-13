"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface BreadcrumbContextType {
  dynamicCrumbs: Record<string, string>;

  addCrumb: (path: string, label: string) => void;
  removeCrumb: (path: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  // (2-way binding) Dynamic Breadcrumb
  const [dynamicCrumbs, setDynamicCrumbs] = useState<Record<string, string>>(
    {}
  );

  // Add item to breadcrumb
  const addCrumb = useCallback((path: string, label: string) => {
    setDynamicCrumbs((prev) => {
      // Avoid re-render if the crumb is already set to the same value
      if (prev[path] === label) return prev;
      return { ...prev, [path]: label };
    });
  }, []);

  // Remove item to breadcrumb
  const removeCrumb = useCallback((path: string) => {
    setDynamicCrumbs((prev) => {
      // Avoid re-render if the crumb doesn't exist
      if (!prev[path]) return prev;
      const newCrumbs = { ...prev };
      delete newCrumbs[path];
      return newCrumbs;
    });
  }, []);

  // This will return main content with the breadcrumb provider
  return (
    <BreadcrumbContext.Provider
      value={{ dynamicCrumbs, addCrumb, removeCrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
