import TableItem from "@/components/table/table-item";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

let mockBook: {
  title: string;
  author: string;
  publicationYear: string;
};

describe("Table Item", () => {
  beforeEach(() => {
    mockBook = {
      title:
        "CakePHP Application Development: Step-by-step introduction to rapid web development using the open-source MVC CakePHP framework",
      author: "Ahsanul Bari, Anupom Syam",
      publicationYear: "2008",
    };
  });
  it("renders with complete params", async () => {
    const tableItem = TableItem({ ...mockBook });
    render(tableItem);

    const title = screen.queryAllByText(mockBook.title);
    const author = screen.queryAllByText(mockBook.author);
    const publicationYear = screen.queryAllByText(mockBook.publicationYear);

    expect(title.length).toBe(1);
    expect(author.length).toBe(1);
    expect(publicationYear.length).toBe(1);
  });
  it("renders with missing params", async () => {
    mockBook.title = "";
    mockBook.author = "";
    mockBook.publicationYear = "";

    const tableItem = TableItem({ ...mockBook });
    render(tableItem);

    const title = screen.queryAllByText(
      "CakePHP Application Development: Step-by-step introduction to rapid web development using the open-source MVC CakePHP framework"
    );
    const author = screen.queryAllByText("Ahsanul Bari, Anupom Syam");
    const publicationYear = screen.queryAllByText("2008");

    expect(title.length).toBe(0);
    expect(author.length).toBe(0);
    expect(publicationYear.length).toBe(0);
  });
});
