import paths from "@/constants/paths";
import { getUserAnswers } from "@/lib/actions/user.actions";
import AnswerCard from "../cards/AnswerCard";
import NoResults from "./NoResults";
import Pagination from "./Pagination";

interface UserAnswersProps {
  userId: string;
  clerkId: string | null;
  searchParams: { [key: string]: string | null };
}

const AnswersTab = async ({
  userId,
  clerkId,
  searchParams,
}: UserAnswersProps) => {
  const { userAnswers, total } = await getUserAnswers({
    userId,
    page: searchParams.page,
  });

  return (
    <>
      <section className="flex flex-col gap-6 mt-6 w-full">
        {userAnswers.length > 0 ? (
          userAnswers.map((answer) => (
            <AnswerCard key={answer._id} clerkId={clerkId} answer={answer} />
          ))
        ) : (
          <NoResults
            title="There's no answers to show"
            description="Be the first to break the silence! 🚀 Answer a question and kickstart the
        discussion. Get involved! 💡"
            link={paths.home}
            linkText="Answer a question"
          />
        )}
      </section>
      <div className="mt-6">
        <Pagination total={total} />
      </div>
    </>
  );
};

export default AnswersTab;
