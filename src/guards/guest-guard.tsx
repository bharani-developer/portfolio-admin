import type { JSX } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { FullScreenLoader } from "@/components/common/full-screen-loader";

import { useProfile } from "@/modules/auth/hooks/use-profile";

import { ROUTES } from "@/routes/route.constant";

import { authStorage } from "@/shared/lib/auth-storage";

export function GuestGuard(): JSX.Element {
  const hasToken = authStorage.isAuthenticated();

  const {
    data: user,
    isPending,
    isFetching,
  } = useProfile();

  /*
   * Only display a loader while validating
   * an existing authenticated session.
   */
  if (hasToken && (isPending || isFetching)) {
    return <FullScreenLoader />;
  }

  /*
   * Authenticated users should never
   * access guest-only pages.
   */
  if (user) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  /*
   * No authenticated session.
   */
  return <Outlet />;
}