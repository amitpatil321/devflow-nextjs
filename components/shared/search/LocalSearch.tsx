"use client";
import { Input } from "@/components/ui/input";
import { makeUrl, removeKeys } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LocalSearchType {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchType) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const debounce = setTimeout(() => {
      const updatedUrl = makeUrl("q", searchTerm);
      router.push(updatedUrl, { scroll: false });
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, router]);

  return (
    <div className="flex flex-row items-center bg-light bg-light-800 dark:bg-dark-400 px-4 py-2 rounded-xl w-full min-h-[56px] grow">
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        className={`no-focus placeholder paragraph-regular border-none bg-transparent text-[16px] shadow-none outline-none dark:border-none dark:bg-dark-400 ${otherClasses}`}
        onChange={(event) => {
          if (event.target.value !== searchTerm) {
            router.push(removeKeys(["page"]), { scroll: false });
          }
          setSearchTerm(event.target.value);
        }}
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
