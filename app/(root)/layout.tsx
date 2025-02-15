"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";

import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import NavBar from "@/components/shared/navbar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error));
    }
  }, [error]);

  return (
    <main className="background-light850_dark100 relative">
      <NavBar />
      <div className="flex">
        <LeftSidebar />
        <section className="dark: flex min-h-screen flex-1 flex-col px-4 py-12 pt-36 dark:bg-dark-500 dark:text-white max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
        <Toaster position="top-center" richColors theme="light" />
      </div>
    </main>
  );
};

export default Layout;
