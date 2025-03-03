import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/actions/question.action";
import { HomePageFilters } from "../../../constants/filters";
import { default as pages, default as paths } from "../../../constants/paths";

const page = async () => {
  const questions = await getQuestions();

  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full">
        <h1 className="text-dark100_light900 h1-bold">All Questions</h1>

        <Link
          href={`${paths.askQuestion}`}
          className="flex justify-end max-sm:w-full"
        >
          <Button className="px-4 py-3 min-h-[46px] !text-light-900 primary-gradient">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11">
        <LocalSearch
          route={pages.home}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters filters={HomePageFilters} otherClasses="hidden max-md:flex" />
      </div>

      <HomeFilters />

      <section className="flex flex-col gap-6 mt-6 w-full">
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
      </section>
    </>
  );
};

export default page;
