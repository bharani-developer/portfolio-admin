// src\modules\dashboard\types\dashboard.type.ts

import type { IApiResponse } from "@/shared/types";

/* -------------------------------------------------------------------------- */
/*                               Overview Type                                */
/* -------------------------------------------------------------------------- */

export interface IDashboardOverview {
  projects: number;

  blogs: number;

  services: number;

  skills: number;

  experiences: number;

  educations: number;

  certifications: number;

  testimonials: number;

  contacts: number;
}

/* -------------------------------------------------------------------------- */
/*                               Projects Type                                */
/* -------------------------------------------------------------------------- */

export interface IDashboardProjects {
  total: number;

  active: number;

  featured: number;
}

/* -------------------------------------------------------------------------- */
/*                                 Blogs Type                                 */
/* -------------------------------------------------------------------------- */

export interface IDashboardBlogs {
  total: number;

  published: number;

  featured: number;
}

/* -------------------------------------------------------------------------- */
/*                               Services Type                                */
/* -------------------------------------------------------------------------- */

export interface IDashboardServices {
  total: number;

  active: number;
}

/* -------------------------------------------------------------------------- */
/*                                Skills Type                                 */
/* -------------------------------------------------------------------------- */

export interface IDashboardSkills {
  total: number;

  active: number;
}

/* -------------------------------------------------------------------------- */
/*                              Experience Type                               */
/* -------------------------------------------------------------------------- */

export interface IDashboardExperiences {
  total: number;

  current: number;
}

/* -------------------------------------------------------------------------- */
/*                               Education Type                               */
/* -------------------------------------------------------------------------- */

export interface IDashboardEducations {
  total: number;

  current: number;
}

/* -------------------------------------------------------------------------- */
/*                            Certification Type                              */
/* -------------------------------------------------------------------------- */

export interface IDashboardCertifications {
  total: number;

  active: number;
}

/* -------------------------------------------------------------------------- */
/*                            Testimonial Type                                */
/* -------------------------------------------------------------------------- */

export interface IDashboardTestimonials {
  total: number;

  featured: number;
}

/* -------------------------------------------------------------------------- */
/*                               Contacts Type                                */
/* -------------------------------------------------------------------------- */

export interface IDashboardContacts {
  total: number;

  unread: number;

  replied: number;
}

/* -------------------------------------------------------------------------- */
/*                            Configuration Type                              */
/* -------------------------------------------------------------------------- */

export interface IDashboardConfiguration {
  heroConfigured: boolean;

  settingsConfigured: boolean;
}

/* -------------------------------------------------------------------------- */
/*                            Recent Project Type                             */
/* -------------------------------------------------------------------------- */

export interface IDashboardRecentProject {
  _id: string;

  title: string;

  slug: string;

  category: string;

  featured: boolean;

  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/*                              Recent Blog Type                              */
/* -------------------------------------------------------------------------- */

export interface IDashboardRecentBlog {
  _id: string;

  title: string;

  slug: string;

  category: string;

  isPublished: boolean;

  isFeatured: boolean;

  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/*                            Recent Contact Type                             */
/* -------------------------------------------------------------------------- */

export interface IDashboardRecentContact {
  _id: string;

  name: string;

  email: string;

  subject: string;

  status: string;

  priority: string;

  isRead: boolean;

  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/*                               Recent Data                                  */
/* -------------------------------------------------------------------------- */

export interface IDashboardRecent {
  projects: IDashboardRecentProject[];

  blogs: IDashboardRecentBlog[];

  contacts: IDashboardRecentContact[];
}

/* -------------------------------------------------------------------------- */
/*                               Dashboard Data                               */
/* -------------------------------------------------------------------------- */

export interface IDashboard {
  overview: IDashboardOverview;

  projects: IDashboardProjects;

  blogs: IDashboardBlogs;

  services: IDashboardServices;

  skills: IDashboardSkills;

  experiences: IDashboardExperiences;

  educations: IDashboardEducations;

  certifications: IDashboardCertifications;

  testimonials: IDashboardTestimonials;

  contacts: IDashboardContacts;

  configuration: IDashboardConfiguration;

  recent: IDashboardRecent;
}

/* -------------------------------------------------------------------------- */
/*                             API Response Types                             */
/* -------------------------------------------------------------------------- */

export type IDashboardResponse = IApiResponse<IDashboard>;

/* -------------------------------------------------------------------------- */
/*                              Widget Types                                  */
/* -------------------------------------------------------------------------- */

export interface IDashboardStatCard {
  title: string;

  value: number;

  description?: string;

  href?: string;
}

/* -------------------------------------------------------------------------- */
/*                            Chart Data Types                                */
/* -------------------------------------------------------------------------- */

export interface IDashboardOverviewChartItem {
  name: string;

  value: number;
}

/* -------------------------------------------------------------------------- */
/*                              Default Values                                */
/* -------------------------------------------------------------------------- */

export const DASHBOARD_DEFAULT_DATA: IDashboard = {
  overview: {
    projects: 0,

    blogs: 0,

    services: 0,

    skills: 0,

    experiences: 0,

    educations: 0,

    certifications: 0,

    testimonials: 0,

    contacts: 0,
  },

  projects: {
    total: 0,

    active: 0,

    featured: 0,
  },

  blogs: {
    total: 0,

    published: 0,

    featured: 0,
  },

  services: {
    total: 0,

    active: 0,
  },

  skills: {
    total: 0,

    active: 0,
  },

  experiences: {
    total: 0,

    current: 0,
  },

  educations: {
    total: 0,

    current: 0,
  },

  certifications: {
    total: 0,

    active: 0,
  },

  testimonials: {
    total: 0,

    featured: 0,
  },

  contacts: {
    total: 0,

    unread: 0,

    replied: 0,
  },

  configuration: {
    heroConfigured: false,

    settingsConfigured: false,
  },

  recent: {
    projects: [],

    blogs: [],

    contacts: [],
  },
};
