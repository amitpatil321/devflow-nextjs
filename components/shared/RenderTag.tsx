import paths from "@/constants/paths";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface RenderTagType {
  _id: string;
  name: string;
}

const RenderTag = ({ _id, name }: RenderTagType) => {
  return (
    <Link href={`${paths.tags}/${_id}`} className="flex justify-between gap-2">
      <Badge className="text-light400_light500 subtle-medium background-light800_dark300 max-w-[100px] truncate rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
    </Link>
  );
};

export default RenderTag;
