import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="bg-light flex w-full max-w-[600px] flex-row rounded-xl bg-light-800 px-4 py-2 outline-none dark:bg-dark-400 max-lg:hidden">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        placeholder="Search questions"
        className="placeholder no-focus border-none bg-transparent text-[16px] shadow-none outline-none dark:border-none dark:bg-dark-400"
      />
    </div>
  );
};

export default GlobalSearch;
