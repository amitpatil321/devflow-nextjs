import paths from "@/constants/paths";
import { formatNumber, timeAgo } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import EditDeleteActions from "../shared/EditDeleteActions";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface QuestionCardType {
  clerkId?: string | null;
  question: {
    _id: number;
    title: string;
    tags: {
      _id: string;
      name: string;
    }[];
    author: {
      _id: string;
      name: string;
      picture: string;
      clerkId: string;
    };
    upvotes: string[];
    views: number;
    answers: string[];
    createdAt: Date;
  };
}

const QuestionCard = ({ question, clerkId }: QuestionCardType) => {
  const { _id, title, tags, author, upvotes, views, answers, createdAt } =
    question;
  const isAuthor = author.clerkId === clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-6 sm:p-9 sm:px-6">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-dark400_light700 subtle-regular line-clamp-2 flex sm:hidden">
            {timeAgo(createdAt)}
          </span>
          <Link href={`${paths.question}/${_id}`}>
            <h3 className="text-dark200_light900 sm:h3-semibold base-semibold line-clamp-2 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {isAuthor && (
            <EditDeleteActions itemId={JSON.stringify(_id)} type="question" />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author?.picture}
          alt="user"
          value={author?.name}
          title={` - asked ${timeAgo(createdAt)}`}
          href={`${paths?.profile}/${author?.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatNumber(upvotes.length)}
            title={upvotes.length === 1 ? "Vote" : "Votes"}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="answers"
            value={formatNumber(answers.length)}
            title={answers.length === 1 ? "Answer" : "Answers"}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={formatNumber(views)}
            title={views === 1 ? "View" : "Views"}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
