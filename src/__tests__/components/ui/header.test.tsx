import { Header } from "@/components/ui/header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

let pathname: string = "";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => pathname),
}));

describe("Header UI", () => {
  beforeEach(() => {
    pathname = "/books";
  });
  it("renders when not in homepage", async () => {
    render(<Header />);

    const header = screen.queryAllByText("< Back to Dashboard");

    expect(header.length).toBe(1);
  });
  it("doesn't render when in homepage", async () => {
    pathname = "/";
    render(<Header />);

    const header = screen.queryAllByText("< Back to Dashboard");

    expect(header.length).toBe(0);
  });
});
