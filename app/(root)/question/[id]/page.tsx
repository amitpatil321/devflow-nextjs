import Image from "next/image";
import Link from "next/link";

import Answer from "@/components/forms/Answer";
import ListAnswers from "@/components/shared/ListAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, timeAgo } from "@/lib/utils";
import { TagProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongoose";

interface Props {
  params: {
    id: string;
  };
}

interface QuestionType {
  _id: ObjectId;
  title: string;
  content: string;
  author: any;
  tags: TagProps[];
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  answers: ObjectId[];
  views: number;
  createdAt: Date;
}

interface Params {
  params: { id: string };
  searchParams?: Record<string, string>;
}

export async function generateMetadata({ params }: Params) {
  const question = (await getQuestionById({
    questionId: params.id,
  })) as unknown as QuestionType;
  return {
    title: `${question.title} | Dev Overflow`,
  };
}

const page = async ({ params }: Props) => {
  const { userId } = await auth();

  // if (!userId) redirect(paths.signIn);
  let loggedUser: any;
  if (userId) loggedUser = await getUserById({ userId });

  const question = (await getQuestionById({
    questionId: params.id,
  })) as unknown as QuestionType;

  const {
    _id,
    title,
    content,
    author,
    tags,
    upvotes,
    downvotes,
    answers,
    views,
    createdAt,
  } = question;

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
          <div className="small-regular flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(_id)}
              userId={JSON.stringify(loggedUser?._id)}
              upvotes={upvotes.length}
              hasUpvoted={upvotes.some(
                (id: ObjectId) => id.toString() === loggedUser?._id.toString(),
              )}
              downvotes={downvotes.length}
              hasDownvoted={downvotes.some(
                (id: ObjectId) => id.toString() === loggedUser?._id.toString(),
              )}
              hasSaved={loggedUser?.saved?.some(
                (id: string) => id.toString() === _id.toString(),
              )}
            />
          </div>
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
          value={formatNumber(views)}
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

      <ListAnswers questionId={_id.toString()} loggedUser={loggedUser} />

      <div className="mt-8">
        <Answer
          question={content}
          questionId={JSON.stringify(_id)}
          authorId={JSON.stringify(loggedUser?._id)}
        />
      </div>
    </>
  );
};

export default page;
