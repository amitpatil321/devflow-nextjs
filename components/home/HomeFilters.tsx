"use client";
import { HomePageFilters } from "@/constants/filters";
import { makeUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<string | null>(
    searchParams.get("filter") || null,
  );
  const router = useRouter();

  const handleFilterChange = (selected: string) => {
    const selectedItem = selected.toLowerCase();

    if (active === selectedItem) {
      setActive(null);
      const url = makeUrl("filter", null);
      router.push(url);
      return;
    }

    setActive(() => {
      const url = makeUrl("filter", selectedItem);
      router.push(url);
      return selectedItem;
    });
  };

  return (
    <div className="hidden md:flex flex-wrap gap-3 mt-2">
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClick={() => handleFilterChange(item.value)}
            className={`body-medium mt-4 rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value ? "bg-primary-100 text-primary-500" : "bg-light-800 text-light-500 hover:bg-primary-100"}`}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
