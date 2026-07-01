// src\shared\hooks\use-confirmation.ts

import { useContext } from "react";

import {
  ConfirmationContext,
  type ConfirmationContextValue,
} from "@/providers/confirmation/confirmation.context";

/* -------------------------------------------------------------------------- */
/*                            Use Confirmation Hook                           */
/* -------------------------------------------------------------------------- */

export function useConfirmation(): ConfirmationContextValue {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }

  return context;
}
