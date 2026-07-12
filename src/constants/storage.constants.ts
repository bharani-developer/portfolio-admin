export const STORAGE_KEYS = {
  AUTH: {
    ACCESS_TOKEN: "portfolio-admin-access-token",

    REFRESH_TOKEN: "portfolio-admin-refresh-token",

    USER: "portfolio-admin-user",
  },

  THEME: {
    CURRENT_THEME: "portfolio-admin-theme",
  },

  TABLE: {
    PAGE_SIZE: "portfolio-admin-table-page-size",
  },

  FILTERS: {
    PROJECTS: "portfolio-admin-project-filters",

    BLOGS: "portfolio-admin-blog-filters",

    CONTACT: "portfolio-admin-contact-filters",
  },

  SEARCH: {
    GLOBAL: "portfolio-admin-global-search",
  },
  /* -------------------------------------------------------------------------- */
  /* AUTH */
  /* -------------------------------------------------------------------------- */

  ACCESS_TOKEN: "portfolio-admin-access-token",

  REFRESH_TOKEN: "portfolio-admin-refresh-token",

  USER: "portfolio-admin-user",

  /* -------------------------------------------------------------------------- */
  /* TABLE */
  /* -------------------------------------------------------------------------- */

  TABLE_PAGE_SIZE: "portfolio-admin-table-page-size",

  /* -------------------------------------------------------------------------- */
  /* FILTERS */
  /* -------------------------------------------------------------------------- */

  PROJECT_FILTERS: "portfolio-admin-project-filters",

  BLOG_FILTERS: "portfolio-admin-blog-filters",

  CONTACT_FILTERS: "portfolio-admin-contact-filters",

  /* -------------------------------------------------------------------------- */
  /* SEARCH */
  /* -------------------------------------------------------------------------- */

  GLOBAL_SEARCH: "portfolio-admin-global-search",
} as const;
