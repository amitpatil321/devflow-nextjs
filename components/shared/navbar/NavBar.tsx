import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

import paths from "@/constants/paths";
import Link from "next/link";
import GlobalSearch from "../search/GlobalSearch";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
  return (
    <nav className="z-50 fixed flex justify-between items-center gap-5 bg-white dark:bg-dark-500 shadow-lg shadow-light-300 p-6 w-full">
      <Link
        href={`${paths.home}`}
        className="flex justify-center items-center gap-1"
        passHref
      >
        <Image
          src="/assets/images/site-logo.svg"
          width={30}
          height={30}
          alt="logo"
        />
        <span className="max-sm:hidden font-bold text-gray-800 dark:text-white text-2xl">
          Dev<span className="text-primary-500">Overflow</span>
        </span>
      </Link>
      <GlobalSearch />
      <div className="flex flex-row gap-5">
        <ThemeSwitcher />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;
