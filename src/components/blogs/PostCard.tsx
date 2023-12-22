import Link from "next/link";
import { UserAvatar } from "../UserAvatar";
import { formatCustomDate } from "@/lib/utils";

interface PostCardProps {
  title: string;
  slug: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  visitCount: number;
}

export function PostCard({
  title,
  slug,
  createdAt,
  user,
  visitCount,
}: PostCardProps) {
  return (
    <Link
      className="flex flex-col justify-end items-start border p-6 rounded-lg h-80 transition-colors hover:bg-muted"
      href={`/blog/${slug}`}
    >
      <div className="flex flex-col gap-4 w-full">
        <h2 className="font-bold text-2xl break-words">{title}</h2>
        <div className="flex justify-between">
          <div className="flex justify-start gap-4 items-center">
            <UserAvatar className="w-8 h-8" user={user} />
            <p className="text-muted-foreground">
              {formatCustomDate(createdAt)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground font-medium transition-colors">
            {visitCount > 1
              ? `${visitCount} views`
              : visitCount === 1
              ? `${visitCount} view`
              : "No views"}
          </p>
        </div>
      </div>
    </Link>
  );
}
