import type { ReactElement } from "react";

import { RefreshCw } from "lucide-react";

import { useIsFetching } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

interface ContactToolbarProps {
  onRefresh?: () => void;
}

export function ContactToolbar({
  onRefresh,
}: ContactToolbarProps): ReactElement {
  const isFetching =
    useIsFetching({
      queryKey: QUERY_KEYS.CONTACT.ALL,
    }) > 0;

  return (
    <Card>
      <CardContent className="flex justify-end p-4">
        <Button
          type="button"
          variant="outline"
          disabled={isFetching}
          onClick={onRefresh}
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isFetching
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}

export default ContactToolbar;