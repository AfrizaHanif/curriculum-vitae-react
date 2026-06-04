import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

// A simple smoke test to check if the environment is working
describe("Smoke Test", () => {
  it("renders a basic element", () => {
    render(<h1>CV Project</h1>);
    expect(screen.getByText("CV Project")).toBeInTheDocument();
  });
});
