import type { LucideIcon } from "lucide-react";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Star,
  User,
  Wrench,
  Zap,
} from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export const NAVIGATION: NavigationGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Portfolio",
    items: [
      {
        title: "Hero",
        href: "/dashboard/hero",
        icon: Home,
      },
      {
        title: "About",
        href: "/dashboard/about",
        icon: User,
      },
      {
        title: "Skills",
        href: "/dashboard/skills",
        icon: Zap,
      },
      {
        title: "Services",
        href: "/dashboard/services",
        icon: Wrench,
      },
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        title: "Blogs",
        href: "/dashboard/blogs",
        icon: BookOpen,
      },
    ],
  },

  {
    title: "Career",
    items: [
      {
        title: "Experience",
        href: "/dashboard/experience",
        icon: BriefcaseBusiness,
      },
      {
        title: "Education",
        href: "/dashboard/education",
        icon: GraduationCap,
      },
      {
        title: "Certifications",
        href: "/dashboard/certifications",
        icon: Award,
      },
    ],
  },

  {
    title: "Management",
    items: [
      {
        title: "Testimonials",
        href: "/dashboard/testimonials",
        icon: Star,
      },
      {
        title: "Contact",
        href: "/dashboard/contact",
        icon: MessageSquare,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
] as const;
