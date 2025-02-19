import { BookInsightsButton } from "@/components/book/book-insights-button";
import BookInsight from "@/types/BookInsights";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

let book: BookInsight;

jest.mock("@/services/book-service.tsx", () => ({
  ...jest.requireActual("@/services/book-service.tsx"),
  aiInsightsBook: jest.fn(() => {
    return Promise.resolve(book);
  }),
}));

describe("Book Insights", () => {
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
      insights: "OpenAI response",
    };
  });
  it("renders page", async () => {
    render(<BookInsightsButton id="1" />);

    const button = screen.queryAllByText("AI Insights");

    expect(button.length).toBe(1);
  });
  it("clicked button with success reponse", async () => {
    render(<BookInsightsButton id="1" />);

    let button = await screen.queryByText("AI Insights");

    if (button) {
      await act(async () => {
        if (button) {
          fireEvent.click(button, {});
        }
        await jest.runAllTimersAsync();
      });
      button = screen.queryByText("AI Insights");
      const field = screen.queryAllByText("AI Insight:");
      expect(button).toBe(null);
      expect(field.length).toBe(1);
    } else {
      expect("Should have rendered").toBe(false);
    }
  });
  it("clicked button with error response", async () => {
    book.insights = "";
    render(<BookInsightsButton id="1" />);

    let button = await screen.queryByText("AI Insights");

    if (button) {
      await act(async () => {
        if (button) {
          fireEvent.click(button, {});
        }
        await jest.runAllTimersAsync();
      });
      button = screen.queryByText("AI Insights");
      const field = screen.queryAllByText("AI Insight:");
      expect(button).not.toBe(null);
      expect(field.length).toBe(0);
    } else {
      expect("Should have rendered").toBe(false);
    }
  });
});
