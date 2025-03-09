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
import { useState } from "react";

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

  return (
    totalPages > 1 && (
      <Paging>
        <PaginationContent>
          <PaginationItem
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none text-gray-400"
                : "cursor-pointer"
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
                  className={`btn ${+currentPage === page ? "primary-gradient !text-light-900" : ""} cursor-pointer border-none`}
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
                ? "pointer-events-none text-gray-300"
                : "cursor-pointer"
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
