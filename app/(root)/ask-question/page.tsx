import Question from "@/components/forms/Question";
import paths from "@/constants/paths";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect(paths.signIn);
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="text-dark100_light900 h1-bold">Ask a Question</h1>
      <div className="mt-9">
        <Question type="create" userId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default page;
