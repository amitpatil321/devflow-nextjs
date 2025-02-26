"use client";

import { formatNumber } from "@/lib/utils";
import Image from "next/image";

interface VotesProps {
  type: string;
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
  const handleVote = (action: string) => console.log(action);
  const handleSave = () => console.log("save");

  return (
    <div className="flex gap-5">
      <div className="flex-end flex gap-2.5">
        <div className="flex-center gap-1.5">
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
        <button className="flex items-center gap-1">
          <Image
            src={`/assets/icons/${hasDownvoted ? "downvoted.svg" : "downvote.svg"}`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p>{formatNumber(downvotes)}</p>
          </div>
        </button>
        <button className="flex items-center gap-1">
          <Image
            src={`/assets/icons/${hasSaved ? "star-filled.svg" : "star-red.svg"}`}
            alt="save"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleSave()}
          />
        </button>
      </div>
    </div>
  );
};

export default Votes;
