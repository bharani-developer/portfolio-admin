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

import { ROUTES } from "@/constants/route.constants";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Portfolio",
    items: [
      {
        title: "Hero",
        href: ROUTES.HERO,
        icon: Home,
      },
      {
        title: "About",
        href: ROUTES.ABOUT,
        icon: User,
      },
      {
        title: "Skills",
        href: ROUTES.SKILLS,
        icon: Zap,
      },
      {
        title: "Services",
        href: ROUTES.SERVICES,
        icon: Wrench,
      },
      {
        title: "Projects",
        href: ROUTES.PROJECTS,
        icon: FolderKanban,
      },
      {
        title: "Blogs",
        href: ROUTES.BLOGS,
        icon: BookOpen,
      },
    ],
  },

  {
    title: "Career",
    items: [
      {
        title: "Experience",
        href: ROUTES.EXPERIENCE,
        icon: BriefcaseBusiness,
      },
      {
        title: "Education",
        href: ROUTES.EDUCATION,
        icon: GraduationCap,
      },
      {
        title: "Certifications",
        href: ROUTES.CERTIFICATIONS,
        icon: Award,
      },
    ],
  },

  {
    title: "Management",
    items: [
      {
        title: "Testimonials",
        href: ROUTES.TESTIMONIALS,
        icon: Star,
      },
      {
        title: "Contact",
        href: ROUTES.CONTACT,
        icon: MessageSquare,
      },
      {
        title: "Settings",
        href: ROUTES.SETTINGS,
        icon: Settings,
      },
    ],
  },
] as const;
