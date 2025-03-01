import paths from "@/constants/paths";
import { formatNumber, timeAgo } from "@/lib/utils";
import Link from "next/link";
import Metric from "../shared/Metric";

interface AnswerCardProps {
  answer: {
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

const AnswerCard = ({ answer }: AnswerCardProps) => {
  console.log(answer);
  const { _id, question, author, upvotes, views, answers, createdOn } = answer;
  return (
    <div className="p-9 sm:px-11 rounded-[10px] card-wrapper">
      <div className="flex sm:flex-row flex-col-reverse justify-between items-start gap-5">
        <div>
          <span className="sm:hidden flex text-dark400_light700 line-clamp-1 subtle-regular">
            {timeAgo(createdOn)}
          </span>
          <Link href={`${paths.question}/${_id}`}>
            <h3 className="flex-1 text-dark200_light900 line-clamp-1 sm:h3-semibold base-semibold">
              {question.title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="flex-wrap flex-between gap-3 mt-6 w-full">
        <Metric
          imgUrl={author?.picture}
          alt="user"
          value={author?.name}
          title={` - answered ${timeAgo(createdOn)}`}
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
      </div>
    </div>
  );
};

export default AnswerCard;
