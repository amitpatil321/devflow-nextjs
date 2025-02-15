import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "../../../constants/filters";
import pages from "../../../constants/paths";

const questions = [
  {
    _id: 1,
    title: "How to optimize performance in a React application?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "performance" },
      { _id: "3", name: "javascript" },
    ],
    author: {
      _id: 1,
      name: "john_doe",
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    upvotes: 2500,
    views: 230000,
    answers: 30000,
    isAuthor: true,
    createdAt: "2025-02-06T14:23:45.000Z",
  },
  {
    _id: 2,
    title: "What are the best practices for securing a REST API?",
    tags: [
      { _id: "4", name: "api" },
      { _id: "5", name: "security" },
      { _id: "6", name: "authentication" },
    ],
    author: {
      _id: 2,
      name: "alice_dev",
      picture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    upvotes: 40,
    views: 500,
    answers: 5,
    createdAt: "2024-02-05T09:15:30.000Z",
  },
  {
    _id: 3,
    title: "Why is my SQL query running slow, and how can I optimize it?",
    tags: [
      { _id: "7", name: "sql" },
      { _id: "8", name: "database" },
      { _id: "9", name: "performance" },
    ],
    author: {
      _id: 3,
      name: "data_master",
      picture: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    upvotes: 18,
    views: 150,
    answers: 2,
    createdAt: "2024-02-04T18:30:10.000Z",
  },
  {
    _id: 4,
    title: "How does garbage collection work in Python?",
    tags: [
      { _id: "10", name: "python" },
      { _id: "11", name: "memory-management" },
      { _id: "12", name: "garbage-collection" },
    ],
    author: {
      _id: 4,
      name: "python_enthusiast",
      picture: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    upvotes: 35,
    views: 420,
    answers: 4,
    createdAt: "2024-02-03T22:45:20.000Z",
  },
  {
    _id: 5,
    title: "What are the benefits of using TypeScript over JavaScript?",
    tags: [
      { _id: "13", name: "typescript" },
      { _id: "14", name: "javascript" },
      { _id: "15", name: "frontend" },
    ],
    author: {
      _id: 5,
      name: "ts_fan",
      picture: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    upvotes: 30,
    views: 310,
    answers: 3,
    createdAt: "2024-02-02T11:05:55.000Z",
  },
  {
    _id: 6,
    title: "How to implement authentication in a Next.js application?",
    tags: [
      { _id: "16", name: "next.js" },
      { _id: "5", name: "security" },
      { _id: "17", name: "authentication" },
    ],
    author: {
      _id: 6,
      name: "next_expert",
      picture: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    upvotes: 22,
    views: 210,
    answers: 2,
    createdAt: "2024-02-01T08:30:40.000Z",
  },
  {
    _id: 7,
    title: "What are the advantages of using GraphQL over REST?",
    tags: [
      { _id: "18", name: "graphql" },
      { _id: "4", name: "api" },
      { _id: "19", name: "backend" },
    ],
    author: {
      _id: 7,
      name: "graphql_guru",
      picture: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    upvotes: 50,
    views: 700,
    answers: 6,
    createdAt: "2024-01-30T12:20:25.000Z",
  },
  {
    _id: 8,
    title: "How to handle state management in a large React application?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "20", name: "redux" },
      { _id: "21", name: "state-management" },
    ],
    author: {
      _id: 8,
      name: "state_keeper",
      picture: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    upvotes: 28,
    views: 275,
    answers: 3,
    createdAt: "2025-01-29T17:15:10.000Z",
  },
  {
    _id: 9,
    title:
      "What is the difference between Monolith and Microservices architecture?",
    tags: [
      { _id: "22", name: "architecture" },
      { _id: "23", name: "microservices" },
      { _id: "24", name: "monolith" },
    ],
    author: {
      _id: 9,
      name: "dev_ops_pro",
      picture: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    upvotes: 45,
    views: 600,
    answers: 7,
    createdAt: "2024-01-28T21:40:30.000Z",
  },
  {
    _id: 10,
    title: "What are the key differences between SQL and NoSQL databases?",
    tags: [
      { _id: "7", name: "sql" },
      { _id: "8", name: "database" },
      { _id: "25", name: "nosql" },
    ],
    author: {
      _id: 10,
      name: "db_architect",
      picture: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    upvotes: 38,
    views: 450,
    answers: 4,
    createdAt: "2024-01-27T14:10:50.000Z",
  },
];

const page = () => {
  return (
    <>
      {/* w-full flex-col-reverse justify-between gap-4 */}
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row-reverse sm:items-center">
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
        <h1 className="bold text-3xl">All Questions</h1>
      </div>
      <div className="mt-11 justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={pages.home}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filters filters={HomePageFilters} otherClasses="hidden max-md:flex" />
        <HomeFilters />

        <div className="mt-6 flex w-full flex-col gap-6">
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
