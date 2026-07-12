// src\shared\types\sidebar-item.type.ts

import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}
