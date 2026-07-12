import type { ComponentPropsWithoutRef } from "react";

import { Slot } from "radix-ui";
import type { VariantProps } from "class-variance-authority";

import { badgeVariants } from "./badge-variants";

import { cn } from "@/shared/lib/utils";

export interface BadgeProps
  extends ComponentPropsWithoutRef<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps): React.JSX.Element {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
