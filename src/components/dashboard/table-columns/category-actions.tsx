"use client";

import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Plus } from "lucide-react";

export default function AddCategory() {
  const router = useRouter();
  const [name, setName] = useState("");

  const { mutate: addCategory } = trpc.category.create.useMutation({
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Category could not be created. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();

      return toast({
        description: "Category has been created.",
      });
    },
  });

  return (
    <div className="flex justify-center items-center gap-3">
      <Dialog>
        <DialogTrigger className="flex items-center border px-4 py-2 rounded-lg hover:bg-muted">
          Create Category
          <Plus className="ml-4 h-5 w-5"></Plus>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Create a new category for your blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="type category name..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                type="submit"
                variant={"outline"}
                onClick={() => addCategory({ name })}
              >
                Add Category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function UpdateCategory({ id }: { id: string }) {
  const router = useRouter();
  const [name, setName] = useState("");

  const { data } = trpc.category.getCategoryName.useQuery({ id });
  useEffect(() => {
    if (data && data.name) {
      setName(data.name);
    }
  }, [data]);

  const { mutate: updateCategory } = trpc.category.update.useMutation({
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Category could not be updated. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();

      return toast({
        description: "Category has been updated.",
      });
    },
  });

  return (
    <div className="flex justify-center items-center gap-3">
      <Dialog>
        <DialogTrigger className="flex items-center border p-2 rounded-lg hover:bg-muted">
          <Edit2 className="h-5 w-5"></Edit2>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription>
              Update the category name for your blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="type category name..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                variant={"outline"}
                onClick={() => updateCategory({ name, id })}
              >
                Update Category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
