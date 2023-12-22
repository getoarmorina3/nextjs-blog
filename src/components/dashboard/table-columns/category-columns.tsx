"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@prisma/client";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  name: string | null;
  slug: string | null;
  posts: Post[];
};

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },
  {
    accessorKey: "slug",
    header: "slug",
    cell: ({ row }) => {
      const slug: string = row.getValue("slug");
      return (
        <Link
          className="underline transition-colors underline-offset-4 hover:text-muted-foreground text-primary"
          href={`/blog/category/${slug}`}
        >
          {slug}
        </Link>
      );
    },
  },
  {
    accessorKey: "posts.length",
    header: "Blogs",
  },
];
