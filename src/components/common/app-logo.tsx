// src\components\common\app-logo.tsx

import { Link } from "react-router-dom";

import { BriefcaseBusiness } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface AppLogoProps {
  className?: string;
  showText?: boolean;
}

export function AppLogo({
  className,
  showText = true,
}: AppLogoProps): React.JSX.Element {
  return (
    <Link
      to="/dashboard"
      className={cn("flex items-center gap-3", className)}
      aria-label="Portfolio Admin"
    >
      <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl shadow-sm">
        <BriefcaseBusiness className="size-5" />
      </div>

      {showText ? (
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none">
            Portfolio Admin
          </span>

          <span className="text-muted-foreground text-xs">
            Content Management
          </span>
        </div>
      ) : null}
    </Link>
  );
}
