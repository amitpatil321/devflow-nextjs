import { SidebarLink } from "@/types";
import pages from "./paths";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const ItemsPerPage = 4;

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: pages.home,
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: pages.community,
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: pages.collections,
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: pages.jobs,
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: pages.tags,
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: pages.profile,
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: pages.askQuestion,
    label: "Ask a question",
  },
];
