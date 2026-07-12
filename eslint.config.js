// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      /*
       * React Compiler
       * TanStack Table & React Hook Form currently trigger this warning.
       * Safe to disable unless you're actively using React Compiler.
       */
      "react-hooks/incompatible-library": "off",

      /*
       * Allow exporting constants (buttonVariants, badgeVariants, etc.)
       * alongside React components. Required for shadcn/ui.
       */
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
    },
  },
]);
