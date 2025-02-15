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
    upvotes: number;
    views: number;
    answers: number;
    createdAt: Date;
  };
}

const QuestionCard = ({ question }: QuestionCardType) => {
  const { _id, title, tags, author, upvotes, views, answers, createdAt } =
    question;
  console.log(createdAt);
  return (
    <div className="p-9 sm:px-11 rounded-[10px] card-wrapper">
      <div className="flex sm:flex-row flex-col-reverse justify-between items-start gap-5">
        <div>
          <span className="sm:hidden flex text-dark400_light700 line-clamp-1 subtle-regular">
            {timeAgo(createdAt)}
          </span>
          <Link href={`${paths.question}/${_id}`}>
            <h3 className="flex-1 text-dark200_light900 line-clamp-1 sm:h3-semibold base-semibold">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3.5">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-wrap flex-between gap-3 mt-6 w-full">
        <Metric
          imgUrl={`https://randomuser.me/api/portraits/men/${author._id}.jpg`}
          alt="user"
          value={author.name}
          title={` - asked ${timeAgo(createdAt)}`}
          href={`${paths.profile}/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatNumber(upvotes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatNumber(answers)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatNumber(views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
