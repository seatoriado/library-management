import {
  aiInsightsBook,
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  searchBooks,
  updateBook,
} from "@/services/book-service";
import "@testing-library/jest-dom";

const bookSuccess = {
  id: "1",
  title: "The Alchemist",
  author: "Paulo Coelho",
  isbn: "0000000000",
  publicationYear: 1988,
  description:
    "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
};

const bookInsightSuccess = {
  id: "1",
  title: "The Alchemist",
  author: "Paulo Coelho",
  isbn: "0000000000",
  publicationYear: 1988,
  description:
    "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
  insights:
    "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
};

const bookListSuccess = {
  totalPages: 2,
  content: [
    {
      id: "1",
      title: "The Alchemist",
      author: "Paulo Coelho",
      isbn: "0000000000",
      publicationYear: 1988,
      description:
        "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
    },
  ],
};

let response: unknown;
let isOk = true;
let path = "";

global.fetch = jest.fn((url) => {
  path = url;
  return Promise.resolve({
    ok: isOk,
    json: () => response,
  });
}) as jest.Mock;

describe("Book Service", () => {
  beforeAll(() => {
    isOk = true;
    response = null;
    path = "";
  });

  describe("getAllBooks", () => {
    it("success", async () => {
      response = Promise.resolve(bookListSuccess);

      try {
        await getAllBooks({ pageNumber: 0, pageSize: 20 }).then((result) => {
          expect(result?.content?.length).toBeTruthy();
          expect(path).toBe(
            "private_test_host/api/v1/books?pageNumber=0&pageSize=20"
          );
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("empty", async () => {
      response = Promise.resolve({
        totalPages: 1,
        content: [],
      });

      try {
        await getAllBooks({ pageNumber: 0, pageSize: 20 }).then((result) => {
          expect(result?.content?.length).toBe(0);
          expect(path).toBe(
            "private_test_host/api/v1/books?pageNumber=0&pageSize=20"
          );
        });
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
    it("error", async () => {
      response = Promise.reject();

      try {
        await getAllBooks({ pageNumber: 0, pageSize: 20 }).then((result) => {
          expect(result).toBe(null);
          expect(path).toBe(
            "private_test_host/api/v1/books?pageNumber=0&pageSize=20"
          );
        });
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });
  describe("getBook", () => {
    it("success", async () => {
      response = Promise.resolve(bookSuccess);

      try {
        await getBook("1").then((result) => {
          expect(result).toBeTruthy();
          expect(path).toBe("private_test_host/api/v1/books/1");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("not found", async () => {
      response = Promise.reject();

      try {
        await getBook("1").then((result) => {
          expect(result).toBe(null);
          expect(path).toBe("private_test_host/api/v1/books/1");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
  });
  describe("createBook", () => {
    it("success", async () => {
      response = Promise.resolve(bookSuccess);

      try {
        await createBook({
          title: "The Alchemist",
          author: "Paulo Coelho",
          isbn: "0000000000",
          publicationYear: 1988,
          description:
            "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
        }).then((result) => {
          expect(result?.id).toBe("1");
          expect(path).toBe("public_test_host/api/v1/books");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("error", async () => {
      response = Promise.reject();

      try {
        await createBook({
          title: "The Alchemist",
          author: "Paulo Coelho",
          isbn: "0000000000",
          publicationYear: 1988,
          description:
            "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
        }).then((result) => {
          expect(result).toBeFalsy();
          expect(path).toBe("public_test_host/api/v1/books");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
  });
  describe("updateBook", () => {
    it("success", async () => {
      response = Promise.resolve(bookSuccess);

      try {
        await updateBook("1", {
          id: "1",
          title: "The Alchemist",
          author: "Paulo Coelho",
          isbn: "0000000000",
          publicationYear: 1988,
          description:
            "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
        }).then((result) => {
          expect(result).toBeTruthy();
          expect(path).toBe("public_test_host/api/v1/books/1");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("error", async () => {
      response = Promise.reject();

      try {
        await updateBook("1", {
          id: "1",
          title: "The Alchemist",
          author: "Paulo Coelho",
          isbn: "0000000000",
          publicationYear: 1988,
          description:
            "The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
        }).then((result) => {
          expect(result).toBeFalsy();
          expect(path).toBe("public_test_host/api/v1/books/1");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
  });
  describe("deleteBook", () => {
    it("success", async () => {
      response = Promise.resolve(bookSuccess);

      try {
        await deleteBook("1").then((result) => {
          expect(result).toBeTruthy();
          expect(path).toBe("public_test_host/api/v1/books/1");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("error", async () => {
      response = Promise.reject();

      try {
        await deleteBook("1").then((result) => {
          expect(result).toBeFalsy();
          expect(path).toBe("public_test_host/api/v1/books/1");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
  });
  describe("searchBooks", () => {
    it("success", async () => {
      response = Promise.resolve(bookListSuccess);

      try {
        await searchBooks({
          pageNumber: 0,
          pageSize: 20,
          title: "the",
          author: "the",
        }).then((result) => {
          expect(result?.content?.length).toBeTruthy();
          expect(path).toBe(
            "private_test_host/api/v1/books/search?pageNumber=0&pageSize=20&title=the&author=the"
          );
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("empty", async () => {
      response = Promise.resolve({
        totalPages: 1,
        content: [],
      });

      try {
        await searchBooks({
          pageNumber: 0,
          pageSize: 20,
          title: "the",
          author: "the",
        }).then((result) => {
          expect(result?.content?.length).toBe(0);
          expect(path).toBe(
            "private_test_host/api/v1/books/search?pageNumber=0&pageSize=20&title=the&author=the"
          );
        });
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
    it("error", async () => {
      response = Promise.reject();

      try {
        await searchBooks({
          pageNumber: 0,
          pageSize: 20,
          title: "the",
          author: "the",
        }).then((result) => {
          expect(result).toBe(null);
          expect(path).toBe(
            "private_test_host/api/v1/books/search?pageNumber=0&pageSize=20&title=the&author=the"
          );
        });
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });
  describe("aiInsightsBook", () => {
    it("success", async () => {
      response = Promise.resolve(bookInsightSuccess);

      try {
        await aiInsightsBook("1").then((result) => {
          expect(result).toBeTruthy();
          expect(result?.insights).toBeTruthy();
          expect(path).toBe("public_test_host/api/v1/books/1/ai-insights");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
    it("not found", async () => {
      response = Promise.reject();

      try {
        await aiInsightsBook("1").then((result) => {
          expect(result).toBe(null);
          expect(path).toBe("public_test_host/api/v1/books/1/ai-insights");
        });
      } catch (error) {
        expect(error).toBeFalsy();
      }
    });
  });
});
