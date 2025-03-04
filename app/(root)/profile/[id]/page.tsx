import AnswersTab from "@/components/shared/AnswersTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.actions";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse justify-between items-start">
        <div className="flex lg:flex-row flex-col items-start gap-4 align-top">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="p-0.5 border-2 border-slate-200 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <h2 className="text-dark100_light900 h2-bold">
              {userInfo.user.name}
            </h2>
            <p className="mt-1 paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>

            <div className="flex flex-wrap justify-start items-center gap-5 mt-4">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}

              {/* <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              /> */}
            </div>

            {userInfo.user.bio && (
              <p className="mt-4 paragraph-regular text-dark400_light800">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="px-4 py-3 min-w-[175px] paragraph-medium min-h-[46px] text-dark300_light900 btn-secondary">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        // reputation={userInfo.reputation}
        totalQuestions={userInfo.questionCount}
        totalAnswers={userInfo.answerCount}
        // badges={userInfo.badgeCounts}
      />

      <div className="flex gap-10 mt-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="p-1 min-h-[42px] background-light800_dark400">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="flex flex-col gap-6 mt-5 w-full"
          >
            <QuestionTab
              // searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex flex-col gap-6 w-full">
            <AnswersTab
              // searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
