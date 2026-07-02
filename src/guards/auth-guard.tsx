import type { JSX } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { FullScreenLoader } from "@/components/common/full-screen-loader";

import { useProfile } from "@/modules/auth/hooks/use-profile";

import { ROUTES } from "@/routes/route.constant";

export function AuthGuard(): JSX.Element {
  const location = useLocation();

  const { data: user, isPending, isFetching, isError } = useProfile();

  if (isPending || isFetching) {
    return <FullScreenLoader />;
  }

  if (isError || !user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
