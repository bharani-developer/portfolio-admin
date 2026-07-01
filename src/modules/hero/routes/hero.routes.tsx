// src/modules/hero/routes/hero.routes.tsx

import type { RouteObject } from "react-router-dom";

import { HeroPage } from "../pages";

/* -------------------------------------------------------------------------- */
/*                                Hero Routes                                 */
/* -------------------------------------------------------------------------- */

export const heroRoutes: RouteObject[] = [
  {
    path: "hero",

    element: <HeroPage />,
  },
];
