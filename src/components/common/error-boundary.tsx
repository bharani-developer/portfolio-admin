// src\components\common\error-boundary.tsx

import type { ErrorInfo, ReactNode } from "react";

import { Component } from "react";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error Boundary Caught:", error, errorInfo);

    /*
     * Future integrations:
     *
     * Sentry.captureException(error);
     * LogRocket.captureException(error);
     * Datadog Error Tracking
     */
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
          <div className="bg-destructive/10 mb-6 flex size-16 items-center justify-center rounded-full">
            <AlertTriangle
              className="text-destructive size-8"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-2xl font-bold">Something went wrong</h2>

          <p className="text-muted-foreground mt-2 max-w-md">
            An unexpected error occurred while rendering this page.
          </p>

          {import.meta.env.DEV && this.state.error ? (
            <pre className="bg-muted mt-6 max-w-3xl overflow-auto rounded-lg p-4 text-left text-xs">
              {this.state.error.message}
            </pre>
          ) : null}

          <div className="mt-6 flex gap-3">
            <Button onClick={this.handleReset} variant="outline">
              Try Again
            </Button>

            <Button onClick={this.handleReload}>
              <RefreshCw className="mr-2 size-4" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
