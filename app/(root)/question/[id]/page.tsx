import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, timeAgo } from "@/lib/utils";
import { TagProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const questionResponse = await getQuestionById({ questionId: params.id });
  const { _id, title, content, author, tags, answers, createdAt } =
    questionResponse;
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {author.name}
            </p>
          </Link>
          <div className="flex justify-end">Up Down Votes</div>
        </div>
        <h2 className="text-dark200_light900 h2-semibold mt-3.5 w-full text-left">
          {title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap items-center gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="asked on"
          value={` asked ${timeAgo(createdAt)}`}
          title=""
          href={`/question/${_id}/answers`}
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatNumber(answers.length)}
          title="Answers"
          textStyles="text-dark200_light900 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={0}
          title="Views"
          textStyles="text-dark200_light900 small-medium"
        />
      </div>

      <ParseHTML data={content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {tags?.map((tag: TagProps) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
    </>
  );
};

export default page;
