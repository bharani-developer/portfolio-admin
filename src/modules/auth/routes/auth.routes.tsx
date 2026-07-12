import type { RouteObject } from "react-router-dom";

import { LoginPage } from "../pages/login.page";
import { ProfilePage } from "../pages/profile.page";

import { ROUTES } from "@/constants/route.constants";

export const authPublicRoutes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
];

export const authProtectedRoutes: RouteObject[] = [
  {
    path: ROUTES.PROFILE,
    element: <ProfilePage />,
  },
];
