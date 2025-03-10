import { globalSearch } from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";

const GlobalResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const searchParams = useSearchParams();
  //   const [result] = useState(false);

  const searchTerm = searchParams.get("global");
  const type = searchParams.get("type");

  // let result = [
  //   { type: "question", id: 1, title: "I am question 1" },
  //   { type: "question", id: 2, title: "I am question 2" },
  //   { type: "question", id: 3, title: "I am question 3" },
  //   { type: "tag", id: 1, title: "react" },
  //   { type: "tag", id: 2, title: "python" },
  //   { type: "user", id: 1, title: "devamit" },
  //   { type: "answer", id: 1, title: "This is answer" },
  // ];

  // let filtered;
  // if (type) {
  //   filtered = Object.values(result).filter((each) => each.type === type);
  // } else filtered = [...result];

  useEffect(() => {
    if (!searchTerm) return;

    const fetchResults = async () => {
      setIsLoading(true);
      setResults(null);
      console.log("inside");
      try {
        console.log("inside try");
        const result = await globalSearch({
          query: searchTerm,
          type: "question",
        });
        console.log("result", result);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) fetchResults();
  }, [searchTerm, type]);

  const filtered = {};

  return (
    <div className="top-full left-0 z-10 absolute bg-light-800 dark:bg-dark-400 shadow-sm mt-3 py-5 rounded-xl w-full">
      <GlobalFilters />
      <div className="bg-light-700/50 dark:bg-dark-500/50 my-5 h-[1px]" />

      <div className="space-y-5">
        <p className="px-5 paragraph-semibold text-dark400_light900">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-col flex-center px-5">
            {/* <ReloadIcon className="my-2 w-10 h-10 text-primary-500 animate-spin" /> */}
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.length > 0 ? (
              filtered.map((item: any, index: number) => (
                <Link
                  href={"/"}
                  //   href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex items-start gap-3 hover:bg-light-700/50 dark:bg-dark-500/50 px-5 py-2.5 w-full cursor-pointer"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />

                  <div className="flex flex-col">
                    <p className="text-dark200_light800 line-clamp-1 body-medium">
                      {item.title}
                    </p>
                    <p className="mt-1 font-bold text-light400_light500 capitalize small-medium">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-col flex-center px-5">
                <p className="px-5 py-2.5 text-dark200_light800 body-regular">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
