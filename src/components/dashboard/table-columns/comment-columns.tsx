"use client";

import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Comment = {
  id: string;
  name: string;
  email: string | null;
  text: string;
  createdAt: Date;
  postId: string;
  post: Post;
};

export const commentColmns: ColumnDef<Comment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "post.title",
    header: "Blog",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const { mutate: deleteComment } = trpc.comment.delete.useMutation({
        onError: () => {
          return toast({
            title: "Something went wrong.",
            description: "Comment could not be deleted. Please try again.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          router.refresh();
    
          return toast({
            description: "Comment has been deleted.",
          });
        },
      })

      const id = user.id;

      return (
        <div className="flex justify-center gap-3">
          <div
            onClick={() => deleteComment({id})}
            className="border rounded-lg p-2 transition-colors cursor-pointer hover:bg-muted"
          >
            <Trash2 className="h-5 w-5">
            </Trash2>
          </div>
        </div>
      );
    },
  },
];
