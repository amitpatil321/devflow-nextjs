import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/lib/actions/shared.types";
import { requestLogin } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { HomePageFilters } from "../../../constants/filters";
import { default as pages, default as paths } from "../../../constants/paths";

export const metadata: Metadata = {
  title: "Home | Dev Overflow",
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  const { q, filter, page } = searchParams;
  let results;
  if (searchParams.filter === "recommended") {
    if (userId) {
      results = await getRecommendedQuestions({
        userId,
        searchQuery: q,
        page: Number(page),
      });
    } else {
      requestLogin();
      results = {
        questions: [],
        total: 0,
      };
    }
  } else {
    results = await getQuestions({
      searchQuery: q,
      filter,
      page: Number(page),
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-dark100_light900 h1-bold">All Questions</h1>
        <Link
          href={`${paths.askQuestion}`}
          className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
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

      <section className="mt-6 flex w-full flex-col gap-6">
        {results.questions?.length > 0 ? (
          results.questions.map((question) => (
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

      <div className="mt-6">
        <Pagination total={results.total} />
      </div>
    </>
  );
};

export default page;
