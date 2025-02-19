/* eslint-disable @typescript-eslint/no-unused-vars */
import TablePagination from "@/components/table/table-pagination";
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

describe("Table Pagination", () => {
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
  it("renders with 1 total page", async () => {
    render(<TablePagination totalPages={1} />);
    const input = screen.queryByPlaceholderText("Search...");

    const buttons = screen.queryAllByText("1");
    const selects = screen.queryAllByText("20");

    expect(buttons.length).toBe(0);
    expect(selects.length).toBe(1);
  });
  it("renders with multiple pages", async () => {
    render(<TablePagination totalPages={5} />);
    const input = screen.queryByPlaceholderText("Search...");

    const buttons = screen.queryAllByText("5");
    const selects = screen.queryAllByText("20");

    expect(buttons.length).toBe(1);
    expect(selects.length).toBe(1);
  });
  it("redirects when changing page size", async () => {
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
          path.startsWith("path") && path.indexOf("pageSize=40") !== -1;
      });

    render(<TablePagination totalPages={5} />);

    const select = screen.queryByTestId("page-size");
    if (select) {
      fireEvent.change(select, { target: { value: "40" } });
      expect(routerSpy).toHaveBeenCalled();
      expect(resultPath).toBe(true);
    } else {
      expect("Should have rendered").toBe(null);
    }
  });
  it("redirects when changing page number", async () => {
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
          path.startsWith("path") && path.indexOf("pageNumber=3") !== -1;
      });

    render(<TablePagination totalPages={5} />);

    const button = screen.queryByText("4");
    if (button) {
      fireEvent.click(button);
      expect(routerSpy).toHaveBeenCalled();
      expect(resultPath).toBe(true);
    } else {
      expect("Should have rendered").toBe(null);
    }
  });
});
