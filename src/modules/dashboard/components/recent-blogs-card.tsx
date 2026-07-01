// src\modules\dashboard\components\recent-contacts-card.tsx

import { Link } from "react-router-dom";

import { ArrowRight, Eye, FileText, FilePenLine, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { Skeleton } from "@/components/ui/skeleton";

import type { IDashboardRecentBlog } from "../types";

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

export interface IRecentBlogsCardProps {
  blogs: IDashboardRecentBlog[];

  isLoading?: boolean;

  maxItems?: number;
}

/* -------------------------------------------------------------------------- */
/*                           Recent Blogs Card                                */
/* -------------------------------------------------------------------------- */

export function RecentBlogsCard({
  blogs,
  isLoading = false,
  maxItems = 5,
}: IRecentBlogsCardProps): React.JSX.Element {
  const visibleBlogs = blogs.slice(0, maxItems);

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
          <FileText className="size-5" aria-hidden="true" />

          <span>Recent Blogs</span>
        </CardTitle>

        <Link
          to="/blogs"
          aria-label="View all blogs"
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

                <Skeleton className="h-3 w-24" />

                {index < maxItems - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        ) : visibleBlogs.length === 0 ? (
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
            <FilePenLine className="size-8" aria-hidden="true" />

            <p>No recent blogs found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleBlogs.map((blog, index) => (
              <div key={blog._id} className="space-y-3">
                <div
                  className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className="
                          truncate
                          font-medium
                        "
                      title={blog.title}
                    >
                      {blog.title}
                    </p>

                    <p
                      className="
                          text-muted-foreground
                          mt-1
                          text-xs
                        "
                    >
                      {blog.category}
                    </p>
                  </div>

                  <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-end
                        gap-2
                      "
                  >
                    {blog.isPublished ? (
                      <Badge variant="default" className="gap-1">
                        <Eye className="size-3" aria-hidden="true" />
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}

                    {blog.isFeatured ? (
                      <Badge variant="secondary" className="gap-1">
                        <Star className="size-3" aria-hidden="true" />
                        Featured
                      </Badge>
                    ) : null}
                  </div>
                </div>

                <time
                  dateTime={blog.createdAt}
                  className="
                      text-muted-foreground
                      block
                      text-xs
                    "
                >
                  {dateFormatter.format(new Date(blog.createdAt))}
                </time>

                {index < visibleBlogs.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentBlogsCard;
