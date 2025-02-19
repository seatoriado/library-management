import Table from "@/components/table/table";
import Book from "@/types/Book";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";

const bookList: Book[] = [
  {
    id: "1",
    title:
      "CakePHP Application Development: Step-by-step introduction to rapid web development using the open-source MVC CakePHP framework",
    author: "Ahsanul Bari, Anupom Syam",
    publicationYear: 2008,
    isbn: "0130DD963CCA48D57BFE2252C2A521F7",
    description:
      "I bought this book based on the reviews here. It was the highest rated CakePHP book on Amazon at the time so I figured I couldn't go wrong. I was a little wrong about that...\r\rThe book is pretty easy to ",
  },
  {
    id: "2",
    title: "Alex Homer, ASP.NET 2.0 Visual Web Developer 2005",
    author: "David Sussman",
    publicationYear: 2006,
    isbn: "F317BC40EC89D98E867B2099C4341A68",
    description:
      "*  This Starter Kit serves as an entry-level introduction centered around prebuilt projects that developers can easily deploy and customize for their own sites    * Explains how to build good basic Web sites, including design ",
  },
  {
    id: "3",
    title:
      "PHP Oracle Web Development: Data processing, Security, Caching, XML, Web Services, and Ajax: A practical guide to combining the power, performance, scalability, ... time, and high performance of PHP",
    author: "Yuli Vasiliev",
    publicationYear: 2007,
    isbn: "D930B9CE10509818A14659BC607DAB78",
    description:
      "Based on the title, the book has so many things to discuss but it actually has less than 400 pages that even include the glossary of terms. The reader might have a second thought about the book since it might not promise to ",
  },
];

let books: Book[] = [];

describe("Table", () => {
  beforeEach(() => {
    books = bookList;
  });

  it("renders with book list", async () => {
    await act(() => {
      render(<Table books={books} />);
    });
    const first = screen.queryByText("2006");
    const second = screen.queryByText("2007");
    const third = screen.queryByText("2008");
    const link = await screen.findByTestId(2);

    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/books/2");
  });
  it("renders with empty book list", async () => {
    await act(() => {
      render(<Table books={[]} />);
    });
    const first = screen.queryByText("2006");
    const second = screen.queryByText("2007");
    const third = screen.queryByText("2008");
    const span = screen.queryByText("No books found");
    expect(first).not.toBeInTheDocument();
    expect(second).not.toBeInTheDocument();
    expect(third).not.toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });
});
