import Book from "@/types/Book";
import Link from "next/link";
import TableItem from "./table-item";

const Table = (props: { books: Book[] }) => {
  return (
    <div className="p-10 pt-8 flex flex-col justify-center items-start gap-8 max-h-min">
      {!!props.books?.length && (
        <div className="grid justify-between w-full grid-cols-[repeat(auto-fill,10rem)] auto-cols-max gap-y-8 gap-x-2">
          {props.books.map((book) => (
            <Link
              className="w-40 min-h-min"
              key={book.id}
              href={`/books/${book.id}`}
              data-testid={book.id}
            >
              <TableItem
                title={book.title}
                author={book.author}
                publicationYear={book.publicationYear}
                isbn={book.isbn}
                description={book.description}
              />
            </Link>
          ))}
        </div>
      )}
      {!props.books?.length && (
        <span className="w-full text-center text-italics text-xl">
          No books found
        </span>
      )}
    </div>
  );
};

export default Table;
