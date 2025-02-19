import BookCreate from "./BookCreate";

export default interface Book extends BookCreate {
  id?: string;
  errors?: {
    title?: string;
    author?: string;
    isbn?: string;
    publicationYear?: string;
    description?: string;
  };
}
