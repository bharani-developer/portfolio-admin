export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,

  VERSION: "v1",

  TIMEOUT: 30_000,

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: "/auth",

  HERO: "/hero",
  ABOUT: "/about",

  SKILLS: "/skills",
  SERVICES: "/services",

  PROJECTS: "/projects",
  BLOGS: "/blogs",

  EXPERIENCE: "/experience",
  EDUCATION: "/education",

  CERTIFICATIONS: "/certifications",

  TESTIMONIALS: "/testimonials",

  CONTACT: "/contact",

  SETTINGS: "/settings",

  DASHBOARD: "/dashboard",

  UPLOAD: "/upload",
} as const;
