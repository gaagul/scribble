import { Settings, Repeat, Category } from "neetoicons";

import Categories from "./Categories";
import General from "./General";
import Redirections from "./Redirections";

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: "General",
    description: "General Settings",
    path: "/settings?tab=General",
    component: General,
    icon: Settings,
  },
  {
    key: "redirections",
    label: "Redirections",
    description: "Manage Rediretions",
    path: "/settings?tab=Redirections",
    component: Redirections,
    icon: Repeat,
  },
  {
    key: "categories",
    label: "Manage Categories",
    description: "Manage Categories",
    path: "/settings?tab=Categories",
    component: Categories,
    icon: Category,
  },
];
