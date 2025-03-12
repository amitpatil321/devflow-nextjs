"use client";

import { sidebarLinks } from "@/constants";
import paths from "@/constants/paths";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className="max-sm:hidden top-0 left-0 sticky flex flex-col justify-between shadow-light-300 dark:shadow-none custom-scrollbar p-6 pt-36 light-border border-r w-fit lg:w-[266px] h-screen overflow-y-auto select-none background-light900_dark200">
      {sidebarLinks?.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === paths.profile && userId) {
          item.route = `${paths.profile}/${userId}`;
        }

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
            <span className="max-lg:hidden dark:text-white">{item?.label}</span>
          </Link>
        );
      })}

      <div className="h-[300px]" />

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={`${paths.signIn}`}>
            <Button className="shadow-none px-4 py-3 rounded-lg w-full min-h-[41px] small-medium btn-secondary">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="lg:hidden invert-colors"
              />
              <span className="max-lg:hidden primary-text-gradient">
                Log In
              </span>
            </Button>
          </Link>

          <Link href={`${paths.signUp}`}>
            <Button className="shadow-none px-4 py-3 border light-border-2 rounded-lg w-full min-h-[41px] text-dark400_light900 small-medium btn-tertiary">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="lg:hidden invert-colors"
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
