import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

// Global fetch mock
global.fetch = vi.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

// Mock next/image to bypass strict validation in tests
vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    return React.createElement("img", props);
  },
}));

// Mock next/link to render as a simple anchor tag
vi.mock("next/link", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children, href, ...props }: any) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock next/script to render a placeholder or null
vi.mock("next/script", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    return React.createElement("div", { "data-mocked-script": true, ...props });
  },
}));

// Mock next/navigation (App Router)
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  })),
  useParams: vi.fn().mockReturnValue({}),
  usePathname: vi.fn().mockReturnValue("/"),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));
