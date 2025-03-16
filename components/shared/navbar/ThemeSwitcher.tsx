"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Menubar className="border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {theme === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme cursor-pointer"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme cursor-pointer"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border border-none border-dark-400 bg-light-900 py-2 dark:bg-dark-100">
          {themes?.map((each) => (
            <MenubarItem
              key={each.value}
              className="flex cursor-pointer px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setTheme(each.value);
              }}
            >
              <Image
                src={each?.icon}
                alt={each?.label}
                width={16}
                height={16}
                className={`mr-3 ${theme === each.value && "active-theme"}`}
              />
              <p
                className={`text-[14px] font-bold ${
                  theme === each.value
                    ? "text-primary-500"
                    : "text-dark-100 dark:text-light-900"
                }`}
              >
                {each.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeSwitcher;
