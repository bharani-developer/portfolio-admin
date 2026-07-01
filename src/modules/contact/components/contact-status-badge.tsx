// src/modules/contact/components/contact-status-badge.tsx

import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

import type { TContactStatus } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Badge Styles                                 */
/* -------------------------------------------------------------------------- */

const contactStatusBadgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "border",
    "px-2.5",
    "py-0.5",
    "text-xs",
    "font-medium",
    "whitespace-nowrap",
    "transition-colors",
  ],
  {
    variants: {
      status: {
        New: [
          "border-blue-200",
          "bg-blue-100",
          "text-blue-700",
          "dark:border-blue-900",
          "dark:bg-blue-950/50",
          "dark:text-blue-300",
        ],

        "In Progress": [
          "border-amber-200",
          "bg-amber-100",
          "text-amber-700",
          "dark:border-amber-900",
          "dark:bg-amber-950/50",
          "dark:text-amber-300",
        ],

        Replied: [
          "border-emerald-200",
          "bg-emerald-100",
          "text-emerald-700",
          "dark:border-emerald-900",
          "dark:bg-emerald-950/50",
          "dark:text-emerald-300",
        ],

        Closed: [
          "border-slate-200",
          "bg-slate-100",
          "text-slate-700",
          "dark:border-slate-800",
          "dark:bg-slate-900",
          "dark:text-slate-300",
        ],
      },
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ContactStatusBadgeProps {
  status: TContactStatus;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                           Contact Status Badge                             */
/* -------------------------------------------------------------------------- */

export function ContactStatusBadge({
  status,
  className,
}: ContactStatusBadgeProps): React.JSX.Element {
  return (
    <span
      role="status"
      aria-label={`Contact status: ${status}`}
      className={cn(
        contactStatusBadgeVariants({
          status,
        }),
        className,
      )}
    >
      {status}
    </span>
  );
}
