import UserCard from "@/components/cards/UserCard";
import Filters from "@/components/shared/Filters";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import paths from "@/constants/paths";
import { getAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";
import { UserFilters } from "../../../constants/filters";

const page = async () => {
  const allUsers = await getAllUsers();

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-8 flex flex-wrap gap-4">
        {allUsers?.length > 0 ? (
          allUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoUsers />
        )}
      </section>
    </>
  );
};

const NoUsers = () => {
  return (
    <div className="paragraph-regular text_dark200_light800 mx-auto w-full text-center">
      <p>No users to show</p>
      <Link href={`${paths.signUp}`}>
        <Button className="primary-gradient mt-4 min-h-[46px] px-4 py-3 !text-light-900">
          Join to be the first!
        </Button>
      </Link>
    </div>
  );
};

export default page;
