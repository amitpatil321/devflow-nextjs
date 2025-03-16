import Question from "@/components/forms/Question";
import paths from "@/constants/paths";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Edit question | Dev Overflow",
};

const page = async ({ params }: Props) => {
  const { userId } = await auth();
  const { id: questionId } = params;

  if (!userId) {
    redirect(paths.signIn);
  }
  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="edit"
          userId={JSON.stringify(mongoUser?._id)}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
};

export default page;
