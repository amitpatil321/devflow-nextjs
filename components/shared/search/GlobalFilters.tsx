"use client";
import { makeUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GlobalFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState<string | null>(
    searchParams.get("type") || null,
  );
  const types = [
    { value: "question", label: "Question" },
    { value: "answer", label: "Answer" },
    { value: "user", label: "User" },
    { value: "tag", label: "Tag" },
  ];

  useEffect(() => {
    const url = makeUrl("type", active);
    router.push(url);
  }, [active, router]);

  const handleTypeChange = (item: string) => {
    if (item === active) {
      setActive(null);
      const url = makeUrl("type", null);
      router.push(url);
    } else setActive(item);
  };

  return (
    <div className="flex items-center gap-4 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-4">
        {types?.map((item) => {
          return (
            <button
              key={item.value}
              type="button"
              className={`light-border-2 small-medium :text-light-800 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500 ${
                active === item.value
                  ? "bg-primary-500 text-light-900"
                  : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
              } `}
              onClick={() => handleTypeChange(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalFilters;
