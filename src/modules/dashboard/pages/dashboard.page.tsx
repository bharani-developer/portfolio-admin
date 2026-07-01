import {
  AlertCircle,
  BarChart3,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { StatsCard } from "../components/stats-card.tsx";

import { DashboardSkeleton } from "../components/dashboard-skeleton";

import { RecentProjectsCard } from "../components/recent-projects-card";

import { RecentBlogsCard } from "../components/recent-blogs-card";

import { RecentContactsCard } from "../components/recent-contacts-card";

import { useDashboard } from "../hooks";

import { useProfile } from "@/modules/auth/index.ts";

/* -------------------------------------------------------------------------- */
/*                             Empty Dashboard                                */
/* -------------------------------------------------------------------------- */

function EmptyDashboard(): React.JSX.Element {
  return (
    <Card>
      <CardContent
        className="
          flex
          min-h-80
          flex-col
          items-center
          justify-center
          gap-4
          text-center
        "
      >
        <BarChart3
          className="
            text-muted-foreground
            size-12
          "
        />

        <div className="space-y-2">
          <h3
            className="
              text-lg
              font-semibold
            "
          >
            No dashboard data available
          </h3>

          <p
            className="
              text-muted-foreground
              max-w-md
              text-sm
            "
          >
            Start adding projects, blogs, services, and portfolio content to see
            dashboard analytics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Dashboard Page                                */
/* -------------------------------------------------------------------------- */

export function DashboardPage(): React.JSX.Element {
  const {
    data: dashboard,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useDashboard();
  const { data: profile } = useProfile();

  const isAdmin = profile?.role === "admin";
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  console.log("PROFILE", profile);
  console.log("IS ADMIN", isAdmin);
  console.log("DASHBOARD", dashboard);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
            "
          >
            Dashboard
          </h1>

          <p
            className="
              text-muted-foreground
              text-sm
            "
          >
            Portfolio analytics and overview.
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="size-4" aria-hidden="true" />

          <AlertTitle>Failed to load dashboard</AlertTitle>

          <AlertDescription
            className="
              flex
              flex-col
              gap-4
            "
          >
            <span>
              {error.message ||
                "Something went wrong while loading dashboard data."}
            </span>

            <div>
              <Button
                onClick={() => {
                  void refetch();
                }}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!dashboard) {
    return <EmptyDashboard />;
  }

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section
        className="
          flex
          flex-col
          gap-2
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              Dashboard
            </h1>

            <p
              className="
                text-muted-foreground
                text-sm
              "
            >
              Monitor portfolio performance, content activity, and contact
              engagement.
            </p>
          </div>

          {isFetching ? (
            <span
              className="
                text-muted-foreground
                text-xs
              "
            >
              Refreshing...
            </span>
          ) : null}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Main Stats                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Projects"
            value={dashboard.projects.total}
            description={`${dashboard.projects.featured} featured`}
            icon={Briefcase}
            href="/projects"
          />

          <StatsCard
            title="Blogs"
            value={dashboard.blogs.total}
            description={`${dashboard.blogs.published} published`}
            icon={FileText}
            href="/blogs"
          />
          {isAdmin && (
            <StatsCard
              title="Contacts"
              value={dashboard.contacts?.total ?? 0}
              description={`${dashboard.contacts?.unread ?? 0} unread`}
              icon={Mail}
              href="/contacts"
            />
          )}

          <StatsCard
            title="Portfolio Items"
            value={
              dashboard.overview.projects +
              dashboard.overview.blogs +
              dashboard.overview.services
            }
            description="Combined content"
            icon={BarChart3}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Overview Section                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatsCard title="Services" value={dashboard.overview.services} />

              <StatsCard title="Skills" value={dashboard.overview.skills} />

              <StatsCard
                title="Experience"
                value={dashboard.overview.experiences}
              />

              <StatsCard
                title="Education"
                value={dashboard.overview.educations}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Recent Activity                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section className="space-y-4">
        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Recent Activity
          </h2>

          <p
            className="
              text-muted-foreground
              text-sm
            "
          >
            Latest updates across projects, blogs, and contacts.
          </p>
        </div>

        <div
          className={`grid gap-6 ${
            isAdmin ? "xl:grid-cols-3" : "xl:grid-cols-3"
          }`}
        >
          <RecentProjectsCard projects={dashboard.recent.projects} />

          <RecentBlogsCard blogs={dashboard.recent.blogs} />

          {isAdmin ? (
            <RecentContactsCard contacts={dashboard.recent.contacts ?? []} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contact Activity</CardTitle>
              </CardHeader>

              <CardContent>
                <p
                  className="
            text-muted-foreground
            text-sm
          "
                >
                  Contact submissions and customer messages are only available
                  to administrator accounts.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
