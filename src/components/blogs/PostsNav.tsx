"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Categories } from "@/types";

export function PostsNav({ categories }: { categories: Categories[] }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        className={clsx(
          "relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          {
            "text-primary before:absolute before:content-[''] before:bg-primary before:w-full before:top-[calc(100%+12px)] before:h-[2px]":
              pathname === `/`,
          }
        )}
        href={`/`}
      >
        All Posts
      </Link>
      {categories.map((category: Categories) =>
        category.posts.length >= 1 ? (
          <Link
            key={category.id}
            className={clsx(
              "relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
              {
                "text-primary before:absolute before:content-[''] before:bg-primary before:w-full before:top-[calc(100%+12px)] before:h-[2px]":
                  pathname === `/blog/category/${category.slug}`,
              }
            )}
            href={`/blog/category/${category.slug}`}
          >
            {category.name}
          </Link>
        ) : null
      )}
    </div>
  );
}
