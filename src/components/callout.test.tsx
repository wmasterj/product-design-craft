import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Callout } from "./callout";

describe("Callout", () => {
  it("renders its children in a note landmark", () => {
    render(<Callout>Heads up</Callout>);
    expect(screen.getByRole("note")).toHaveTextContent("Heads up");
  });

  it("merges a caller-supplied class over the default", () => {
    render(<Callout className="px-8">Heads up</Callout>);
    expect(screen.getByRole("note")).toHaveClass("px-8");
    expect(screen.getByRole("note")).not.toHaveClass("px-4");
  });
});
