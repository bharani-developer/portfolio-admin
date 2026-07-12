import * as React from "react";

import { useTheme } from "next-themes";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const toasterStyle: React.CSSProperties & Record<`--${string}`, string> = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius)",
};

function Toaster({
  theme,
  className,
  icons,
  style,
  toastOptions,
  ...props
}: ToasterProps) {
  const { theme: resolvedTheme } = useTheme();

  const currentTheme: NonNullable<ToasterProps["theme"]> =
    theme ??
    (resolvedTheme === "light" ||
    resolvedTheme === "dark" ||
    resolvedTheme === "system"
      ? resolvedTheme
      : "system");

  return (
    <Sonner
      {...props}
      theme={currentTheme}
      className={["toaster group", className].filter(Boolean).join(" ")}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
        ...icons,
      }}
      style={{
        ...toasterStyle,
        ...style,
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: "cn-toast",
          ...toastOptions?.classNames,
        },
      }}
    />
  );
}

export { Toaster };
