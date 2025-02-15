"use client";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "newest";
  return (
    <div className="mt-4 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClick={() => {}}
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
