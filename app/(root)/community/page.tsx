import UserCard from "@/components/cards/UserCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import paths from "@/constants/paths";
import { searchParamsProps } from "@/lib/actions/shared.types";
import { getAllUsers } from "@/lib/actions/user.actions";
import { UserFilters } from "../../../constants/filters";

const page = async ({ searchParams }: searchParamsProps) => {
  const allUsers = await getAllUsers({
    searchQuery: searchParams.q ?? null,
  });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">All Users</h1>

      <div className="mt-10 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={paths.community}
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

      <section className="mt-10 flex flex-wrap gap-4">
        {allUsers?.length > 0 ? (
          allUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoResult
            title="No Users Found"
            description="Join to be the first!"
            link={paths.signUp}
            linkTitle="Sign up"
          />
        )}
      </section>
    </>
  );
};

export default page;
