import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import paths from "@/constants/paths";
import { SearchParamsProps } from "@/lib/actions/shared.types";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";

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

      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11">
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

      <section className="flex flex-wrap gap-4 mt-12">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              href={`${paths.tags}/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="flex flex-col px-8 py-10 border light-border rounded-2xl w-full sm:w-[260px] background-light900_dark200">
                <div className="px-5 py-1.5 rounded-sm w-fit background-light800_dark400">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="mt-3.5 text-dark400_light500 small-medium">
                  <span className="mr-2.5 primary-text-gradient body-semibold">
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
