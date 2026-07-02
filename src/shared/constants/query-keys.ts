// src/shared/constants/query-keys.ts

export const QUERY_KEYS = {
  AUTH: {
    ALL: ["auth"] as const,

    LOGIN: ["auth", "login"] as const,

    LOGOUT: ["auth", "logout"] as const,

    REFRESH: ["auth", "refresh"] as const,

    PROFILE: ["auth", "profile"] as const,
  },

  DASHBOARD: {
    ALL: ["dashboard"] as const,

    STATS: ["dashboard", "stats"] as const,
  },

  HERO: {
    ALL: ["hero"] as const,

    DETAIL: ["hero", "detail"] as const,
  },

  ABOUT: {
    ALL: ["about"] as const,

    DETAIL: ["about", "detail"] as const,
  },

  SETTINGS: {
    ALL: () => ["settings"] as const,

    DETAIL: () => ["settings", "detail"] as const,
  },

  SKILLS: {
    ALL: ["skills"] as const,

    LIST: ["skills", "list"] as const,

    DETAIL: (id: string) => ["skills", "detail", id] as const,
  },

  SERVICES: {
    ALL: ["services"] as const,

    LIST: ["services", "list"] as const,

    DETAIL: (id: string) => ["services", "detail", id] as const,
  },

  PROJECTS: {
    ALL: ["projects"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["projects", "list", params] as const,

    DETAIL: (id: string) => ["projects", "detail", id] as const,

    FEATURED: ["projects", "featured"] as const,

    ACTIVE: ["projects", "active"] as const,

    BY_SLUG: (slug: string) => ["projects", "slug", slug] as const,

    BY_CATEGORY: (category: string) =>
      ["projects", "category", category] as const,

    BY_TECHNOLOGY: (technology: string) =>
      ["projects", "technology", technology] as const,

    BY_STATUS: (status: string) => ["projects", "status", status] as const,
  },

  BLOGS: {
    ALL: ["blogs"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["blogs", "list", params] as const,

    DETAIL: (id: string) => ["blogs", "detail", id] as const,

    BY_SLUG: (slug: string) => ["blogs", "slug", slug] as const,
  },

  EXPERIENCE: {
    ALL: ["experience"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["experience", "list", params] as const,

    DETAIL: (id: string) => ["experience", "detail", id] as const,

    ACTIVE: ["experience", "active"] as const,

    CURRENT: ["experience", "current"] as const,

    BY_SLUG: (slug: string) => ["experience", "slug", slug] as const,

    BY_COMPANY: (company: string) =>
      ["experience", "company", company] as const,

    BY_TECHNOLOGY: (technology: string) =>
      ["experience", "technology", technology] as const,
  },

  EDUCATION: {
    ALL: ["education"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["education", "list", params] as const,

    DETAIL: (id: string) => ["education", "detail", id] as const,

    ACTIVE: ["education", "active"] as const,

    CURRENT: ["education", "current"] as const,

    BY_SLUG: (slug: string) => ["education", "slug", slug] as const,

    BY_LEVEL: (level: string) => ["education", "level", level] as const,

    BY_SKILL: (skill: string) => ["education", "skill", skill] as const,
  },

  CERTIFICATIONS: {
    ALL: ["certifications"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["certifications", "list", params] as const,

    DETAIL: (id: string) => ["certifications", "detail", id] as const,

    ACTIVE: ["certifications", "active"] as const,

    VALID: ["certifications", "valid"] as const,

    EXPIRED: ["certifications", "expired"] as const,

    BY_SLUG: (slug: string) => ["certifications", "slug", slug] as const,

    BY_ISSUER: (issuer: string) =>
      ["certifications", "issuer", issuer] as const,

    BY_SKILL: (skill: string) => ["certifications", "skill", skill] as const,
  },

  TESTIMONIALS: {
    ALL: ["testimonials"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["testimonials", "list", params] as const,

    DETAIL: (id: string) => ["testimonials", "detail", id] as const,

    FEATURED: ["testimonials", "featured"] as const,

    ACTIVE: ["testimonials", "active"] as const,

    AVERAGE_RATING: ["testimonials", "average-rating"] as const,

    BY_RATING: (rating: number) => ["testimonials", "rating", rating] as const,

    BY_CLIENT_TYPE: (clientType: string) =>
      ["testimonials", "client-type", clientType] as const,

    BY_PROJECT: (projectName: string) =>
      ["testimonials", "project", projectName] as const,
  },

  CONTACT: {
    ALL: ["contact"] as const,

    LIST: (params?: Record<string, unknown>) =>
      ["contact", "list", params] as const,

    DETAIL: (id: string) => ["contact", "detail", id] as const,

    STATS: () => ["contact", "stats"] as const,

    ACTIVE: () => ["contact", "active"] as const,

    UNREAD: () => ["contact", "unread"] as const,

    READ: () => ["contact", "read"] as const,

    REPLIED: () => ["contact", "replied"] as const,
  },
} as const;
