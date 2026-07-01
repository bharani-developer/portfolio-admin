// src\app\theme-provider.tsx

import type { ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-admin-theme"
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}
