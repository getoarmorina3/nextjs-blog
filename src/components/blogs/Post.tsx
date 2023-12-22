import Link from "next/link";
import { UserAvatar } from "../user/UserAvatar";
import { formatCustomDate } from "@/lib/utils";
import { PostProps } from "@/types";

export function Post({
  title,
  slug,
  createdAt,
  user,
  visitCount,
  category,
}: PostProps) {
  const formattedDate = formatCustomDate(createdAt);

  return (
    <div className="flex flex-col gap-2">
      <Link
        className="text-muted-foreground transition-colors hover:text-primary text-sm"
        href={`/blog/category/${category.slug}`}
      >
        {category.name}
      </Link>
      <div className="flex flex-col gap-4">
        <Link className="flex flex-col gap-4" href={`/blog/${slug}`}>
          <h2 className="font-bold text-2xl break-words">{title}</h2>
          <div className="flex justify-between">
            <div className="flex justify-start gap-4 items-center">
              <UserAvatar className="w-8 h-8" user={user} />
              <p className="text-muted-foreground">{formattedDate}</p>
            </div>
            <p className="text-sm text-muted-foreground font-medium transition-colors">
              {visitCount > 1
                ? `${visitCount} views`
                : visitCount === 1
                ? `${visitCount} view`
                : "No views"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
