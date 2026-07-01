// src/guards/guest-guard.tsx

import { Navigate, Outlet } from "react-router-dom";

import { FullScreenLoader } from "@/components/common/full-screen-loader";

import { useProfile } from "@/modules/auth/hooks/use-profile";

import { ROUTES } from "@/routes/route.constant";

import { authStorage } from "@/shared/lib/auth-storage";

export function GuestGuard(): React.JSX.Element {
  const hasToken = authStorage.isAuthenticated();

  const { data: user, isPending } = useProfile();

  /**
   * Only show loader when a token exists
   * and we're validating the session.
   */
  if (hasToken && isPending) {
    return <FullScreenLoader />;
  }

  /**
   * Authenticated users should not
   * access guest pages.
   */
  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  /**
   * Allow unauthenticated users
   * to access login page.
   */
  return <Outlet />;
}
