import { clsx, type ClassValue } from "clsx";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (date: Date): string => {
  const now: Date = new Date();
  const past: Date = new Date(date);

  // Convert both to timestamps directly
  const seconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const formatNumber = (num: number): string | number => {
  if (!num) {
    return 0;
  }

  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  } else {
    return num.toString();
  }
};

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export const makeUrl = (key: string, value: string | null) => {
  const url = queryString.parse(location.search);
  // if value doenst exists then remove it
  if (value) url[key] = value;
  else delete url[key];
  return queryString.stringify(url, { skipNull: true });
};
