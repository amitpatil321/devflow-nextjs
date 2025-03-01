import paths from "@/constants/paths";
import { getUserQuestions } from "@/lib/actions/user.actions";
import QuestionCard from "../cards/QuestionCard";
import NoResults from "./NoResults";

interface UserQuestionProps {
  userId: string;
}

const QuestionTab = async ({ userId }: UserQuestionProps) => {
  const userQuestions = await getUserQuestions({ userId });
  return (
    <section className="flex flex-col gap-6 mt-6 w-full">
      {userQuestions.length > 0 ? (
        userQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))
      ) : (
        <NoResults
          title="There's no questions to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          link={paths.askQuestion}
          linkText="Ask a question"
        />
      )}
    </section>
  );
};

export default QuestionTab;
