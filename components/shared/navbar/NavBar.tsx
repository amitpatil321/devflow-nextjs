import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

import paths from "@/constants/paths";
import Link from "next/link";
import GlobalSearch from "../search/GlobalSearch";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link
        href={`${paths.home}`}
        className="flex items-center justify-center gap-1 font-spaceGrotesk"
        passHref
      >
        <Image
          src="/assets/images/site-logo.svg"
          width={30}
          height={30}
          alt="logo"
        />
        <span className="text-2xl font-bold text-gray-800 dark:text-white max-sm:hidden">
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
