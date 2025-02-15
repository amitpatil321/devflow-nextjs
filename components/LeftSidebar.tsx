"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="light-border scrollbar dark: sticky left-0 flex h-screen flex-col overflow-y-auto p-6 pt-32 dark:bg-dark-500 max-sm:hidden sm:w-[100px] lg:w-[250px]">
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
    </section>
  );
};

export default LeftSidebar;
