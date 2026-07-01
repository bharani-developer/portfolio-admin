// src/modules/contact/components/contact-filters.tsx

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CONTACT_ACTIVE_STATUS,
  CONTACT_PRIORITY,
  CONTACT_READ_STATUS,
  CONTACT_REPLY_STATUS,
  CONTACT_SOURCE,
  CONTACT_STATUS,
  type IContactQueryParams,
  type TContactPriority,
  type TContactSource,
  type TContactStatus,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ContactFiltersProps {
  filters: IContactQueryParams;

  onFiltersChange: (filters: IContactQueryParams) => void;

  isLoading?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Contact Filters                               */
/* -------------------------------------------------------------------------- */

export function ContactFilters({
  filters,
  onFiltersChange,
  isLoading = false,
}: ContactFiltersProps): React.JSX.Element {
  const updateFilter = <K extends keyof IContactQueryParams>(
    key: K,
    value: IContactQueryParams[K] | undefined,
  ): void => {
    const nextFilters: IContactQueryParams = {
      ...filters,
    };

    if (value === undefined) {
      delete nextFilters[key];
    } else {
      nextFilters[key] = value;
    }

    onFiltersChange({
      ...nextFilters,
      page: 1,
    });
  };

  const resetFilters = (): void => {
    const nextFilters: IContactQueryParams = {
      page: 1,
    };

    if (filters.limit !== undefined) {
      nextFilters.limit = filters.limit;
    }

    onFiltersChange(nextFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search */}

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

        <Input
          placeholder="Search contacts..."
          value={filters.searchTerm ?? ""}
          disabled={isLoading}
          className="pl-9"
          onChange={(event) =>
            updateFilter(
              "searchTerm",
              event.target.value.trim() ? event.target.value : undefined,
            )
          }
        />
      </div>

      {/* Filter Grid */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Status */}

        <Select
          value={filters.status ?? "all"}
          onValueChange={(value) =>
            updateFilter(
              "status",
              value === "all" ? undefined : (value as TContactStatus),
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>

            {CONTACT_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority */}

        <Select
          value={filters.priority ?? "all"}
          onValueChange={(value) =>
            updateFilter(
              "priority",
              value === "all" ? undefined : (value as TContactPriority),
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>

            {CONTACT_PRIORITY.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Source */}

        <Select
          value={filters.source ?? "all"}
          onValueChange={(value) =>
            updateFilter(
              "source",
              value === "all" ? undefined : (value as TContactSource),
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Source" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>

            {CONTACT_SOURCE.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Read Status */}

        <Select
          value={
            filters.isRead === undefined
              ? "all"
              : filters.isRead
                ? CONTACT_READ_STATUS[0]
                : CONTACT_READ_STATUS[1]
          }
          onValueChange={(value) => {
            if (value === "all") {
              updateFilter("isRead", undefined);

              return;
            }

            updateFilter("isRead", value === "Read");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Read Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Read Status</SelectItem>

            {CONTACT_READ_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reply Status */}

        <Select
          value={
            filters.isReplied === undefined
              ? "all"
              : filters.isReplied
                ? CONTACT_REPLY_STATUS[0]
                : CONTACT_REPLY_STATUS[1]
          }
          onValueChange={(value) => {
            if (value === "all") {
              updateFilter("isReplied", undefined);

              return;
            }

            updateFilter("isReplied", value === "Replied");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Reply Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Reply Status</SelectItem>

            {CONTACT_REPLY_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Active Status */}

        <Select
          value={
            filters.isActive === undefined
              ? "all"
              : filters.isActive
                ? CONTACT_ACTIVE_STATUS[0]
                : CONTACT_ACTIVE_STATUS[1]
          }
          onValueChange={(value) => {
            if (value === "all") {
              updateFilter("isActive", undefined);

              return;
            }

            updateFilter("isActive", value === "Active");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Active Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Active Status</SelectItem>

            {CONTACT_ACTIVE_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={resetFilters}
        >
          <X className="size-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
