import Image from "next/image";
import Link from "next/link";

interface Job {
  job_id: string;
  employer_name: string;
  employer_logo: string;
  employer_website: string;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_posted_human_readable: string;
  job_location: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_employment_type: string;
  job_salary: string;
}

interface JobProps {
  job: Job;
}

const JobCard = ({ job }: JobProps) => {
  const {
    job_id,
    employer_name,
    employer_logo,
    employer_website,
    job_title,
    job_apply_link,
    job_description,
    job_posted_human_readable,
    job_city,
    job_state,
    job_country,
    job_employment_type,
    job_salary,
  } = job;

  return (
    <section
      key={job_id}
      className="shadow-light100_dark light-border background-light900_dark200 flex flex-col items-start gap-4 rounded-lg border p-6 sm:flex-row sm:p-8"
    >
      <div className="flex w-full justify-end sm:hidden">
        <JobLocationCard
          jobCountry={job_country}
          jobCity={job_city}
          jobState={job_state}
          postedOn={job_posted_human_readable}
        />
      </div>
      {employer_website ? (
        <Link
          href={employer_website}
          className="background-light800_dark400 relative h-16 w-16 rounded-xl"
          target="_blank"
        >
          <Image
            alt="company logo"
            src={employer_logo || "/assets/images/site-logo.svg"}
            fill
            className="h-full w-full object-contain p-2"
          />
        </Link>
      ) : (
        <div className="background-light800_dark400 relative h-16 w-16 rounded-xl">
          <Image
            alt="company logo"
            src={employer_logo || "/assets/images/site-logo.svg"}
            className="h-full w-full object-contain p-2"
            fill
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-dark200_light900 sm:h3-semibold base-semibold line-clamp-2 flex-1">
            {job_title}
          </h3>
          <div className="hidden sm:flex">
            <JobLocationCard
              jobCountry={job_country}
              jobCity={job_city}
              jobState={job_state}
              postedOn={job_posted_human_readable}
            />
          </div>
        </div>
        {employer_name &&
          (employer_website ? (
            <Link
              href={employer_website}
              target="_blank"
              className="primary-text-gradient flex"
            >
              {employer_name}
              <Image
                src="/assets/icons/arrow-up-right.svg"
                alt="arrow up right"
                className="ml-2"
                width={15}
                height={15}
              />
            </Link>
          ) : (
            <div>{employer_name}</div>
          ))}
        <div className="text-dark500_light700 body-">
          {job_description
            ? job_description.length > 200
              ? `${job_description.substring(0, 200)}...`
              : job_description
            : ""}
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex flex-wrap items-center gap-6 sm:flex-col">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/clock-2.svg"
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-regular text-light-500">
                {job_employment_type}
              </p>
            </div>

            <div className="flex gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="dollar symbol"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">
                {job_salary || "Not disclosed"}
              </p>
            </div>
          </div>
          <Link
            href={job_apply_link ?? "/jobs"}
            target="_blank"
            className="flex items-center gap-2"
          >
            <p className="primary-text-gradient body-semibold">View job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="arrow up right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

interface JobLocationProps {
  jobCountry?: string;
  jobCity?: string;
  jobState?: string;
  postedOn?: string;
}

const JobLocationCard = ({
  jobCountry,
  jobCity,
  jobState,
  postedOn,
}: JobLocationProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="body-regular text-gray-400">{postedOn}</div>
      <div className="background-light800_dark400 flex gap-1.5 rounded-lg px-2 py-1">
        <Image
          src={`https://flagsapi.com/${jobCountry}/flat/64.png`}
          alt="country symbol"
          width={16}
          height={16}
          className="rounded-full"
        />

        <p className="text-dark400_light700 body-medium">
          {jobCity && `${jobCity}, `}
          {jobState && `${jobState}, `}
          {jobCountry && `${jobCountry}`}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
