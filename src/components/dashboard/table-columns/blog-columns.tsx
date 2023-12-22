"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { formatNormalDate } from "@/lib/utils";
import { DeleteWarning } from "@/components/DeleteWarning";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Post = {
  id: string;
  title: string | null;
  author: {
    name: string | null;
  };
  slug: string;
};

export const postColumns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author.name",
    header: "Author",
  },
  {
    accessorKey: "createdAt",
    header: "Published At",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const formattedDate = formatNormalDate(createdAt);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt: Date = row.getValue("updatedAt");
      const formattedDate = formatNormalDate(updatedAt);
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/blog/${post.slug}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              <DeleteWarning slug={post.slug} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
