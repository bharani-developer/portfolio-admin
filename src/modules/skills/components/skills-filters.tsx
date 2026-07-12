// src/modules/skills/components/skills-filters.tsx

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

import { SKILL_CATEGORIES } from "../types";

import type { TSkillCategory } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SkillsFiltersProps {
  searchTerm: string;

  category: TSkillCategory | "all";

  status: "all" | "active" | "inactive";

  isLoading?: boolean;

  onSearchChange: (value: string) => void;

  onCategoryChange: (value: TSkillCategory | "all") => void;

  onStatusChange: (value: "all" | "active" | "inactive") => void;
}

/* -------------------------------------------------------------------------- */
/*                              Skills Filters                                */
/* -------------------------------------------------------------------------- */

export function SkillsFilters({
  searchTerm,
  category,
  status,
  isLoading = false,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: SkillsFiltersProps): ReactElement {
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
              placeholder="Search skills..."
              className="pl-10"
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <Select
            value={category}
            disabled={isLoading}
            onValueChange={(value) =>
              onCategoryChange(value as TSkillCategory | "all")
            }
          >
            <SelectTrigger className="w-full lg:w-[220px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              {SKILL_CATEGORIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) =>
              onStatusChange(value as "all" | "active" | "inactive")
            }
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default SkillsFilters;
