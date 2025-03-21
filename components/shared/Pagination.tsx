"use client";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as Paging,
} from "@/components/ui/pagination";
import { ItemsPerPage } from "@/constants";
import { makeUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  total: number;
}

const Pagination = ({ total }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );

  const totalPages = Math.ceil(total / ItemsPerPage);
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const url = makeUrl("page", pageNumber.toString());
    router.push(url);
  };

  useEffect(() => {
    if (!searchParams.has("page")) setCurrentPage(1);
  }, [searchParams]);

  return (
    totalPages > 1 && (
      <Paging>
        <PaginationContent className="select-none">
          <PaginationItem
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none text-gray-400 dark:text-gray-700"
                : "cursor-pointer text-slate-950 dark:text-slate-50"
            }
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <PaginationPrevious className="btn" />
          </PaginationItem>
          {pagesArray?.map((page) => {
            return (
              <PaginationItem key={page} onClick={() => handlePageChange(page)}>
                <PaginationLink
                  isActive={currentPage === page}
                  className={`btn text-slate-950 dark:text-slate-50 ${+currentPage === page ? "primary-gradient !text-light-900" : ""} cursor-pointer border-none`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem
            aria-disabled={currentPage == totalPages}
            className={
              currentPage == totalPages
                ? "pointer-events-none text-gray-400 dark:text-gray-700"
                : "cursor-pointer text-slate-950 dark:text-slate-50"
            }
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <PaginationNext className="btn" />
          </PaginationItem>
        </PaginationContent>
      </Paging>
    )
  );
};

export default Pagination;
