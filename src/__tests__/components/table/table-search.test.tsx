/* eslint-disable @typescript-eslint/no-unused-vars */
import TableSearch from "@/components/table/table-search";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

let mockSearchParams = {
  get: (val: string) => {
    return val;
  },
};
let mockUseRouter = {
  replace: (val: string) => {},
};

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "path"),
  useRouter: jest.fn(() => mockUseRouter),
  useSearchParams: jest.fn(() => mockSearchParams),
}));

describe("Table Item", () => {
  beforeEach(() => {
    mockUseRouter = {
      replace: (val: string) => {
        return val;
      },
    };
    mockSearchParams = {
      get: (val: string) => {
        return val;
      },
    };
  });
  it("renders with params", async () => {
    render(<TableSearch />);
    const input = screen.queryByPlaceholderText("Search...");

    expect(input?.getAttribute("value")).toBe("query");
  });
  it("renders without params", async () => {
    mockSearchParams = {
      get: (val: string) => {
        return "";
      },
    };

    render(<TableSearch />);
    const input = await screen.findByPlaceholderText("Search...");

    expect(input?.getAttribute("value")).toBe("");
  });
  it("redirects when searches", async () => {
    mockSearchParams = {
      get: (val: string) => {
        return "";
      },
    };
    let resultPath = false;
    const routerSpy = jest
      .spyOn(mockUseRouter, "replace")
      .mockImplementation((path) => {
        resultPath =
          path.startsWith("path") &&
          path.endsWith("pageNumber=0&pageSize=20&query=x");
      });

    render(<TableSearch />);

    const input = screen.queryByPlaceholderText("Search...");
    if (input) {
      fireEvent.change(input, { target: { value: "x" } });
      expect(routerSpy).toHaveBeenCalled();
      expect(resultPath).toBe(true);
    } else {
      expect("Should have rendered").toBe(null);
    }
  });
  it("removes query when no search term", async () => {
    mockSearchParams = {
      get: (val: string) => {
        return "";
      },
    };
    let resultPath = false;
    const routerSpy = jest
      .spyOn(mockUseRouter, "replace")
      .mockImplementation((path) => {
        resultPath = path.startsWith("path") && path.indexOf("query") === -1;
      });

    render(<TableSearch />);

    const input = screen.queryByPlaceholderText("Search...");
    if (input) {
      fireEvent.change(input, { target: { value: "x" } });
      fireEvent.change(input, { target: { value: "" } });
      expect(routerSpy).toHaveBeenCalled();
      expect(resultPath).toBe(true);
    } else {
      expect("Should have rendered").toBe(null);
    }
  });
});
