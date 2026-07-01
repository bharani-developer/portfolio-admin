// src/modules/contact/components/contact-priority-badge.tsx

import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

import type { TContactPriority } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Badge Styles                                 */
/* -------------------------------------------------------------------------- */

const contactPriorityBadgeVariants = cva(
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
      priority: {
        Low: [
          "border-slate-200",
          "bg-slate-100",
          "text-slate-700",
          "dark:border-slate-800",
          "dark:bg-slate-900",
          "dark:text-slate-300",
        ],

        Medium: [
          "border-blue-200",
          "bg-blue-100",
          "text-blue-700",
          "dark:border-blue-900",
          "dark:bg-blue-950/50",
          "dark:text-blue-300",
        ],

        High: [
          "border-amber-200",
          "bg-amber-100",
          "text-amber-700",
          "dark:border-amber-900",
          "dark:bg-amber-950/50",
          "dark:text-amber-300",
        ],

        Urgent: [
          "border-red-200",
          "bg-red-100",
          "text-red-700",
          "dark:border-red-900",
          "dark:bg-red-950/50",
          "dark:text-red-300",
        ],
      },
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ContactPriorityBadgeProps {
  priority: TContactPriority;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                          Contact Priority Badge                            */
/* -------------------------------------------------------------------------- */

export function ContactPriorityBadge({
  priority,
  className,
}: ContactPriorityBadgeProps): React.JSX.Element {
  return (
    <span
      role="status"
      aria-label={`Contact priority: ${priority}`}
      className={cn(
        contactPriorityBadgeVariants({
          priority,
        }),
        className,
      )}
    >
      {priority}
    </span>
  );
}
