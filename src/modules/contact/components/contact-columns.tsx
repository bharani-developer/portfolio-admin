// src/modules/contact/components/contact-columns.tsx

import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ContactActions } from "./contact-actions";
import { ContactPriorityBadge } from "./contact-priority-badge";
import { ContactStatusBadge } from "./contact-status-badge";

import type { IContact } from "../types";

/* -------------------------------------------------------------------------- */
/*                              Contact Columns                               */
/* -------------------------------------------------------------------------- */

export const contactColumns: ColumnDef<IContact>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),

    cell: ({ row }) => {
      const contact = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{contact.name}</span>

          {contact.company ? (
            <span className="text-muted-foreground text-xs">
              {contact.company}
            </span>
          ) : null}
        </div>
      );
    },
  },

  {
    accessorKey: "email",

    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),

    cell: ({ row }) => {
      const contact = row.original;

      return (
        <div className="flex items-center gap-2">
          <Mail className="text-muted-foreground size-4" />

          <span className="max-w-[240px] truncate">{contact.email}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "subject",

    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Subject
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[280px]">{row.original.subject}</span>
    ),
  },

  {
    accessorKey: "priority",

    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <ContactPriorityBadge priority={row.original.priority} />
    ),
  },

  {
    accessorKey: "status",

    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),

    cell: ({ row }) => <ContactStatusBadge status={row.original.status} />,
  },

  {
    accessorKey: "isRead",

    header: "Read",

    cell: ({ row }) => (
      <span
        className={
          row.original.isRead
            ? "font-medium text-emerald-600"
            : "text-muted-foreground"
        }
      >
        {row.original.isRead ? "Read" : "Unread"}
      </span>
    ),
  },

  {
    accessorKey: "isReplied",

    header: "Replied",

    cell: ({ row }) => (
      <span
        className={
          row.original.isReplied
            ? "font-medium text-emerald-600"
            : "text-muted-foreground"
        }
      >
        {row.original.isReplied ? "Replied" : "Pending"}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),

    cell: ({ row }) => {
      const value = row.original.createdAt;

      return (
        <span className="text-muted-foreground">
          {new Date(value).toLocaleDateString()}
        </span>
      );
    },
  },

  {
    id: "actions",

    header: () => <div className="text-right">Actions</div>,

    cell: ({ row }) => (
      <div className="flex justify-end">
        <ContactActions contact={row.original} />
      </div>
    ),

    enableSorting: false,

    enableHiding: false,
  },
];
