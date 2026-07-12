// src/modules/testimonials/components/testimonials-filters.tsx

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

import { CLIENT_TYPES, type TClientType } from "../types";

interface TestimonialsFiltersProps {
  searchTerm: string;

  clientType: TClientType | "all";

  status: "all" | "active" | "inactive";

  featured: "all" | "featured" | "not-featured";

  isLoading?: boolean;

  onSearchChange: (value: string) => void;

  onClientTypeChange: (value: TClientType | "all") => void;

  onStatusChange: (value: "all" | "active" | "inactive") => void;

  onFeaturedChange: (value: "all" | "featured" | "not-featured") => void;
}

export function TestimonialsFilters({
  searchTerm,
  clientType,
  status,
  featured,
  isLoading = false,
  onSearchChange,
  onClientTypeChange,
  onStatusChange,
  onFeaturedChange,
}: TestimonialsFiltersProps): ReactElement {
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
            xl:flex-row
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
              placeholder="Search testimonials..."
              className="pl-10"
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <Select
            value={clientType}
            disabled={isLoading}
            onValueChange={(value) =>
              onClientTypeChange(value as TClientType | "all")
            }
          >
            <SelectTrigger className="w-full xl:w-[220px]">
              <SelectValue placeholder="Client Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>

              {CLIENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
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
            <SelectTrigger className="w-full xl:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={featured}
            disabled={isLoading}
            onValueChange={(value) =>
              onFeaturedChange(value as "all" | "featured" | "not-featured")
            }
          >
            <SelectTrigger className="w-full xl:w-[180px]">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>

              <SelectItem value="featured">Featured</SelectItem>

              <SelectItem value="not-featured">Not Featured</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialsFilters;
