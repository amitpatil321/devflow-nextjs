"use client";
import { sidebarLinks } from "@/constants";
import paths from "@/constants/paths";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="shadow-light-300 custom-scrollbar light-border background-light900_dark200 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 dark:shadow-none max-sm:hidden lg:w-[266px]">
      {sidebarLinks?.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <Link
            href={item.route}
            key={item.label}
            className={`${
              isActive ? "primary-gradient rounded text-white" : "text-dark-300"
            } mb-2 flex items-center justify-start gap-4 rounded-lg bg-transparent p-4 font-bold transition duration-500 hover:bg-gray-100 dark:hover:bg-dark-400`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={`${isActive ? "" : "invert-colors"}`}
            />
            <span className="dark:text-white max-lg:hidden">{item?.label}</span>
          </Link>
        );
      })}

      <div className="h-[300px]" />

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={`${paths.signIn}`}>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href={`${paths.signUp}`}>
            <Button className="light-border-2 text-dark400_light900 small-medium btn-tertiary min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
