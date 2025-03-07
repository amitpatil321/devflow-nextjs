import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
import paths from "@/constants/paths";
import { searchParamsProps } from "@/lib/actions/shared.types";
import { getSavedQuestions } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const page = async ({ searchParams }: searchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const questions = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
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

      <section className="mt-6 flex w-full flex-col gap-6">
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
    </>
  );
};

export default page;
