import Image from "next/image";

const TableItem = ({ ...props }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-40 min-w-max max-w-40">
      <Image
        className="w-full h-32"
        src="/file.svg"
        alt="Book image"
        width={0}
        height={50}
      />
      <div className="flex flex-col justify-center items-center w-40">
        {props?.title && (
          <div className="font-bold text-sm text-center line-clamp-3 break-all">
            {props?.title}
          </div>
        )}
        {props?.author && (
          <div className="italic text-xs text-center line-clamp-3 break-all">
            {props?.author}
          </div>
        )}
        {props?.publicationYear && (
          <div className="italic text-xs text-center line-clamp-3 break-all">
            {props?.publicationYear}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableItem;
