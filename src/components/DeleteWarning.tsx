"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/trpc/client";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export function DeleteWarning({ slug }: { slug: string }) {
  const router = useRouter();
  const { mutate: deletePost } = trpc.post.delete.useMutation({
    onSuccess: () => {
      router.push("/");
      router.refresh();

      return toast({
        description: "Blog has been deleted.",
      });
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Blog was not deleted. Please try again.",
        variant: "destructive",
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost({ slug })}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
