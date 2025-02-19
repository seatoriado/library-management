import { BookDetails } from "@/components/book/book-details";
import Book from "@/types/Book";
import { getBook } from "@/services/book-service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }

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

  return <BookDetails {...book} />;
};

export default page;
