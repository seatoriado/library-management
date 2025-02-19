"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  return (
    <div>
      {path !== "/" && (
        <Link href="/" className="p-10 pb-0">
          <button className="px-4 py-2 text-xl text-blue-400 text-bold">
            &lt; Back to Dashboard
          </button>
        </Link>
      )}
    </div>
  );
};

export { Header };
