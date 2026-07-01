// src/components/forms/submit-button.tsx

import { forwardRef, type ComponentProps, type ReactNode } from "react";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface SubmitButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;

  isLoading?: boolean;

  loadingText?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Submit Button                                */
/* -------------------------------------------------------------------------- */

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      children,
      isLoading = false,
      loadingText = "Submitting...",
      disabled,
      type = "submit",
      ...props
    },
    ref,
  ): React.JSX.Element => {
    const isDisabled = disabled || isLoading;

    return (
      <Button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoaderCircle
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />

            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </Button>
    );
  },
);

SubmitButton.displayName = "SubmitButton";
