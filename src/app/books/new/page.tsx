import { BookForm } from "@/components/book/book-form";
import BookCreate from "@/types/BookCreate";

const page = () => {
  const book: BookCreate = {
    title: "",
    author: "",
    isbn: "",
    publicationYear: new Date().getFullYear(),
  };

  return <BookForm {...book} />;
};

export default page;
