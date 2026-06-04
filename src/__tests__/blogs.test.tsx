import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

// Mocking a generic BlogList component
// Replace this with your actual component import, e.g.:
// import BlogList from "../components/BlogList";
const MockBlogList = () => {
  const [blogs, setBlogs] = React.useState<{ id: number; title: string }[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch(() => setError("Internal Server Error"));
  }, []);

  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      {blogs.map((blog) => (
        <article key={blog.id}>{blog.title}</article>
      ))}
    </div>
  );
};

describe("Blogs API Mocking", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  // Test that the component renders a list of blogs from the mocked API
  it("renders a list of blogs from the mocked API", async () => {
    const mockBlogs = [
      { id: 1, title: "How to Build a CV" },
      { id: 2, title: "Vitest is Awesome" },
    ];

    // Setup the mock to return our fake data
    vi.mocked(fetch).mockResolvedValue({
      ok: true, // IMPORTANT: The component checks res.ok
      json: async () => mockBlogs,
    } as Response);

    render(<MockBlogList />);

    // Wait for the mock data to appear in the DOM
    await waitFor(() => {
      // Use a regex (i) to make it case-insensitive and more flexible
      expect(screen.getByText(/how to build a cv/i)).toBeInTheDocument();
      expect(screen.getByText(/vitest is awesome/i)).toBeInTheDocument();
    });
  });

  // Test that the component handles API errors gracefully
  it("renders an error message when the API returns a 500 error", async () => {
    // Setup the mock to return a 500 Internal Server Error
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    render(<MockBlogList />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Internal Server Error",
      );
    });
  });

  // Test that the component handles network errors (e.g., fetch throws an error)
  it("handles a fetch timeout", async () => {
    // Simulate a network timeout error
    vi.mocked(fetch).mockRejectedValue(new Error("The request timed out"));

    render(<MockBlogList />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /internal server error/i,
      );
    });
  });

  // Test that the component can handle different data based on the URL
  it("returns different data based on the URL", async () => {
    // Using mockImplementation to handle multiple endpoints
    vi.mocked(fetch).mockImplementation(async (url) => {
      if (url.toString().includes("/api/blogs")) {
        return {
          ok: true,
          json: async () => [{ id: 1, title: "URL Based Blog" }],
        } as Response;
      }

      if (url.toString().includes("/api/profiles")) {
        return {
          ok: true,
          json: async () => [{ fullname: "John Doe" }],
        } as Response;
      }

      return { ok: false, status: 404 } as Response;
    });

    render(<MockBlogList />);

    // Verify that the specific "blogs" data was returned
    await waitFor(() => {
      expect(screen.getByText(/url based blog/i)).toBeInTheDocument();
    });
  });
});
