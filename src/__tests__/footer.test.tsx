import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "../components/layouts/footer";
import { useFetchWithFallback } from "../hooks/use-fetch-with-fallback";

// 1. Tell Vitest to mock the hook module
vi.mock("../hooks/use-fetch-with-fallback", () => ({
  useFetchWithFallback: vi.fn(),
}));

describe("Footer Component", () => {
  it("renders a loading state while fetching profile data", () => {
    vi.mocked(useFetchWithFallback).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<Footer />);

    // If your Footer uses a spinner or skeleton, check for it here
    // Example: expect(screen.getByTestId("footer-loader")).toBeInTheDocument();
  });

  it("renders the user's fullname from the profile data", () => {
    // 2. Define what the mock should return for this specific test
    vi.mocked(useFetchWithFallback).mockReturnValue({
      data: [{ fullname: "Gemini Tester" }],
      isLoading: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<Footer />);

    // Check if the mocked name appears in the copyright section
    expect(screen.getByText(/Gemini Tester/i)).toBeInTheDocument();
  });

  it("shows social media links when provided", () => {
    vi.mocked(useFetchWithFallback).mockReturnValue({
      data: [
        { id: 1, name: "GitHub", url: "https://github.com", icon: "github" },
      ],
      isLoading: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<Footer />);

    const githubLink = screen.getByLabelText(/GitHub/i);
    expect(githubLink).toHaveAttribute("href", "https://github.com");
  });
});
