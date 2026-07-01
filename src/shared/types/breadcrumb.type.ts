// src\shared\types\breadcrumb.type.ts

import type { ReactNode } from "react";

export interface IBreadcrumbItem {
  label: string;

  href?: string;

  icon?: ReactNode;

  isCurrentPage?: boolean;
}

export interface IBreadcrumbConfig {
  pathname: string;

  items: IBreadcrumbItem[];
}
