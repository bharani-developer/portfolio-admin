import type { ComponentPropsWithoutRef } from "react";

import { Slot } from "radix-ui";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button-variants";

import { cn } from "@/shared/lib/utils";

export interface ButtonProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps): React.JSX.Element {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
