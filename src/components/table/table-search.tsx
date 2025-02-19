"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TableSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get("query")?.toString();
  const pageSize = searchParams.get("pageSize")?.toString() || "20";
  const params = new URLSearchParams(searchParams);
  params.set("pageNumber", "0");
  params.set("pageSize", pageSize);

  function handleSearch(searchString: string) {
    if (searchString) {
      params.set("query", searchString);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="px-14 pt-5 flex flex-row justify-between items-center w-full">
      <div className="flex gap-8 w-full">
        <input
          className="max-w-96 w-full px-4 py-2 rounded-xl"
          type="text"
          placeholder="Search..."
          defaultValue={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <Link href="books/new" className="leading-1/2">
        <span className="rounded-xl text-green-500 text-7xl h-full leading-[0.5]">
          +
        </span>
      </Link>
    </div>
  );
};

export default TableSearch;
