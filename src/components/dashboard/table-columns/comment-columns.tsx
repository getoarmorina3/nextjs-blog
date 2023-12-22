"use client";

import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
    header: "Post",
  },
];
