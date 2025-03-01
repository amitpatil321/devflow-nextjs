import paths from "@/constants/paths";
import { getUserAnswers } from "@/lib/actions/user.actions";
import AnswerCard from "../cards/AnswerCard";
import NoResults from "./NoResults";

interface UserAnswersProps {
  userId: string;
}

const AnswersTab = async ({ userId }: UserAnswersProps) => {
  const userAnswers = await getUserAnswers({ userId });
  return (
    <section className="flex flex-col gap-6 mt-6 w-full">
      {userAnswers.length > 0 ? (
        userAnswers.map((answer) => (
          <AnswerCard key={answer._id} answer={answer} />
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
  );
};

export default AnswersTab;
