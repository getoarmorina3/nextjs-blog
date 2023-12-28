"use client";

import { trpc } from "@/trpc/client";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

export default function DeleteComment({ id }: { id: string }) {
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
  });
  return (
    <div
      className="hover:bg-muted border rounded-lg p-2 cursor-pointer transition-colors"
      onClick={() => deleteComment({id})}
    >
      <Trash2Icon className="h-5 w-5" />
    </div>
  );
}
