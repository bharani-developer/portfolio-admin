// src/layouts/auth-layout.tsx

import { Outlet } from "react-router-dom";

export function AuthLayout(): React.JSX.Element {
  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-background
      "
    >
      {/* Background Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_35%)]
        "
      />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Floating Glow */}
      <div
        className="
          bg-primary/15
          absolute
          top-0
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          blur-3xl
        "
      />

      {/* Page Content */}
      <div className="relative z-10 min-h-screen w-full">
        <Outlet />
      </div>
    </main>
  );
}
