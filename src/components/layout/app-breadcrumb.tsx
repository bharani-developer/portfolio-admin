// src/components/layout/app-breadcrumb.tsx

import { Fragment } from "react";

import { Link, useLocation } from "react-router-dom";

import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/* -------------------------------------------------------------------------- */
/*                               Route Labels                                 */
/* -------------------------------------------------------------------------- */

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",

  hero: "Hero",
  about: "About",

  skills: "Skills",
  services: "Services",

  projects: "Projects",
  blogs: "Blogs",

  experience: "Experience",
  education: "Education",

  certifications: "Certifications",

  testimonials: "Testimonials",

  contact: "Contact",
  contacts: "Contacts",

  settings: "Settings",

  create: "Create",
  edit: "Edit",

  profile: "Profile",

  upload: "Upload",
};

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

function isDynamicSegment(segment: string): boolean {
  return /^[a-f\d]{24}$/i.test(segment) || /^[0-9a-f-]{36}$/i.test(segment);
}

function formatLabel(segment: string): string {
  if (isDynamicSegment(segment)) {
    return "Details";
  }

  return (
    ROUTE_LABELS[segment] ??
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
  );
}

/* -------------------------------------------------------------------------- */
/*                             App Breadcrumb                                 */
/* -------------------------------------------------------------------------- */

export function AppBreadcrumb(): React.JSX.Element {
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* -------------------------------------------------------------- */}
        {/* Dashboard Root                                                 */}
        {/* -------------------------------------------------------------- */}

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/dashboard"
              className="
                text-muted-foreground
                hover:text-foreground
                inline-flex
                items-center
                gap-2
                transition-colors
              "
            >
              <Home className="size-4" aria-hidden="true" />

              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.length > 0 ? <BreadcrumbSeparator /> : null}

        {/* -------------------------------------------------------------- */}
        {/* Dynamic Segments                                               */}
        {/* -------------------------------------------------------------- */}

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

          const isLast = index === pathSegments.length - 1;

          const label = formatLabel(segment);

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    className="
                        max-w-[200px]
                        truncate
                        font-medium
                      "
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={href}
                      className="
                          text-muted-foreground
                          hover:text-foreground
                          transition-colors
                        "
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast ? <BreadcrumbSeparator /> : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
