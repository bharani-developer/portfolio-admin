// src/components/layout/app-header.tsx

import { useMemo } from "react";

import { useLocation } from "react-router-dom";

import { Bell, Menu, Search, User, LogOut, ChevronDown } from "lucide-react";

import { ThemeToggle } from "@/components/common/theme-toggle";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { Link } from "react-router-dom";


import { useProfile } from "@/modules/auth/hooks/use-profile";
import { useLogout } from "@/modules/auth/hooks/use-logout";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
/* -------------------------------------------------------------------------- */
/*                               Page Metadata                                */
/* -------------------------------------------------------------------------- */

const PAGE_METADATA: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of your portfolio activity and statistics.",
  },

  "/dashboard/hero": {
    title: "Hero",
    description: "Manage homepage hero section content.",
  },

  "/dashboard/about": {
    title: "About",
    description: "Update personal and professional information.",
  },

  "/dashboard/skills": {
    title: "Skills",
    description: "Manage technical and professional skills.",
  },

  "/dashboard/services": {
    title: "Services",
    description: "Manage services offered to clients.",
  },

  "/dashboard/projects": {
    title: "Projects",
    description: "Showcase portfolio projects and case studies.",
  },

  "/dashboard/blogs": {
    title: "Blogs",
    description: "Manage articles and published content.",
  },

  "/dashboard/experience": {
    title: "Experience",
    description: "Manage professional work history.",
  },

  "/dashboard/education": {
    title: "Education",
    description: "Manage education records.",
  },

  "/dashboard/certifications": {
    title: "Certifications",
    description: "Manage certifications and achievements.",
  },

  "/dashboard/testimonials": {
    title: "Testimonials",
    description: "Manage client and colleague testimonials.",
  },

  "/dashboard/contact": {
    title: "Contact",
    description: "Review incoming contact requests.",
  },

  "/dashboard/settings": {
    title: "Settings",
    description: "Manage application settings and preferences.",
  },
};

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export function AppHeader(): React.JSX.Element {
  const location = useLocation();
  const { data: user } = useProfile();

  const logoutMutation = useLogout();
  const page = useMemo(() => {
    return (
      PAGE_METADATA[location.pathname] ?? {
        title: "Dashboard",
        description: "Manage your portfolio content.",
      }
    );
  }, [location.pathname]);

  return (
    <header
      className="
        bg-background/80
        supports-[backdrop-filter]:bg-background/60
        sticky
        top-0
        z-50
        border-b
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-20
          items-center
          justify-between
          px-4
          md:px-6
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* Left Section                                                   */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-4
          "
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </Button>

          <Separator
            orientation="vertical"
            className="
              hidden
              h-6
              lg:block
            "
          />

          <div className="min-w-0">
            <h1
              className="
                truncate
                text-xl
                font-semibold
                tracking-tight
              "
            >
              {page.title}
            </h1>

            <p
              className="
                text-muted-foreground
                hidden
                text-sm
                md:block
              "
            >
              {page.description}
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Right Section                                                  */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {/* Search Placeholder */}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="
              hidden
              gap-2
              md:flex
            "
          >
            <Search className="size-4" />

            <span>Search</span>
          </Button>

          {/* Notifications */}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </Button>

          {/* Theme */}

          <ThemeToggle />

          {/* User */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="
        h-10
        gap-3
        px-2
      "
              >
                <Avatar className="size-7">
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                  </AvatarFallback>
                </Avatar>

                <div
                  className="
          hidden
          min-w-0
          text-left
          md:block
        "
                >
                  <p
                    className="
            max-w-[120px]
            truncate
            text-sm
            font-medium
          "
                  >
                    {user?.name ?? "Admin"}
                  </p>

                  <p
                    className="
            text-muted-foreground
            max-w-[120px]
            truncate
            text-xs
          "
                  >
                    {user?.role ?? "ADMIN"}
                  </p>
                </div>

                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="space-y-1">
                  <p className="font-medium">{user?.name ?? "Admin"}</p>

                  <p
                    className="
            text-muted-foreground
            text-xs
            font-normal
          "
                  >
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">
                  <User className="mr-2 size-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                disabled={logoutMutation.isPending}
                className="
        text-destructive
        focus:text-destructive
      "
                onClick={() => {
                  logoutMutation.mutate();
                }}
              >
                <LogOut className="mr-2 size-4" />

                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
