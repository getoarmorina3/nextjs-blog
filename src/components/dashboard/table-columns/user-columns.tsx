"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteUser } from "./actions";

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
      const id = user.id;

      return (
        <div className="flex justify-center gap-3">
          <DeleteUser id={id} />
        </div>
      );
    },
  },
];
