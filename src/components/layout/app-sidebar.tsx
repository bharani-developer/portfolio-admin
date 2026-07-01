// src/components/layout/app-sidebar.tsx

import { BriefcaseBusiness } from "lucide-react";

import { NavLink } from "react-router-dom";

import { SIDEBAR_ITEMS } from "@/config/sidebar.config";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/shared/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                App Sidebar                                 */
/* -------------------------------------------------------------------------- */

export function AppSidebar(): React.JSX.Element {
  return (
    <aside
      className="
        bg-background/95
        supports-[backdrop-filter]:bg-background/80
        hidden
        w-72
        shrink-0
        border-r
        backdrop-blur-xl
        lg:flex
        lg:flex-col
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Logo                                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          sticky
          top-0
          z-20
          border-b
          bg-inherit
          px-6
          py-5
          backdrop-blur-xl
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              from-primary
              to-primary/80
              text-primary-foreground
              flex
              size-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              shadow-lg
              shadow-primary/20
            "
          >
            <BriefcaseBusiness className="size-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h1
              className="
                truncate
                text-base
                font-semibold
                tracking-tight
              "
            >
              Portfolio Admin
            </h1>

            <p
              className="
                text-muted-foreground
                text-xs
              "
            >
              Content Management Platform
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Navigation                                                          */}
      {/* ------------------------------------------------------------------ */}

      <ScrollArea className="flex-1">
        <nav className="px-4 py-5">
          <div className="space-y-8">
            {SIDEBAR_ITEMS.map((group) => (
              <section key={group.title} className="space-y-2">
                <div
                  className="
                    text-muted-foreground
                    px-3
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                  "
                >
                  {group.title}
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink key={item.href} to={item.href} end>
                        {({ isActive }) => (
                          <div
                            className={cn(
                              `
                                group
                                relative
                                flex
                                items-center
                                gap-3
                                overflow-hidden
                                rounded-2xl
                                px-3
                                py-2.5
                                transition-all
                                duration-300
                              `,
                              isActive
                                ? `
                                  bg-primary
                                  text-primary-foreground
                                  shadow-lg
                                  shadow-primary/15
                                `
                                : `
                                  text-muted-foreground
                                  hover:bg-accent/60
                                  hover:text-foreground
                                `,
                            )}
                          >
                            {/* Active Accent */}

                            {isActive && (
                              <span
                                className="
                                  absolute
                                  left-0
                                  top-1/2
                                  h-10
                                  w-1
                                  -translate-y-1/2
                                  rounded-r-full
                                  bg-primary-foreground
                                "
                              />
                            )}

                            {/* Icon */}

                            <div
                              className={cn(
                                `
                                  flex
                                  size-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  transition-all
                                  duration-300
                                `,
                                isActive
                                  ? `
                                    bg-primary-foreground/10
                                  `
                                  : `
                                    bg-muted
                                    group-hover:bg-background
                                    group-hover:shadow-sm
                                  `,
                              )}
                            >
                              <Icon
                                className="
                                  size-4
                                  transition-transform
                                  duration-300
                                  group-hover:scale-110
                                "
                                aria-hidden="true"
                              />
                            </div>

                            {/* Label */}

                            <span
                              className="
                                flex-1
                                truncate
                                text-sm
                                font-medium
                              "
                            >
                              {item.title}
                            </span>

                            {/* Active Glow */}

                            {isActive && (
                              <div
                                className="
                                  absolute
                                  inset-0
                                  bg-gradient-to-r
                                  from-primary-foreground/5
                                  via-transparent
                                  to-transparent
                                  pointer-events-none
                                "
                              />
                            )}
                          </div>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </nav>
      </ScrollArea>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          sticky
          bottom-0
          border-t
          bg-inherit
          p-4
          backdrop-blur-xl
        "
      >
        <div
          className="
            from-muted/80
            to-muted/30
            rounded-2xl
            border
            bg-gradient-to-br
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                bg-primary/10
                text-primary
                flex
                size-9
                items-center
                justify-center
                rounded-xl
              "
            >
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-semibold
                "
              >
                Portfolio Admin
              </p>

              <p
                className="
                  text-muted-foreground
                  text-xs
                "
              >
                Version 1.0.0
              </p>
            </div>
          </div>

          <Separator className="my-3" />

          <p
            className="
              text-muted-foreground
              text-xs
              leading-relaxed
            "
          >
            Professional portfolio management dashboard built with React,
            TypeScript, Tailwind CSS and shadcn/ui.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
