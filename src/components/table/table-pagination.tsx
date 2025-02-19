"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TablePagination = ({ totalPages }: { totalPages: number }) => {
  const pageSizes = [20, 40, 60, 100];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get("query")?.toString();
  const pageSize = searchParams.get("pageSize")?.toString() || "20";
  const params = new URLSearchParams(searchParams);
  const pages = [...Array(totalPages)].map((v, i) => i + 1);

  params.set("pageNumber", "0");
  params.set("pageSize", pageSize);

  if (query) {
    params.set("query", query);
  }

  function onChangePage(value: string) {
    params.set("pageNumber", value);
    replace(`${pathname}?${params.toString()}`);
  }

  function onChangeSize(value: string) {
    params.set("pageSize", value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="px-8 flex flex-row justify-end w-full gap-3">
      <select
        className="rounded-xl"
        onChange={(e) => onChangeSize(e.target.value)}
        defaultValue={pageSize}
        data-testid="page-size"
      >
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <div className="flex flex-row gap-1">
        {totalPages > 1 &&
          pages.map((v, i) => (
            <button
              className="p-2 rounded-xl text-bold text-blue-500"
              key={v}
              onClick={() => onChangePage(i.toString())}
            >
              {v}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TablePagination;
