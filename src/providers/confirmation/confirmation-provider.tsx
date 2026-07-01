import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  ConfirmationContext,
  type ConfirmationOptions,
} from "./confirmation.context";

interface ConfirmationProviderProps {
  children: ReactNode;
}

interface ConfirmationState {
  open: boolean;

  title: string;

  description: string | undefined;

  confirmText: string;

  cancelText: string;

  destructive: boolean;
}

const DEFAULT_STATE: ConfirmationState = {
  open: false,

  title: "",

  description: undefined,

  confirmText: "Confirm",

  cancelText: "Cancel",

  destructive: false,
};

export function ConfirmationProvider({
  children,
}: ConfirmationProviderProps): React.JSX.Element {
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>(DEFAULT_STATE);

  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const handleClose = useCallback((result: boolean): void => {
    resolverRef.current?.(result);

    resolverRef.current = null;

    setConfirmationState(DEFAULT_STATE);
  }, []);

  const confirm = useCallback(
    (options: ConfirmationOptions): Promise<boolean> =>
      new Promise((resolve) => {
        resolverRef.current = resolve;

        setConfirmationState({
          open: true,

          title: options.title,

          description: options.description,

          confirmText: options.confirmText ?? "Confirm",

          cancelText: options.cancelText ?? "Cancel",

          destructive: options.destructive ?? false,
        });
      }),
    [],
  );

  const value = useMemo(
    () => ({
      confirm,
    }),
    [confirm],
  );

  return (
    <ConfirmationContext.Provider value={value}>
      {children}

      <AlertDialog
        open={confirmationState.open}
        onOpenChange={(open) => {
          if (!open) {
            handleClose(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmationState.title}</AlertDialogTitle>

            {confirmationState.description ? (
              <AlertDialogDescription>
                {confirmationState.description}
              </AlertDialogDescription>
            ) : null}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleClose(false)}>
              {confirmationState.cancelText}
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => handleClose(true)}
              className={
                confirmationState.destructive
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : undefined
              }
            >
              {confirmationState.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmationContext.Provider>
  );
}
