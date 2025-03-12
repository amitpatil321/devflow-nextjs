import paths from "@/constants/paths";
import { globalSearch } from "@/lib/actions/general.action";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";

const GlobalResult = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Record<
    string,
    {
      _id?: string;
      id?: string;
      title?: string;
      name?: string;
      content?: string;
      type?: string;
    }[]
  > | null>(null);
  const searchParams = useSearchParams();

  const global = searchParams.get("global");
  const type = searchParams.get("type");
  const icons = {
    question: "/assets/icons/question.svg",
    answer: "/assets/icons/Untitled.svg",
    user: "/assets/icons/user.svg",
    tag: "/assets/icons/tag.svg",
  };

  useEffect(() => {
    if (!global) return;
    setIsLoading(true);

    const fetchResults = async () => {
      setResults(null);
      try {
        const result = await globalSearch({
          query: global,
          type,
        });

        setResults(result);
      } finally {
        setIsLoading(false);
      }
    };

    if (global) fetchResults();
  }, [global, type]);

  const buildUrl = (id: string, type: string): string => {
    if (type === "question") {
      return `${paths.question}/${id}`;
    } else if (type === "answer") {
      return `${paths.question}/${id}`;
    } else if (type === "user") {
      return `${paths.profile}/${id}`;
    } else if (type === "tag") {
      return `${paths.tags}/${id}`;
    }
    return "/";
  };

  const isAllEmpty = Object.values(results || {}).every(
    (arr) => arr.length === 0,
  );

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
            <ReloadIcon className="my-2 w-10 h-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {!isAllEmpty ? (
                Object.values(results ?? []).map((items: any, index: number) =>
                  items.length > 0
                    ? items.map((item: any) => {
                        return (
                          <Link
                            href={buildUrl(item.id, item.type)}
                            key={item.type + item.id + index}
                            className="flex items-start gap-3 hover:bg-light-700/50 dark:hover:bg-dark-500/50 px-5 py-2.5 w-full cursor-pointer"
                          >
                            <Image
                              src={
                                icons[item.type as keyof typeof icons] ??
                                "/assets/icons/tag.svg"
                              }
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
                        );
                      })
                    : null,
                )
              ) : (
                <div className="flex-col flex-center px-5">
                  <p className="px-5 py-2.5 text-dark200_light800 text-center body-regular">
                    <p className="text-5xl">🫣</p>
                    Oops, no results found
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
