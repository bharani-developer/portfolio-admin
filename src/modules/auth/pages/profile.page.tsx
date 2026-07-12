import type { ReactElement } from "react";

import { Calendar, Mail, Shield, User } from "lucide-react";

import { useProfile } from "../hooks/use-profile";

import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/common/page-title";
import { PageLoader } from "@/components/common/page-loader";
import { ErrorState } from "@/components/common/error-state";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ProfilePage(): ReactElement {
  const { data: user, isPending, isError, refetch } = useProfile();

  if (isPending) {
    return <PageLoader />;
  }

  if (isError || !user) {
    return (
      <ErrorState
        title="Unable to load profile"
        description="An error occurred while loading your account information."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <PageContainer>
      <PageTitle
        title="Profile"
        description="Manage your account information."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Summary */}
        <Card>
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <div className="bg-primary text-primary-foreground flex size-20 items-center justify-center rounded-full">
              <User className="size-10" />
            </div>

            <div className="space-y-1 text-center">
              <h2 className="text-xl font-semibold">{user.name}</h2>

              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>

            <Badge variant="secondary">{user.role}</Badge>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ProfileItem
                icon={<User className="size-4" />}
                label="Name"
                value={user.name}
              />

              <ProfileItem
                icon={<Mail className="size-4" />}
                label="Email"
                value={user.email}
              />

              <ProfileItem
                icon={<Shield className="size-4" />}
                label="Role"
                value={user.role}
              />

              <ProfileItem
                icon={<Shield className="size-4" />}
                label="Status"
                value="Active"
              />
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
              <ProfileItem
                icon={<Calendar className="size-4" />}
                label="Created At"
                value={new Date(user.createdAt).toLocaleString()}
              />

              <ProfileItem
                icon={<Calendar className="size-4" />}
                label="Updated At"
                value={new Date(user.updatedAt).toLocaleString()}
              />
            </div>

            <Separator />

            <ProfileItem label="User ID" value={user._id} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

interface ProfileItemProps {
  label: string;
  value: string;
  icon?: ReactElement;
}

function ProfileItem({ label, value, icon }: ProfileItemProps): ReactElement {
  return (
    <div className="space-y-1">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        {icon}

        <span>{label}</span>
      </div>

      <p className="font-medium break-all">{value}</p>
    </div>
  );
}
