import { useState, type ReactElement } from "react";

import {
  Check,
  Loader2,
  MailCheck,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useConfirmation } from "@/shared/hooks/use-confirmation";

import {
  useDeleteContact,
  useMarkContactRead,
  useMarkContactReplied,
} from "../hooks";

import type { IContact } from "../types";

interface ContactActionsProps {
  contact: IContact;
}

export function ContactActions({
  contact,
}: ContactActionsProps): ReactElement {
  const confirmation = useConfirmation();

  const markReadMutation = useMarkContactRead();

  const markRepliedMutation =
    useMarkContactReplied();

  const deleteMutation =
    useDeleteContact();

  const [loading, setLoading] =
    useState(false);

  const handleMarkRead =
    async (): Promise<void> => {
      if (contact.isRead) {
        return;
      }

      setLoading(true);

      try {
        await markReadMutation.mutateAsync({
          id: contact._id,
        });
      } finally {
        setLoading(false);
      }
    };

  const handleMarkReplied =
    async (): Promise<void> => {
      if (contact.isReplied) {
        return;
      }

      setLoading(true);

      try {
        await markRepliedMutation.mutateAsync({
          id: contact._id,
        });
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (): Promise<void> => {
      const confirmed =
        await confirmation.confirm({
          title: "Delete Contact",

          description:
            "This action cannot be undone.",

          confirmText: "Delete",

          destructive: true,
        });

      if (!confirmed) {
        return;
      }

      setLoading(true);

      try {
        await deleteMutation.mutateAsync({
          id: contact._id,
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex items-center gap-2">
      {!contact.isRead && (
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={loading}
          onClick={() => {
            void handleMarkRead();
          }}
        >
          {markReadMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MailCheck className="size-4" />
          )}
        </Button>
      )}

      {!contact.isReplied && (
        <Button
          type="button"
          size="icon"
          variant="secondary"
          disabled={loading}
          onClick={() => {
            void handleMarkReplied();
          }}
        >
          {markRepliedMutation.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Check className="size-4" />
          )}
        </Button>
      )}

      <Button
        type="button"
        size="icon"
        variant="destructive"
        disabled={loading}
        onClick={() => {
          void handleDelete();
        }}
      >
        {deleteMutation.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </Button>
    </div>
  );
}

export default ContactActions;