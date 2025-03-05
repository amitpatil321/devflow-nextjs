import paths from "@/constants/paths";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface RenderTagType {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: RenderTagType) => {
  return (
    <Link href={`${paths.tags}/${_id}`} className="flex justify-between gap-2">
      <Badge className="text-light400_light500 subtle-medium background-light800_dark300 max-w-[100px] truncate rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="text-dark500_light700 small-medium">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
