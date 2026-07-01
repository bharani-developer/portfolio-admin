// src\modules\dashboard\components\recent-contacts-card.tsx

import { Link } from "react-router-dom";

import { ArrowRight, Mail, MailOpen, MessageSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { Skeleton } from "@/components/ui/skeleton";

import type { IDashboardRecentContact } from "../types";

/* -------------------------------------------------------------------------- */
/*                              Date Formatter                                */
/* -------------------------------------------------------------------------- */

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface IRecentContactsCardProps {
  contacts: IDashboardRecentContact[];

  isLoading?: boolean;

  maxItems?: number;
}

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

function getPriorityVariant(
  priority: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (priority.toLowerCase()) {
    case "high":
      return "destructive";

    case "medium":
      return "default";

    case "low":
      return "secondary";

    default:
      return "outline";
  }
}

/* -------------------------------------------------------------------------- */
/*                           Recent Contacts Card                             */
/* -------------------------------------------------------------------------- */

export function RecentContactsCard({
  contacts,
  isLoading = false,
  maxItems = 5,
}: IRecentContactsCardProps): React.JSX.Element {
  const visibleContacts = contacts.slice(0, maxItems);

  return (
    <Card className="h-full">
      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
        "
      >
        <CardTitle
          className="
            flex
            items-center
            gap-2
          "
        >
          <MessageSquare className="size-5" aria-hidden="true" />

          <span>Recent Contacts</span>
        </CardTitle>

        <Link
          to="/contacts"
          aria-label="View all contacts"
          className="
            text-muted-foreground
            hover:text-foreground
            transition-colors
          "
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({
              length: maxItems,
            }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-3 w-2/3" />

                <Skeleton className="h-3 w-1/2" />

                {index < maxItems - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        ) : visibleContacts.length === 0 ? (
          <div
            className="
              text-muted-foreground
              flex
              min-h-40
              flex-col
              items-center
              justify-center
              gap-3
              text-sm
            "
          >
            <MessageSquare className="size-8" aria-hidden="true" />

            <p>No recent contacts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleContacts.map((contact, index) => (
              <div key={contact._id} className="space-y-3">
                <div
                  className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className="
                          flex
                          items-center
                          gap-2
                        "
                    >
                      {contact.isRead ? (
                        <MailOpen
                          className="
                              text-muted-foreground
                              size-4
                            "
                          aria-hidden="true"
                        />
                      ) : (
                        <Mail
                          className="
                              text-primary
                              size-4
                            "
                          aria-hidden="true"
                        />
                      )}

                      <p
                        className="
                            truncate
                            font-medium
                          "
                        title={contact.name}
                      >
                        {contact.name}
                      </p>
                    </div>

                    <p
                      className="
                          text-muted-foreground
                          mt-1
                          truncate
                          text-xs
                        "
                      title={contact.email}
                    >
                      {contact.email}
                    </p>

                    <p
                      className="
                          mt-2
                          truncate
                          text-sm
                        "
                      title={contact.subject}
                    >
                      {contact.subject}
                    </p>
                  </div>

                  <div
                    className="
                        flex
                        flex-col
                        items-end
                        gap-2
                      "
                  >
                    <Badge variant={contact.isRead ? "secondary" : "default"}>
                      {contact.isRead ? "Read" : "Unread"}
                    </Badge>

                    <Badge variant={getPriorityVariant(contact.priority)}>
                      {contact.priority}
                    </Badge>
                  </div>
                </div>

                <div
                  className="
                      text-muted-foreground
                      flex
                      items-center
                      justify-between
                      text-xs
                    "
                >
                  <span>{contact.status}</span>

                  <time dateTime={contact.createdAt}>
                    {dateFormatter.format(new Date(contact.createdAt))}
                  </time>
                </div>

                {index < visibleContacts.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentContactsCard;
