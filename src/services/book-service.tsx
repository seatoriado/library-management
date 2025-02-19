import BookCreate from "@/types/BookCreate";
import BookInsight from "@/types/BookInsights";
import BookPageList from "@/types/BookPageList";
import Book from "@/types/Book";

const getAllBooks = async ({ ...query }): Promise<BookPageList | null> => {
  const url = `${process.env.BOOKS_API_PATH}?${new URLSearchParams(
    query
  ).toString()}`;
  return fetchHelper(url, "GET");
};

const getBook = async (id: string): Promise<Book | null> => {
  const url = `${process.env.BOOKS_API_PATH}/${id}`;
  return fetchHelper(url, "GET");
};

const createBook = async (book: BookCreate): Promise<Book | null> => {
  const url = `${process.env.NEXT_PUBLIC_BOOKS_API_PATH}`;
  return fetchHelper(url, "POST", book);
};

const updateBook = async (id: string, book: Book): Promise<Book | null> => {
  const url = `${process.env.NEXT_PUBLIC_BOOKS_API_PATH}/${id}`;
  return fetchHelper(url, "PUT", book);
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const url = `${process.env.NEXT_PUBLIC_BOOKS_API_PATH}/${id}`;
  return fetchHelper(url, "DELETE");
};

const searchBooks = async ({ ...query }): Promise<BookPageList | null> => {
  const url = `${process.env.BOOKS_API_PATH}/search?${new URLSearchParams(
    query
  ).toString()}`;
  return fetchHelper(url, "GET");
};

const aiInsightsBook = async (id: string): Promise<BookInsight | null> => {
  const url = `${process.env.NEXT_PUBLIC_BOOKS_API_PATH}/${id}/ai-insights`;
  return fetchHelper(url, "GET");
};

const fetchHelper = async (
  url: string,
  method: string,
  body?: unknown
): Promise<never | null> => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const requestOptions = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      const body = await response.json();
      return body;
    }
  } catch (error) {
    console.error(`Unexpected error occurred: ${error}`);
  }
  return null;
};

export {
  aiInsightsBook,
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  searchBooks,
  updateBook,
};
