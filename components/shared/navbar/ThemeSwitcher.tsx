"use client";

import React, { useContext } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Menubar className="bg-white border-none bg-transparent shadow-none">
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
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 border-none bg-light-900 dark:bg-dark-100 border-dark-400">
          {themes?.map((each) => (
            <MenubarItem
              key={each.value}
              className="cursor-pointer flex px-2.5 py-2 dark:focus:bg-dark-400"
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
                className={`font-bold text-[14px] ${
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
