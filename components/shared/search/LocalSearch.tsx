"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface LocalSearchType {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchType) => {
  return (
    <div className="bg-light flex min-h-[56px] w-full grow flex-row items-center rounded-xl bg-light-800 px-4 py-2 dark:bg-dark-400">
      {iconPosition == "left" && (
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
        value=""
        placeholder={placeholder}
        className={`no-focus placeholder border-none bg-transparent text-[16px] shadow-none outline-none dark:border-none dark:bg-dark-400 ${otherClasses}`}
        onChange={() => console.log("on change")}
      />
      {iconPosition == "right" && (
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
