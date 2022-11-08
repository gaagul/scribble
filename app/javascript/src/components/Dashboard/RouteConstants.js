import Analytics from "./Analytics";
import Articles from "./Articles";
import CreateArticle from "./Articles/Options/Create";
import EditArticle from "./Articles/Options/Edit";
import Settings from "./Settings";

export const DASHBOARD_PATH = "/";
export const ARTICLES_PATH = "/articles";
export const CREATE_ARTICLE_PATH = "/article/create";
export const EDIT_ARTICLE_PATH = "/article/:id/edit";
export const SETTINGS_PATH = "/settings";
export const ANALYTICS_PATH = "/analytics";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  {
    path: CREATE_ARTICLE_PATH,
    component: CreateArticle,
  },
  {
    path: EDIT_ARTICLE_PATH,
    component: EditArticle,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: ANALYTICS_PATH,
    component: Analytics,
  },
];
