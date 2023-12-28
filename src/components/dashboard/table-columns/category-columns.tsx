"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@prisma/client";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { UpdateCategory } from "./category-actions";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const id = category.id;
      const router = useRouter();

      const { mutate: deleteCategory } = trpc.category.delete.useMutation({
        onError: () => {
          return toast({
            title: "Something went wrong.",
            description:
              "Make sure you don't have any posts in this category before deleting it.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          router.refresh();

          return toast({
            description: "Category has been deleted.",
          });
        },
      });

      return (
        <div className="flex justify-center items-center gap-3">
          <UpdateCategory id={id} />
          <div
            onClick={() => deleteCategory({ id })}
            className="border rounded-lg p-2 transition-colors cursor-pointer hover:bg-muted"
          >
            <Trash2 className="h-5 w-5"></Trash2>
          </div>
        </div>
      );
    },
  },
];
