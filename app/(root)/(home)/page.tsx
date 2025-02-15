import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/actions/question.action";
import { HomePageFilters } from "../../../constants/filters";
import pages from "../../../constants/paths";

const page = async () => {
  const questions = await getQuestions({});

  return (
    <>
      {/* w-full flex-col-reverse justify-between gap-4 */}
      <div className="flex sm:flex-row-reverse flex-col justify-between sm:items-center gap-4 w-full">
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="px-4 py-3 min-h-[46px] !text-light-900 primary-gradient">
            Ask a Question
          </Button>
        </Link>
        <h1 className="text-3xl bold">All Questions</h1>
      </div>
      <div className="max-sm:flex-col justify-between sm:items-center gap-5 mt-11">
        <LocalSearch
          route={pages.home}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters filters={HomePageFilters} otherClasses="hidden max-md:flex" />
        <HomeFilters />

        <div className="flex flex-col gap-6 mt-6 w-full">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <NoResults
              title="There's no questions to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
              link={pages.askQuestion}
              linkText="Ask a question"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
