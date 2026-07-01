import { createContext } from "react";

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

export const ConfirmationContext = createContext<
  ConfirmationContextValue | undefined
>(undefined);
