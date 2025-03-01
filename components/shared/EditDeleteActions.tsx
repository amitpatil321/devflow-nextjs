"use client";

import paths from "@/constants/paths";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: "question" | "answer";
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`${paths.question}/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };

  return (
    <div className="flex justify-end items-center gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="object-contain cursor-pointer"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="object-contain cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
