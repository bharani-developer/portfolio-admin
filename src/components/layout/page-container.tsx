// src/components/layout/page-container.tsx

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface IPageContainerProps {
  children: ReactNode;

  className?: string;

  fluid?: boolean;

  wide?: boolean;

  ultraWide?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Page Container                                */
/* -------------------------------------------------------------------------- */

export function PageContainer({
  children,
  className,
  fluid = false,
  wide = false,
  ultraWide = false,
}: IPageContainerProps): React.JSX.Element {
  return (
    <section
      className={cn(
        `
          relative
          w-full
          px-4
          py-4
          sm:px-6
          sm:py-6
          lg:px-8
          lg:py-8
        `,
        className,
      )}
    >
      <div
        className={cn(
          "w-full",

          !fluid &&
            !wide &&
            !ultraWide &&
            `
              mx-auto
              max-w-7xl
            `,

          !fluid &&
            wide &&
            !ultraWide &&
            `
              mx-auto
              max-w-[1600px]
            `,

          !fluid &&
            ultraWide &&
            `
              mx-auto
              max-w-[1920px]
            `,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export default PageContainer;
