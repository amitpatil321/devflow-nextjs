"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makeUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface FiltersType {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  placeholder?: string;
}

const Filters = ({
  filters,
  otherClasses,
  containerClasses,
  placeholder,
}: FiltersType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get("filter");

  const handleChange = (item: string) => {
    const url = makeUrl("filter", item);
    router.push(url, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses || ""}`}>
      <Select onValueChange={handleChange} defaultValue={filter || undefined}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[54px] border px-5 py-2.5 sm:min-w-[180px]`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder || "Select a filter"} />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((each) => (
              <SelectItem
                key={each.value}
                value={each.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {each.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
