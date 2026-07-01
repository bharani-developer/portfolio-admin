// src/shared/constants/api.constant.ts

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,

  VERSION: import.meta.env.VITE_API_VERSION ?? "v1",

  TIMEOUT: 30_000,

  CONTENT_TYPE: {
    JSON: "application/json",

    FORM_DATA: "multipart/form-data",
  },

  PAGINATION: {
    DEFAULT_PAGE: 1,

    DEFAULT_LIMIT: 10,
  },
} as const;

export const API_PREFIX = `/api/${API_CONFIG.VERSION}`;
