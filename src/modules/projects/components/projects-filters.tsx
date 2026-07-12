// src/modules/projects/components/projects-filters.tsx

import type { ReactElement } from "react";

import { Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface ProjectsFiltersProps {
  searchTerm: string;

  category: string;

  status: string;

  active: string;

  categories: string[];

  statuses: string[];

  isLoading?: boolean;

  onSearchChange: (value: string) => void;

  onCategoryChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onActiveChange: (value: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Projects Filters                              */
/* -------------------------------------------------------------------------- */

export function ProjectsFilters({
  searchTerm,
  category,
  status,
  active,
  categories,
  statuses,
  isLoading = false,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onActiveChange,
}: ProjectsFiltersProps): ReactElement {
  return (
    <Card
      className="
        border-border/60
        bg-card/70
        backdrop-blur-sm
      "
    >
      <CardContent className="p-6">
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
          "
        >
          {/* Search */}

          <div className="relative flex-1">
            <Search
              className="
                absolute
                left-3
                top-1/2
                size-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={searchTerm}
              disabled={isLoading}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="pl-10"
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          {/* Category */}

          <Select
            value={category || "all"}
            disabled={isLoading}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger
              className="
                w-full
                lg:w-[220px]
              "
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}

          <Select
            value={status || "all"}
            disabled={isLoading}
            onValueChange={onStatusChange}
          >
            <SelectTrigger
              className="
                w-full
                lg:w-[180px]
              "
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>

              {statuses.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Visibility */}

          <Select
            value={active || "all"}
            disabled={isLoading}
            onValueChange={onActiveChange}
          >
            <SelectTrigger
              className="
                w-full
                lg:w-[180px]
              "
            >
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectsFilters;
