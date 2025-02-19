import { BookForm } from "@/components/book/book-form";
import Book from "@/types/Book";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

let book: Book;
let response: Book | undefined;
let requestFlag = "";

jest.mock("@/services/book-service.tsx", () => ({
  ...jest.requireActual("@/services/book-service.tsx"),
  createBook: jest.fn(() => {
    response = book;
    requestFlag = "create";
    return Promise.resolve(book);
  }),
  updateBook: jest.fn(() => {
    response = book;
    requestFlag = "update";
    return Promise.resolve(book);
  }),
}));

let redirectPath = "";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: (path: string) => {
    redirectPath = path;
  },
}));

describe("Book Form", () => {
  beforeEach(() => {
    response = undefined;
    requestFlag = "";
    redirectPath = "";
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
  describe("Create Book", () => {
    it("renders component", async () => {
      render(<BookForm />);

      const title = screen.queryByPlaceholderText("Title");
      const author = screen.queryByPlaceholderText("Author");
      const publicationYear = screen.queryByPlaceholderText("YYYY");
      const isbn = screen.queryByPlaceholderText("0000000000");
      const description = screen.queryByPlaceholderText("Describe the book");
      const cancelLink = screen.queryByTestId("cancel");

      expect(title?.getAttribute("value")).toBeFalsy();
      expect(author?.getAttribute("value")).toBeFalsy();
      expect(publicationYear?.getAttribute("value")).toBeFalsy();
      expect(isbn?.getAttribute("value")).toBeFalsy();
      expect(description?.getAttribute("value")).toBeFalsy();
      expect(cancelLink?.getAttribute("href")).toBe("/");
    });
    it("request successfully", async () => {
      render(<BookForm />);

      const submitButton = screen.queryByText("Save");
      if (submitButton) {
        await act(async () => {
          fireEvent.click(submitButton, {});
          await jest.runAllTimersAsync();
        });
        expect(response?.errors).toBeFalsy();
        expect(response?.id).toBeTruthy();
        expect(response?.title).toBeTruthy();
        expect(response?.author).toBeTruthy();
        expect(response?.description).toBeTruthy();
        expect(response?.isbn).toBeTruthy();
        expect(response?.publicationYear).toBeTruthy();
        expect(requestFlag).toBe("create");
        expect(redirectPath).toBe("/books/1");
      } else {
        expect("Submit button should have rendered").toBe(false);
      }
    });
    it("request failed due to entry", async () => {
      book = {
        errors: {
          title: "Title should not be blank",
          author: "Author should not be blank",
          isbn: "ISBN should be more than 10 characters",
          publicationYear: "Publication year should only be numeric",
        },
      };
      render(<BookForm />);

      const submitButton = screen.queryByText("Save");
      if (submitButton) {
        await act(async () => {
          fireEvent.click(submitButton, {});
          await jest.runAllTimersAsync();
        });
        const title = screen.queryByText("*Title should not be blank");
        const author = screen.queryByText("*Author should not be blank");
        const isbn = screen.queryByText(
          "*ISBN should be more than 10 characters"
        );
        const publicationYear = screen.queryByText(
          "*Publication year should only be numeric"
        );

        expect(title).toBeTruthy();
        expect(author).toBeTruthy();
        expect(isbn).toBeTruthy();
        expect(publicationYear).toBeTruthy();
      } else {
        expect("Submit button should have rendered").toBe(false);
      }
    });
    it("request failed due to server issue", async () => {
      book = {};
      render(<BookForm />);

      const submitButton = screen.queryByText("Save");
      if (submitButton) {
        await act(async () => {
          fireEvent.click(submitButton, {});
          await jest.runAllTimersAsync();
        });
        const error = screen.queryByText(
          "Unable to create entry, please try again in a while"
        );

        expect(error).toBeTruthy();
      } else {
        expect("Submit button should have rendered").toBe(false);
      }
    });
  });
  describe("Update Book", () => {
    it("renders component", async () => {
      render(<BookForm {...book} />);

      const title = screen.queryByPlaceholderText("Title");
      const author = screen.queryByPlaceholderText("Author");
      const publicationYear = screen.queryByPlaceholderText("YYYY");
      const isbn = screen.queryByPlaceholderText("0000000000");
      const description: HTMLTextAreaElement | null =
        screen.queryByLabelText("Description");
      const cancelLink = screen.queryByTestId("cancel");

      expect(title?.getAttribute("value")).toBeTruthy();
      expect(author?.getAttribute("value")).toBeTruthy();
      expect(publicationYear?.getAttribute("value")).toBeTruthy();
      expect(isbn?.getAttribute("value")).toBeTruthy();
      expect(description?.value).toBeTruthy();
      expect(cancelLink?.getAttribute("href")).toBe("/books/1");
    });
    it("request successfully", async () => {
      render(<BookForm {...book} />);

      const submitButton = screen.queryByText("Save");
      if (submitButton) {
        await act(async () => {
          fireEvent.click(submitButton, {});
          await jest.runAllTimersAsync();
        });
        expect(response?.errors).toBeFalsy();
        expect(response?.id).toBeTruthy();
        expect(response?.title).toBeTruthy();
        expect(response?.author).toBeTruthy();
        expect(response?.description).toBeTruthy();
        expect(response?.isbn).toBeTruthy();
        expect(response?.publicationYear).toBeTruthy();
        expect(requestFlag).toBe("update");
        expect(redirectPath).toBe("/books/1");
      } else {
        expect("Submit button should have rendered").toBe(false);
      }
    });
    it("request failed due to entry", async () => {
      book = {
        errors: {
          title: "Title should not be blank",
          author: "Author should not be blank",
          isbn: "ISBN should be more than 10 characters",
          publicationYear: "Publication year should only be numeric",
        },
      };
      render(<BookForm {...book} />);

      const submitButton = screen.queryByText("Save");
      if (submitButton) {
        await act(async () => {
          fireEvent.click(submitButton, {});
          await jest.runAllTimersAsync();
        });
        const title = screen.queryByText("*Title should not be blank");
        const author = screen.queryByText("*Author should not be blank");
        const isbn = screen.queryByText(
          "*ISBN should be more than 10 characters"
        );
        const publicationYear = screen.queryByText(
          "*Publication year should only be numeric"
        );

        expect(title).toBeTruthy();
        expect(author).toBeTruthy();
        expect(isbn).toBeTruthy();
        expect(publicationYear).toBeTruthy();
      } else {
        expect("Submit button should have rendered").toBe(false);
      }
    });
    it("request failed due to server issue", async () => {
      book = {};
      render(<BookForm id="1" />);

      const submitButton = screen.queryByText("Save");
      if (submitButton) {
        await act(async () => {
          fireEvent.click(submitButton, {});
          await jest.runAllTimersAsync();
        });
        const error = screen.queryByText(
          "Unable to update entry, please try again in a while."
        );
        expect(error).toBeTruthy();
      } else {
        expect("Submit button should have rendered").toBe(false);
      }
    });
  });
});
