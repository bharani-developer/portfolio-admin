import { createContext } from "react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface ConfirmationOptions {
  title: string;

  description?: string;

  confirmText?: string;

  cancelText?: string;

  destructive?: boolean;
}

export interface ConfirmationContextValue {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
}

/* -------------------------------------------------------------------------- */
/*                                  Context                                   */
/* -------------------------------------------------------------------------- */

export const ConfirmationContext =
  createContext<ConfirmationContextValue | null>(null);
