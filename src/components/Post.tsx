import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import { formatCustomDate } from "@/lib/utils";

interface PostProps {
  title: string;
  slug: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

export function Post({ title, slug, createdAt, user }: PostProps) {
  const formattedDate = formatCustomDate(createdAt);

  return (
    <Link className="flex flex-col gap-4" href={`/blog/${slug}`}>
      <h2 className="font-bold text-2xl break-words">{title}</h2>
      <div className="flex justify-start gap-4 items-center">
        <UserAvatar className="w-8 h-8" user={user} />
        <p className="text-gray-500">{formattedDate}</p>
      </div>
    </Link>
  );
}
