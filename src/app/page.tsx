import TableSearch from "@/components/table/table-search";
import Table from "../components/table/table";
import { getAllBooks, searchBooks } from "@/services/book-service";
import Book from "@/types/Book";
import TablePagination from "@/components/table/table-pagination";

const page = async (props: {
  searchParams?: Promise<{
    query?: string;
    pageNumber?: number;
    pageSize?: number;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const pageSize: number = searchParams?.pageSize || 20;
  const pageNumber: number = searchParams?.pageNumber || 0;

  let totalPages: number = 1;

  let bookList: Book[] = [];

  if (query) {
    await searchBooks({
      pageNumber,
      pageSize,
      author: query,
      title: query,
    }).then((body) => {
      bookList = [];
      totalPages = 1;
      if (body) {
        bookList = body.content;
        totalPages = body.totalPages;
      }
    });
  } else {
    await getAllBooks({ pageNumber, pageSize }).then((body) => {
      bookList = [];
      totalPages = 1;
      if (body) {
        bookList = body.content;
        totalPages = body.totalPages;
      }
    });
  }

  return (
    <div>
      <TableSearch />
      <Table books={bookList} />
      <TablePagination totalPages={totalPages} />
    </div>
  );
};

export default page;
