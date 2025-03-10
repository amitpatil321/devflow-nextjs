import Image from "next/image";
import Link from "next/link";

import Answer from "@/components/forms/Answer";
import ListAnswers from "@/components/shared/ListAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { formatNumber, timeAgo } from "@/lib/utils";
import { TagProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const { userId } = await auth();

  // if (!userId) redirect(paths.signIn);
  let loggedUser;
  if (userId) loggedUser = await getUserById({ userId });

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
  } = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-col flex-start w-full">
        <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-5 sm:gap-2 w-full">
          <Link
            href={`/profile/${author.clerkId}`}
            className="flex justify-start items-center gap-1"
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
          <div className="flex justify-end small-regular">
            <Votes
              type="question"
              itemId={JSON.stringify(_id)}
              userId={JSON.stringify(loggedUser?._id)}
              upvotes={upvotes.length}
              hasUpvoted={upvotes.includes(loggedUser?._id)}
              downvotes={downvotes.length}
              hasDownvoted={downvotes.includes(loggedUser?._id)}
              hasSaved={loggedUser?.saved?.includes(_id)}
            />
          </div>
        </div>
        <h2 className="mt-3.5 w-full text-dark200_light900 text-left h2-semibold">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-5 mb-8">
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

      <div className="flex flex-wrap gap-2 mt-8">
        {tags?.map((tag: TagProps) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <ListAnswers questionId={_id} loggedUser={loggedUser?._id} />

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
