import { Navigate, Outlet } from "react-router-dom";

import { FullScreenLoader } from "@/components/common/full-screen-loader";

import { useProfile } from "@/modules/auth/hooks/use-profile";

import { ROUTES } from "@/routes/route.constant";

export function AuthGuard(): React.JSX.Element {
  const { data: user, isPending } = useProfile();

  if (isPending) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
