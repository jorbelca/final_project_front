"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "px-3 py-1 border rounded",
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        )}
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>

      <span className="px-3 py-1 border rounded">{currentPage} / {totalPages}</span>

      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-3 py-1 border rounded",
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        )}
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}