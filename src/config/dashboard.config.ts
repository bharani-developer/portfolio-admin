import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  GraduationCap,
  MessageSquare,
  Star,
  Wrench,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface DashboardStatConfig {
  key: string;
  title: string;
  icon: LucideIcon;
}

export interface DashboardQuickActionConfig {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_STATS: DashboardStatConfig[] = [
  {
    key: "projects",
    title: "Projects",
    icon: FolderKanban,
  },
  {
    key: "blogs",
    title: "Blogs",
    icon: FileText,
  },
  {
    key: "services",
    title: "Services",
    icon: Wrench,
  },
  {
    key: "experience",
    title: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    key: "education",
    title: "Education",
    icon: GraduationCap,
  },
  {
    key: "testimonials",
    title: "Testimonials",
    icon: Star,
  },
  {
    key: "messages",
    title: "Messages",
    icon: MessageSquare,
  },
];

export const DASHBOARD_QUICK_ACTIONS: DashboardQuickActionConfig[] = [
  {
    title: "Add Project",
    href: "/dashboard/projects/create",
    icon: FolderKanban,
  },
  {
    title: "Write Blog",
    href: "/dashboard/blogs/create",
    icon: FileText,
  },
  {
    title: "Add Service",
    href: "/dashboard/services/create",
    icon: Wrench,
  },
];

export const DASHBOARD_LIMITS = {
  RECENT_PROJECTS: 5,
  RECENT_BLOGS: 5,
  RECENT_MESSAGES: 5,
} as const;
