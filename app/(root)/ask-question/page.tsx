import Question from "@/components/forms/Question";
import paths from "@/constants/paths";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  // const { userId } = auth();
  const userId = "123456789";

  if (!userId) redirect(paths.signIn);

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="text-dark100_light900 h1-bold">Ask a question</h1>
      <div className="mt-9">
        <Question userId={mongoUser._id?.toString()} />
      </div>
    </div>
  );
};

export default page;
