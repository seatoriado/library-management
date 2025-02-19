import Book from "@/types/Book";
import Image from "next/image";
import { BookManageButton } from "./book-manage-button";
import { BookInsightsButton } from "./book-insights-button";

const BookDetails = ({ ...props }: Book | null) => {
  const book: Book = {
    id: props.id,
    title: props.title,
    author: props.author,
    isbn: props.isbn,
    publicationYear: props.publicationYear,
    description: props?.description,
  };

  return (
    <div className="flex flex-row mx-20 my-10 gap-10">
      <Image
        className="h-full w-2/5"
        src="/file.svg"
        alt="Book image"
        width={0}
        height={50}
      />
      <div className="flex flex-col gap-2 text-xl w-full max-w-[calc(100vw_-_40vw_-_7.5rem)">
        <div className="text-5xl mb-2 flex flex-row justify-between items-center font-bold">
          {book.title}
          <BookManageButton id={book.id} />
        </div>
        <div>Author: {book.author}</div>
        <div>ISBN: {book.isbn}</div>
        <div>Published on: {book.publicationYear}</div>
        {book.description && (
          <div>
            <div>Description:</div>
            <div>{book.description}</div>
          </div>
        )}
        <BookInsightsButton id={book.id} />
      </div>
    </div>
  );
};

export { BookDetails };
