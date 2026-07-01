import type { ReactElement, ReactNode } from "react";

import {
  BriefcaseBusiness,
  Sparkles,
  Code2,
  FileText,
  Layers3,
  Database,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import { LoginForm } from "../components";

export function LoginPage(): ReactElement {
  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-background
      "
    >
      {/* ---------------------------------------------------------------- */}
      {/* Background Effects */}
      {/* ---------------------------------------------------------------- */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* ---------------------------------------------------------------- */}
      {/* Layout */}
      {/* ---------------------------------------------------------------- */}

      <div
        className="
          relative
          grid
          min-h-screen
          w-full
          lg:grid-cols-[1.4fr_1.1fr_0.9fr]
lg:grid-cols-[50%_50%]        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* LEFT CONTENT */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="
            hidden
            px-16
            py-12
            lg:flex
            lg:flex-col
            lg:justify-center
            xl:px-20
            2xl:px-24
          "
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <div
                className="
                  bg-primary
                  text-primary-foreground
                  flex
                  size-16
                  items-center
                  justify-center
                  rounded-3xl
                  shadow-lg
                "
              >
                <BriefcaseBusiness className="size-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Portfolio Admin
                </h2>

                <p className="text-muted-foreground mt-1 text-sm">
                  Professional Portfolio Management Platform
                </p>
              </div>
            </div>

            <div
              className="
                bg-primary/10
                text-primary
                mt-10
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary/20
                px-4
                py-2
                text-sm
                font-medium
              "
            >
              <Sparkles className="size-4" />
              Modern Full Stack Developer Dashboard
            </div>

            <h1
              className="
                mt-8
                text-6xl
                font-bold
                tracking-tight
                leading-[0.95]
                xl:text-7xl
                2xl:text-8xl
              "
            >
              Build.
              <br />
              Manage.
              <br />
              <span className="text-primary">Showcase.</span>
            </h1>

            <p
              className="
                text-muted-foreground
                mt-8
                max-w-2xl
                text-lg
                leading-8
              "
            >
              Manage projects, blogs, services, skills, experience,
              certifications, testimonials, education, and portfolio content
              through a centralized administration dashboard designed for modern
              developers.
            </p>

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-3
              "
            >
              <TechBadge label="React" />
              <TechBadge label="TypeScript" />
              <TechBadge label="Node.js" />
              <TechBadge label="Express" />
              <TechBadge label="MongoDB" />
              <TechBadge label="MySQL" />
              <TechBadge label="Tailwind CSS" />
              <TechBadge label="Docker" />
            </div>
            <div className="mb-6 mt-6">
              <h3 className="text-lg font-semibold">Portfolio Overview</h3>

              <p className="text-muted-foreground text-sm">
                Manage all portfolio resources from a centralized dashboard.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <OverviewCard
                icon={<Code2 className="size-5" />}
                title="Projects"
                description="Manage portfolio projects and showcase work."
              />

              <OverviewCard
                icon={<FileText className="size-5" />}
                title="Blogs"
                description="Publish articles and technical content."
              />

              <OverviewCard
                icon={<Layers3 className="size-5" />}
                title="Skills"
                description="Maintain technical skill categories."
              />

              <OverviewCard
                icon={<Database className="size-5" />}
                title="Experience"
                description="Track work experience and achievements."
              />

              <OverviewCard
                icon={<GraduationCap className="size-5" />}
                title="Education"
                description="Manage academic qualifications."
              />

              <OverviewCard
                icon={<ShieldCheck className="size-5" />}
                title="Secure Access"
                description="Protected administration dashboard."
              />
            </div>
            <div
              className="
                mt-14
                grid
                grid-cols-3
                gap-8
                max-w-xl
              "
            >
              <StatCard value="100+" label="Projects" />

              <StatCard value="10+" label="Modules" />

              <StatCard value="24/7" label="Access" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* LOGIN SECTION */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="
    flex
    min-h-screen
    items-center
    justify-center
    px-6
    py-10
    sm:px-8
    lg:px-10
    xl:px-14
  "
        >
          <div className="w-full max-w-2xl">
            <div
              className="
        bg-background/80
        rounded-[32px]
       
        p-4
        shadow-[0_25px_120px_rgba(0,0,0,0.18)]
        backdrop-blur-3xl
      "
            >
              <LoginForm />
            </div>

            <p
              className="
        text-muted-foreground
        mt-6
        text-center
        text-xs
      "
            >
              Protected administration area. Authorized users only.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

interface TechBadgeProps {
  label: string;
}

function TechBadge({ label }: TechBadgeProps): ReactElement {
  return (
    <div
      className="
        bg-background/70
        rounded-full
        border
        border-border/50
        px-4
        py-2
        text-sm
        font-medium
        backdrop-blur-md
      "
    >
      {label}
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps): ReactElement {
  return (
    <div>
      <p
        className="
          text-3xl
          font-bold
          tracking-tight
        "
      >
        {value}
      </p>

      <p
        className="
          text-muted-foreground
          mt-1
          text-sm
        "
      >
        {label}
      </p>
    </div>
  );
}
interface OverviewCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function OverviewCard({
  icon,
  title,
  description,
}: OverviewCardProps): ReactElement {
  return (
    <div
      className="
        hover:bg-muted/50
        flex
        gap-3
        rounded-2xl
        border
        border-border/50
        p-4
        transition-colors
      "
    >
      <div
        className="
          bg-primary/10
          text-primary
          flex
          size-10
          shrink-0
          items-center
          justify-center
          rounded-xl
        "
      >
        {icon}
      </div>

      <div>
        <h4 className="font-medium">{title}</h4>

        <p
          className="
            text-muted-foreground
            mt-1
            text-sm
            leading-relaxed
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
