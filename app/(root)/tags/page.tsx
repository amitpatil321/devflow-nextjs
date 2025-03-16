import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import paths from "@/constants/paths";
import { SearchParamsProps } from "@/lib/actions/shared.types";
import { getAllTags } from "@/lib/actions/tag.action";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tags | Dev Overflow",
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const { q, filter, page } = searchParams;

  const { tags, total } = await getAllTags({
    searchQuery: q,
    filter,
    page,
  });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={paths.tags}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />

        <Filters
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              href={`${paths.tags}/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="light-border background-light900_dark200 flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="text-dark400_light500 small-medium mt-3.5">
                  <span className="primary-text-gradient body-semibold mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link={paths.askQuestion}
            linkTitle="Ask a question"
          />
        )}
      </section>

      <div className="mt-6">
        <Pagination total={total} />
      </div>
    </>
  );
};

export default page;
