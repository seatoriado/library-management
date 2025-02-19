import { BookDetails } from "@/components/book/book-details";
import Book from "@/types/Book";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

let book: Book;

describe("Book Details", () => {
  beforeAll(() => {
    book = {
      id: "1",
      title:
        "CakePHP Application Development: Step-by-step introduction to rapid web development using the open-source MVC CakePHP framework",
      author: "Ahsanul Bari, Anupom Syam",
      publicationYear: 2008,
      isbn: "0130DD963CCA48D57BFE2252C2A521F7",
      description:
        "I bought this book based on the reviews here. It was the highest rated CakePHP book on Amazon at the time so I figured I couldn't go wrong. I was a little wrong about that...\r\rThe book is pretty easy to ",
    };
  });
  it("renders with complete details", async () => {
    render(<BookDetails {...book} />);

    const title = screen.queryAllByText(book.title);
    const author = screen.queryAllByText(`Author: ${book.author}`);
    const publicationYear = screen.queryAllByText(
      `Published on: ${book.publicationYear}`
    );
    const isbn = screen.queryAllByText(`ISBN: ${book.isbn}`);
    const description = screen.queryAllByText("Description:");

    expect(title.length).toBe(1);
    expect(author.length).toBe(1);
    expect(publicationYear.length).toBe(1);
    expect(isbn.length).toBe(1);
    expect(description.length).toBe(1);
  });
  it("renders with no description", async () => {
    delete book.description;
    render(<BookDetails {...book} />);

    const title = screen.queryAllByText(book.title);
    const author = screen.queryAllByText(`Author: ${book.author}`);
    const publicationYear = screen.queryAllByText(
      `Published on: ${book.publicationYear}`
    );
    const isbn = screen.queryAllByText(`ISBN: ${book.isbn}`);
    const description = screen.queryAllByText("Description:");

    expect(title.length).toBe(1);
    expect(author.length).toBe(1);
    expect(publicationYear.length).toBe(1);
    expect(isbn.length).toBe(1);
    expect(description.length).toBe(0);
  });
});
