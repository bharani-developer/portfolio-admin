// src/layouts/dashboard-layout.tsx

import { Outlet } from "react-router-dom";

import { AppBreadcrumb } from "@/components/layout/app-breadcrumb";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";

export function DashboardLayout(): React.JSX.Element {
  return (
    <div
      className="
        bg-background
        relative
        flex
        min-h-screen
        overflow-hidden
      "
    >
      {/* Background Effects */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-background
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_35%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-100
            dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
            [background-image:linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)]
            [background-size:56px_56px]
            [mask-image:radial-gradient(circle_at_center,black_30%,transparent_95%)]
          "
        />

        <div
          className="
            bg-primary/10
            absolute
            left-1/2
            top-0
            h-[600px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            bg-primary/8
            absolute
            left-[-200px]
            top-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            bg-blue-500/8
            absolute
            bottom-[10%]
            right-[-200px]
            h-[500px]
            w-[500px]
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            bg-violet-500/5
            absolute
            left-1/2
            top-1/2
            h-[700px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            bg-cyan-500/5
            absolute
            right-1/4
            top-1/4
            h-[400px]
            w-[400px]
            rounded-full
            blur-3xl
          "
        />
      </div>

      {/* Sidebar */}

      <AppSidebar />

      {/* Main Area */}

      <div
        className="
          relative
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        <AppHeader />

        <main
          className="
            relative
            flex-1
            overflow-y-auto
          "
        >
          <div
            className="
              w-full
              px-4
              py-6
              sm:px-6
              lg:px-8
              lg:py-8
            "
          >
            <div className="mb-6">
              <AppBreadcrumb />
            </div>

            <div
              className="
                animate-in
                fade-in-50
                slide-in-from-bottom-2
                duration-300
              "
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;