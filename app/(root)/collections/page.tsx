import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import paths from "@/constants/paths";
import { SearchParamsProps } from "@/lib/actions/shared.types";
import { getSavedQuestions } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  const { q, filter, page } = searchParams;

  if (!userId) return null;

  const { questions, total } = await getSavedQuestions({
    clerkId: userId,
    searchQuery: q,
    filter,
    page,
  });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Saved Questions</h1>

      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filters
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="flex flex-col gap-6 mt-6 w-full">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <NoResults
            title="There are no saved questions to show"
            description="Visit the questions page 🚀 and save a Question 💡"
            link={paths.home}
            linkText="Show Questions"
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
