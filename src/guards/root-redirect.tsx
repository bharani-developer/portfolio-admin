import type { JSX } from "react";

import { Navigate } from "react-router-dom";

import { ROUTES } from "@/routes/route.constant";

import { authStorage } from "@/shared/lib/auth-storage";

export function RootRedirect(): JSX.Element {
  const isAuthenticated = authStorage.isAuthenticated();

  return (
    <Navigate
      to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
      replace
    />
  );
}