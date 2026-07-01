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

interface EducationFiltersProps {
  searchTerm: string;

  educationLevel: string;

  isCurrent: string;

  isActive: string;

  educationLevels: string[];

  isLoading?: boolean;

  onSearchChange: (value: string) => void;

  onEducationLevelChange: (value: string) => void;

  onIsCurrentChange: (value: string) => void;

  onIsActiveChange: (value: string) => void;
}

export function EducationFilters({
  searchTerm,
  educationLevel,
  isCurrent,
  isActive,
  educationLevels,
  isLoading = false,
  onSearchChange,
  onEducationLevelChange,
  onIsCurrentChange,
  onIsActiveChange,
}: EducationFiltersProps): ReactElement {
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
              placeholder="Search education..."
              className="pl-10"
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <Select
            value={educationLevel}
            disabled={isLoading}
            onValueChange={onEducationLevelChange}
          >
            <SelectTrigger className="w-full xl:w-[220px]">
              <SelectValue placeholder="Education Level" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>

              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={isCurrent}
            disabled={isLoading}
            onValueChange={onIsCurrentChange}
          >
            <SelectTrigger className="w-full xl:w-[180px]">
              <SelectValue placeholder="Current" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>

              <SelectItem value="true">Current</SelectItem>

              <SelectItem value="false">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={isActive}
            disabled={isLoading}
            onValueChange={onIsActiveChange}
          >
            <SelectTrigger className="w-full xl:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="true">Active</SelectItem>

              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default EducationFilters;
