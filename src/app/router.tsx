// src\app\router.tsx

import { Navigate, createBrowserRouter } from "react-router-dom";

import { AuthGuard } from "@/guards/auth-guard";
import { GuestGuard } from "@/guards/guest-guard";

import { AuthLayout } from "@/layouts/auth-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";

import { LoginPage } from "@/modules/auth/pages/login.page";
import { DashboardPage } from "@/modules/dashboard/pages/dashboard.page";

import { NotFoundPage } from "@/modules/not-found/pages/not-found.page";

import { ROUTES } from "@/routes/route.constant";
import { HeroPage } from "@/modules/hero/pages/hero.page";
import { AboutPage } from "@/modules/about";
import { SkillsListPage } from "@/modules/skills/pages/skills-list.page";
import { ServicesListPage } from "@/modules/services/pages/services-list.page";
import { ProjectsListPage } from "@/modules/projects/pages/projects-list.page";
import { ExperienceListPage } from "@/modules/experience/pages/experience-list.page";
import { EducationListPage } from "@/modules/education/pages/education-list.page";
import { CertificationsListPage } from "@/modules/certifications/pages/certifications-list.page";
import { TestimonialsListPage } from "@/modules/testimonials/pages/testimonials-list.page";
import ContactsPage from "@/modules/contact/pages/contact-list.page";
import SettingsPage from "@/modules/settings/pages/settings.page";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,

    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },

  /*
   * Guest Routes
   */
  {
    element: <GuestGuard />,

    children: [
      {
        element: <AuthLayout />,

        children: [
          {
            path: ROUTES.LOGIN,

            element: <LoginPage />,
          },
        ],
      },
    ],
  },

  /*
   * Protected Routes
   */
  {
    element: <AuthGuard />,

    children: [
      {
        element: <DashboardLayout />,

        children: [
          {
            path: ROUTES.DASHBOARD,

            element: <DashboardPage />,
          },

          {
            path: ROUTES.HERO,

            element: <HeroPage />,
          },

          {
            path: ROUTES.ABOUT,

            element: <AboutPage />,
          },

          {
            path: ROUTES.SKILLS,

            element: <SkillsListPage />,
          },

          {
            path: ROUTES.SERVICES,

            element: <ServicesListPage />,
          },

          {
            path: ROUTES.PROJECTS,

            element: <ProjectsListPage />,
          },

          {
            path: ROUTES.BLOGS,

            element: <div>Blogs Page</div>,
          },

          {
            path: ROUTES.EXPERIENCE,

            element: <ExperienceListPage />,
          },

          {
            path: ROUTES.EDUCATION,

            element: <EducationListPage />,
          },

          {
            path: ROUTES.CERTIFICATIONS,

            element: <CertificationsListPage />,
          },

          {
            path: ROUTES.TESTIMONIALS,

            element: <TestimonialsListPage />,
          },

          {
            path: ROUTES.CONTACT,

            element: <ContactsPage />,
          },

          {
            path: ROUTES.SETTINGS,

            element: <SettingsPage />,
          },
        ],
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,

    element: <NotFoundPage />,
  },
]);
