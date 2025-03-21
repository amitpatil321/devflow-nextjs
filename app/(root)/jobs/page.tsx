import JobCard from "@/components/cards/JobCard";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import paths from "@/constants/paths";
import { getCountries, searchJobs } from "@/lib/actions/job.action";
import { JobSearchProps } from "@/lib/actions/shared.types";

const page = async ({ searchParams }: { searchParams: JobSearchProps }) => {
  const { q, filter, page } = searchParams;

  const countries = await getCountries();
  const { success, response, message } = await searchJobs({ q, filter, page });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-dark100_light900 h1-bold">Jobs</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={paths.jobs}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for jobs by job title, company or keywords"
          otherClasses="flex-1"
        />
        <Filters
          filters={countries}
          placeholder="Select country"
          otherClasses="max-md:flex"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {success && response.data.length > 0 ? (
          response.data.map((job: any) => (
            <JobCard key={job.job_id} job={job} />
          ))
        ) : (
          <NoResult
            title={message || "No jobs to show"}
            description="Job listings are temporarily unavailable. In the meantime, check out some questions and answers—new opportunities might be just around the corner!"
            link={paths.home}
            linkTitle="Browse Questions"
          />
        )}
      </section>
    </>
  );
};

export default page;
