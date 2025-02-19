import { BookManageButton } from "@/components/book/book-manage-button";
import Book from "@/types/Book";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

const book: Book = {
  id: "1",
  title:
    "CakePHP Application Development: Step-by-step introduction to rapid web development using the open-source MVC CakePHP framework",
  author: "Ahsanul Bari, Anupom Syam",
  publicationYear: 2008,
  isbn: "0130DD963CCA48D57BFE2252C2A521F7",
  description:
    "I bought this book based on the reviews here. It was the highest rated CakePHP book on Amazon at the time so I figured I couldn't go wrong. I was a little wrong about that...\r\rThe book is pretty easy to ",
};

let deleteFlag = false;

jest.mock("@/services/book-service.tsx", () => ({
  ...jest.requireActual("@/services/book-service.tsx"),
  deleteBook: jest.fn(() => {
    deleteFlag = true;
    return Promise.resolve(book);
  }),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  redirect: jest.fn(),
}));

describe("Book Manage", () => {
  beforeAll(() => {
    deleteFlag = false;
  });
  it("renders page", async () => {
    render(<BookManageButton id="1" />);

    const editButton = screen.queryAllByText("Edit");
    const editLink = screen.queryByTestId("edit-1");
    const deleteButton = screen.queryAllByText("X");

    expect(editButton.length).toBe(1);
    expect(editLink?.getAttribute("href")).toBe("1/edit");
    expect(deleteButton.length).toBe(1);
  });
  it("when X button is clicked and confirmed", async () => {
    render(<BookManageButton id="1" />);

    const deleteButton = screen.queryByText("X");

    if (deleteButton) {
      await act(async () => {
        fireEvent.click(deleteButton, {});
        await jest.runAllTimersAsync();
      });
      const errorMessage = screen.queryByText(
        "Are you sure you want to delete this book?"
      );
      const confirmButton = screen.queryByText("Yes");
      if (confirmButton) {
        expect(errorMessage).toBeTruthy();
        await act(async () => {
          fireEvent.click(confirmButton, {});
          await jest.runAllTimersAsync();
        });
        expect(deleteFlag).toBe(true);
      } else {
        expect("Should have rendered").toBe(false);
      }
    } else {
      expect("Should have rendered").toBe(false);
    }
  });
  it("when X button is clicked and cancelled", async () => {
    render(<BookManageButton id="1" />);

    const deleteButton = screen.queryByText("X");

    if (deleteButton) {
      await act(async () => {
        fireEvent.click(deleteButton, {});
        await jest.runAllTimersAsync();
      });
      let errorMessage = screen.queryByText(
        "Are you sure you want to delete this book?"
      );
      const cancelButton = screen.queryByText("No");
      if (cancelButton) {
        expect(errorMessage).toBeTruthy();
        await act(async () => {
          fireEvent.click(cancelButton, {});
          await jest.runAllTimersAsync();
        });
        errorMessage = screen.queryByText(
          "Are you sure you want to delete this book?"
        );
        expect(errorMessage).toBeFalsy();
      } else {
        expect("Should have rendered").toBe(false);
      }
    } else {
      expect("Should have rendered").toBe(false);
    }
  });
});
