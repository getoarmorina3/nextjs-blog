import Link from "next/link";
import { UserAvatar } from "../UserAvatar";
import { formatCustomDate } from "@/lib/utils";

interface PostCardProps {
  title: string;
  slug: string;
  content: any;
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
  content,
  createdAt,
  user,
  visitCount,
}: PostCardProps) {
  const imageUrl = content.blocks.find(
    (block: { type: string }) => block.type === "image"
  )?.data.file.url;
  return (
    <Link href={`/blog/${slug}`} className="border rounded-lg">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="h-80 hover:bg-muted bg-contain bg-center rounded-t-lg"
      ></div>
      <div className="flex flex-col gap-4 w-full p-6">
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
