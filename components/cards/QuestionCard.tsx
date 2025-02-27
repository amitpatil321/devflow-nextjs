import paths from "@/constants/paths";
import { formatNumber, timeAgo } from "@/lib/utils";
import Link from "next/link";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface QuestionCardType {
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
    };
    upvotes: string[];
    views: number;
    answers: string[];
    createdAt: Date;
  };
}

const QuestionCard = ({ question }: QuestionCardType) => {
  const { _id, title, tags, author, upvotes, views, answers, createdAt } =
    question;
  console.log(createdAt);
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-dark400_light700 subtle-regular line-clamp-1 flex sm:hidden">
            {timeAgo(createdAt)}
          </span>
          <Link href={`${paths.question}/${_id}`}>
            <h3 className="text-dark200_light900 sm:h3-semibold base-semibold line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
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
          href={`${paths?.profile}/${author?._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
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
  );
};

export default QuestionCard;
