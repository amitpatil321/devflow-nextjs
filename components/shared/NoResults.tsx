import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface NoResultsType {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const NoResults = ({ title, description, link, linkText }: NoResultsType) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No results illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No results illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="text-dark-200_light900 h2-bold mt-8">{title}</h2>
      <p className="max-w-md: text-dark500_700 body-regular my-3.5 text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium min-h=[46px] dark: mt-5 rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:text-light-900">
          {linkText}
        </Button>
      </Link>
    </div>
  );
};

export default NoResults;
