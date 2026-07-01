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

interface ExperienceFiltersProps {
  searchTerm: string;

  employmentType: string;

  workMode: string;

  status: string;

  isLoading?: boolean;

  employmentTypes: string[];

  workModes: string[];

  onSearchChange: (
    value: string,
  ) => void;

  onEmploymentTypeChange: (
    value: string,
  ) => void;

  onWorkModeChange: (
    value: string,
  ) => void;

  onStatusChange: (
    value: string,
  ) => void;
}

export function ExperienceFilters({
  searchTerm,
  employmentType,
  workMode,
  status,
  isLoading = false,
  employmentTypes,
  workModes,
  onSearchChange,
  onEmploymentTypeChange,
  onWorkModeChange,
  onStatusChange,
}: ExperienceFiltersProps): ReactElement {
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
              placeholder="Search experiences..."
              className="pl-10"
              onChange={(event) =>
                onSearchChange(
                  event.target.value,
                )
              }
            />
          </div>

          <Select
            value={employmentType}
            disabled={isLoading}
            onValueChange={
              onEmploymentTypeChange
            }
          >
            <SelectTrigger className="w-full xl:w-[220px]">
              <SelectValue placeholder="Employment" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Employment
              </SelectItem>

              {employmentTypes.map(
                (item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Select
            value={workMode}
            disabled={isLoading}
            onValueChange={
              onWorkModeChange
            }
          >
            <SelectTrigger className="w-full xl:w-[180px]">
              <SelectValue placeholder="Work Mode" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Modes
              </SelectItem>

              {workModes.map(
                (item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Select
            value={status}
            disabled={isLoading}
            onValueChange={
              onStatusChange
            }
          >
            <SelectTrigger className="w-full xl:w-[180px]">
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

export default ExperienceFilters;