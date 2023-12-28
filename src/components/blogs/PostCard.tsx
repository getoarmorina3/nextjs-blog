import Link from "next/link";
import { UserAvatar } from "../user/UserAvatar";
import { formatCustomDate } from "@/lib/utils";
import { PostProps } from "@/types";
import { Icons } from "../ui/icons";

export function Post({
  title,
  slug,
  createdAt,
  user,
  visitCount,
  category,
  content,
}: PostProps) {
  const firstParagraph = content.blocks.find(
    (block: any) => block.type === "paragraph"
  )?.data.text;

  return (
    <div className="relative">
      <div className="flex flex-col gap-2 p-6 rounded-lg hover:bg-card">
        <Icons.circle />
        <dl className="hidden md:block absolute left-0 top-6 text-muted-foreground lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
          <dt className="sr-only">Date</dt>
          <dd className="whitespace-nowrap text-sm leading-6">
            <time dateTime={createdAt.toString()}>
              {formatCustomDate("full", createdAt)}
            </time>
          </dd>
        </dl>
        <Link
          className="w-fit text-muted-foreground transition-colors hover:text-primary text-sm"
          href={`/blog/category/${category.slug}`}
        >
          {category.name}
        </Link>
        <div className="flex flex-col gap-4">
          <Link className="flex flex-col gap-4" href={`/blog/${slug}`}>
            <h2 className="font-bold text-[1.25rem] leading-[1.5rem] tracking-tight md:text-2xl break-words">
              {title}
            </h2>
            <p className="text-muted-foreground line-clamp-2">
              {firstParagraph}
            </p>
            <div className="flex gap-4 md:gap-0 flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex justify-start gap-4 items-center">
                <UserAvatar className="w-8 h-8" user={user} />
                <p className="hidden md:block text-muted-foreground">
                  {user.name}
                </p>
                <p className="block md:hidden text-muted-foreground">
                  {formatCustomDate("cropped", createdAt)}
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
          </Link>
        </div>
      </div>
    </div>
  );
}
