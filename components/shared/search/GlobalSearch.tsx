"use client";
import { Input } from "@/components/ui/input";
import { makeUrl } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const popupRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>(
    searchParams.get("global") || "",
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      const url = makeUrl("global", searchText);
      router.push(url, { scroll: false });
    }, 200);
    return () => clearTimeout(debounce);
  }, [searchText, searchParams, router, open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchText("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="max-lg:hidden relative w-full max-w-[600px]" ref={popupRef}>
      <div className="relative flex items-center gap-1 px-4 rounded-xl min-h-[56px] background-light800_darkgradient grow">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          placeholder="Search globally"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            if (!open) setOpen(true);
            if (event.target.value === "" && open) setOpen(false);
          }}
          className="bg-transparent shadow-none border-none outline-none paragraph-regular text-dark400_light700 no-focus placeholder"
        />
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="top-full left-0 absolute bg-white shadow-lg rounded-lg w-full"
            >
              <GlobalResult />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GlobalSearch;
