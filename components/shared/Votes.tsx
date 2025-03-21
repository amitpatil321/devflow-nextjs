"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber, requestLogin } from "@/lib/utils";
import { toast } from "sonner";

interface VotesProps {
  type: "Question" | "Answer";
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
  const router = useRouter();

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) return requestLogin();

    if (type !== "Question" && type !== "Answer") return;

    const params = {
      itemId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      hasUpvoted,
      hasDownvoted,
      path: pathname,
    };

    try {
      if (action === "upvote") {
        if (type === "Question") await upvoteQuestion(params);
        if (type === "Answer") await upvoteAnswer(params);
      }
      if (action === "downvote") {
        if (type === "Question") await downvoteQuestion(params);
        if (type === "Answer") await downvoteAnswer(params);
      }
    } catch (error) {
      toast.error(
        `Error ${action === "upvote" ? "upvoting" : "downvoting"} ${type}`,
      );
      throw error;
    }

    let message = "";
    if (action === "upvote") {
      message = hasUpvoted
        ? `${type} upvote removed`
        : `${type} upvoted successfully`;
    } else if (action === "downvote") {
      message = hasDownvoted
        ? `${type} downvote removed`
        : `${type} downvoted successfully`;
    }

    toast.success(message);
  };

  const handleSave = async () => {
    if (!userId) return requestLogin();

    await toggleSaveQuestion({
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
            <p className="text-dark400_light900 subtle-medium">
              {formatNumber(upvotes)}
            </p>
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
            <p className="text-dark400_light900 subtle-medium">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
        {type === "Question" && (
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
