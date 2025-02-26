import Image from "next/image";
import Link from "next/link";

import { AnswerFilters } from "@/constants/filters";
import { getAllAnswers } from "@/lib/actions/answer.action";
import { timeAgo } from "@/lib/utils";
import Filters from "./Filters";
import ParseHTML from "./ParseHTML";

interface ListAnswersProps {
  questionId: string;
  loggedUser: string;
}

const ListAnswers = async ({ questionId, loggedUser }: ListAnswersProps) => {
  const allAnswers = await getAllAnswers({ questionId });
  console.log(allAnswers);
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{allAnswers?.length} Answers</h3>

        <Filters filters={AnswerFilters} />
      </div>
      {allAnswers?.map(
        ({ _id, author, question, content, upvotes, downvotes, createdOn }) => (
          <article key={_id} className="mt-8 flex flex-col gap-4">
            <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${author.clerkId}`}
                className="flex items-center justify-start gap-1"
              >
                <Image
                  src={author.picture}
                  className="rounded-full"
                  width={18}
                  height={18}
                  alt="profile"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="text-dark300_light700 body-semibold mr-1">
                    {author.name}
                  </p>
                  <p className="text-light400_light500 small-regular mt-0.5 line-clamp-1">
                    <span className="max-sm:hidden"> • </span>
                    answered {timeAgo(createdOn)}
                  </p>
                </div>
              </Link>
              <div className="small-regular flex justify-end">Votes</div>
            </div>
            <ParseHTML data={content} />
            <hr />
          </article>
        ),
      )}
    </div>
  );
};

export default ListAnswers;
