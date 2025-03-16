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
    <div className="bg-light flex min-h-[56px] w-full grow flex-row items-center rounded-xl bg-light-800 px-4 py-2 dark:bg-dark-400">
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
        className="paragraph-regular text-dark400_light700 no-focus placeholder border-none bg-transparent shadow-none outline-none"
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
