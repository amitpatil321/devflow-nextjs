"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggeSaveQuestion } from "@/lib/actions/user.actions";
import { formatNumber } from "@/lib/utils";

interface VotesProps {
  type: "question" | "answer";
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: VotesProps) => {
  const pathname = usePathname();

  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) return;

    if (type !== "question" && type !== "answer") return;

    const params = {
      itemId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      hasUpvoted,
      hasDownvoted,
      path: pathname,
    };

    try {
      if (action === "upvote") {
        if (type === "question") await upvoteQuestion(params);
        if (type === "answer") await upvoteAnswer(params);
      }
      if (action === "downvote") {
        if (type === "question") await downvoteQuestion(params);
        if (type === "answer") await downvoteAnswer(params);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }

    // Todo: show toast message
    return;
  };

  const handleSave = async () => {
    await toggeSaveQuestion({
      userId: JSON.parse(userId),
      itemId: JSON.parse(itemId),
      path: pathname,
    });
  };

  return (
    <div className="flex gap-5">
      <div className="flex-end flex gap-4">
        <div className="flex items-center gap-1">
          <Image
            src={`/assets/icons/${hasUpvoted ? "upvoted.svg" : "upvote.svg"}`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p>{formatNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={`/assets/icons/${hasDownvoted ? "downvoted.svg" : "downvote.svg"}`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p>{formatNumber(downvotes)}</p>
          </div>
        </div>
        {type === "question" && (
          <div className="flex items-center gap-1">
            <Image
              src={`/assets/icons/${hasSaved ? "star-filled.svg" : "star-red.svg"}`}
              alt="save"
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => handleSave()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Votes;
