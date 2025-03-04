import { Profile } from "@/components/forms/Profile";
import paths from "@/constants/paths";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect(paths.signIn);
  }
  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">Edit Profile</h1>
      <div className="mt-9">
        <Profile userInfo={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default page;
