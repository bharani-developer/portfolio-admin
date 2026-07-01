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

interface ServicesFiltersProps {
  searchTerm: string;

  status: "all" | "active" | "inactive";

  isLoading?: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (
    value: "all" | "active" | "inactive",
  ) => void;
}

export function ServicesFilters({
  searchTerm,
  status,
  isLoading = false,
  onSearchChange,
  onStatusChange,
}: ServicesFiltersProps): ReactElement {
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
              placeholder="Search services..."
              className="pl-10"
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
            />
          </div>

          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) =>
              onStatusChange(
                value as
                  | "all"
                  | "active"
                  | "inactive",
              )
            }
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Status
              </SelectItem>

              <SelectItem value="active">
                Active
              </SelectItem>

              <SelectItem value="inactive">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServicesFilters;