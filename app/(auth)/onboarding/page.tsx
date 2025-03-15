import { Profile } from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  if (mongoUser?.onboarded) redirect("/");

  return (
    <>
      <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="text-dark100_light900 h1-bold">Onboarding</h1>
        <p className="text-dark100_light900 base-medium mt-3">
          Complete your profile now to use DevOverflow
        </p>

        <div className="background-light850_dark100 mt-9 p-10">
          <Profile userInfo={JSON.stringify(mongoUser)} />
        </div>
      </main>
    </>
  );
};

export default Page;
