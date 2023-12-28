"use client";

import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
};

export const userColumns: ColumnDef<User>[] = [

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      const { mutate: deleteUser } = trpc.user.delete.useMutation({
        onError: () => {
          return toast({
            title: "Something went wrong.",
            description: "User could not be deleted. Please try again.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          router.refresh();
    
          return toast({
            description: "User has been deleted.",
          });
        },
      })

      const id = user.id;

      return (
        <div className="flex justify-center gap-3">
          <div
            onClick={() => deleteUser({id})}
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
