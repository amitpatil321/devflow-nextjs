import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth — DevOverflow",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-auth-light dark:bg-auth-dark flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat">
      {children}
    </main>
  );
}
