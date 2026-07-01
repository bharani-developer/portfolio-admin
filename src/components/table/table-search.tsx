// src\components\table\table-search.tsx

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;

  placeholder?: string;

  disabled?: boolean;
}

export function TableSearch({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
}: TableSearchProps): React.JSX.Element {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pl-9 pr-10"
      />

      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
          onClick={() => onChange("")}
        >
          <X className="size-4" />

          <span className="sr-only">Clear search</span>
        </Button>
      ) : null}
    </div>
  );
}
