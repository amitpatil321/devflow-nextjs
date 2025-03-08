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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleChange = (item: string) => {
    const url = makeUrl("filter", item);
    router.push(url, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses || ""}`}>
      <Select onValueChange={handleChange}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-darl500_light700 min-h-[54px] border px-5 py-2.5 sm:min-w-[180px]`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder || "Select a filter"} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((each) => (
              <SelectItem key={each.value} value={each.value}>
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
