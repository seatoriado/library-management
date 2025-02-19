import { BookForm } from "@/components/book/book-form";
import Book from "@/types/Book";
import { getBook } from "@/services/book-service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  let book: Book = {
    id: "",
    title: "",
    author: "",
    isbn: "",
    publicationYear: 0,
  };

  await getBook(id).then((body) => {
    if (body) {
      book = body;
    } else {
      notFound();
    }
  });

  return <BookForm {...book} />;
};

export default page;
