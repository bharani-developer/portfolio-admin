import { lazy } from "react";

import type { RouteObject } from "react-router-dom";

const AboutPage = lazy(() =>
  import("../pages/about.page").then((module) => ({
    default: module.AboutPage,
  })),
);

export const ABOUT_ROUTE: RouteObject = {
  path: "about",

  element: <AboutPage />,
};
