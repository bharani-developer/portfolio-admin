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

interface CertificationsFiltersProps {
  searchTerm: string;

  status: "all" | "active" | "inactive";

  issuer: string;

  issuers: string[];

  isLoading?: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: "all" | "active" | "inactive") => void;

  onIssuerChange: (value: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                         Certifications Filters                             */
/* -------------------------------------------------------------------------- */

export function CertificationsFilters({
  searchTerm,
  status,
  issuer,
  issuers,
  isLoading = false,
  onSearchChange,
  onStatusChange,
  onIssuerChange,
}: CertificationsFiltersProps): ReactElement {
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
              placeholder="Search certifications..."
              className="pl-10"
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <Select
            value={issuer}
            disabled={isLoading}
            onValueChange={onIssuerChange}
          >
            <SelectTrigger className="w-full xl:w-[240px]">
              <SelectValue placeholder="Issuer" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Issuers</SelectItem>

              {issuers.map((issuerItem) => (
                <SelectItem key={issuerItem} value={issuerItem}>
                  {issuerItem}
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
        </div>
      </CardContent>
    </Card>
  );
}

export default CertificationsFilters;
