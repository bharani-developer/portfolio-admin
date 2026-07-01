// src\modules\dashboard\components\dashboard-overview.tsx

import {
  BadgeCheck,
  Briefcase,
  FileText,
  GraduationCap,
  Mail,
  MessageSquare,
  Settings,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { StatsCard } from "./stats-card.tsx";

import type { IDashboard } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface IDashboardOverviewProps {
  dashboard: IDashboard;

  isLoading?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           Dashboard Overview                               */
/* -------------------------------------------------------------------------- */

export function DashboardOverview({
  dashboard,
  isLoading = false,
}: IDashboardOverviewProps): React.JSX.Element {
  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Stats Grid                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Portfolio Overview</h2>

          <p className="text-muted-foreground text-sm">
            High level statistics across your portfolio.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Projects"
            value={dashboard.overview.projects}
            description="Total projects"
            icon={Briefcase}
            href="/projects"
            isLoading={isLoading}
          />

          <StatsCard
            title="Blogs"
            value={dashboard.overview.blogs}
            description="Published articles"
            icon={FileText}
            href="/blogs"
            isLoading={isLoading}
          />

          <StatsCard
            title="Services"
            value={dashboard.overview.services}
            description="Available services"
            icon={Wrench}
            href="/services"
            isLoading={isLoading}
          />

          <StatsCard
            title="Contacts"
            value={dashboard.overview.contacts}
            description="Received messages"
            icon={Mail}
            href="/contacts"
            isLoading={isLoading}
          />

          <StatsCard
            title="Skills"
            value={dashboard.overview.skills}
            description="Technical skills"
            icon={Star}
            href="/skills"
            isLoading={isLoading}
          />

          <StatsCard
            title="Experience"
            value={dashboard.overview.experiences}
            description="Work experiences"
            icon={BadgeCheck}
            href="/experience"
            isLoading={isLoading}
          />

          <StatsCard
            title="Education"
            value={dashboard.overview.educations}
            description="Education records"
            icon={GraduationCap}
            href="/education"
            isLoading={isLoading}
          />

          <StatsCard
            title="Certificates"
            value={dashboard.overview.certifications}
            description="Professional certifications"
            icon={ShieldCheck}
            href="/certifications"
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Configuration                                                      */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Configuration Status</CardTitle>

            <CardDescription>
              Portfolio setup completion status.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Settings className="size-4" />

                <span className="font-medium">Site Settings</span>
              </div>

              <p className="text-muted-foreground text-sm">
                {dashboard.configuration.settingsConfigured
                  ? "Settings configured successfully."
                  : "Settings configuration required."}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <BadgeCheck className="size-4" />

                <span className="font-medium">Hero Section</span>
              </div>

              <p className="text-muted-foreground text-sm">
                {dashboard.configuration.heroConfigured
                  ? "Hero section configured."
                  : "Hero section requires setup."}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Recent Activity                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>

          <p className="text-muted-foreground text-sm">
            Latest content and contact activity.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {/* Projects */}

          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>

            <CardContent>
              {dashboard.recent.projects.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No recent projects found.
                </p>
              ) : (
                <div className="space-y-3">
                  {dashboard.recent.projects.map((project) => (
                    <div key={project._id} className="space-y-1">
                      <p className="font-medium">{project.title}</p>

                      <p className="text-muted-foreground text-xs">
                        {project.category}
                      </p>

                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Blogs */}

          <Card>
            <CardHeader>
              <CardTitle>Recent Blogs</CardTitle>
            </CardHeader>

            <CardContent>
              {dashboard.recent.blogs.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No recent blogs found.
                </p>
              ) : (
                <div className="space-y-3">
                  {dashboard.recent.blogs.map((blog) => (
                    <div key={blog._id} className="space-y-1">
                      <p className="font-medium">{blog.title}</p>

                      <p className="text-muted-foreground text-xs">
                        {blog.category}
                      </p>

                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contacts */}

          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
            </CardHeader>

            <CardContent>
              {dashboard.recent.contacts.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No recent contacts found.
                </p>
              ) : (
                <div className="space-y-3">
                  {dashboard.recent.contacts.map((contact) => (
                    <div key={contact._id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="size-4" />

                        <span className="font-medium">{contact.name}</span>
                      </div>

                      <p className="text-muted-foreground text-xs">
                        {contact.subject}
                      </p>

                      <Separator />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default DashboardOverview;
