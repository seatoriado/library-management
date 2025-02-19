import { Loading } from "@/components/ui/loading";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Loading UI", () => {
  it("renders", async () => {
    render(<Loading />);

    const loading = screen.queryAllByText("Loading...");

    expect(loading.length).toBe(1);
  });
});
