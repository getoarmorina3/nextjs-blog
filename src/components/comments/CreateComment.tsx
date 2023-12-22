"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import { Input } from "../ui/input";

interface CreateCommentProps {
  postId: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId }) => {
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const { mutate: comment, isLoading } = trpc.comment.create.useMutation({
    onError: (error) => {
      if (error?.data?.zodError?.fieldErrors) {
        return toast({
          title: "Comment was not posted.",
          description: `${JSON.stringify(error?.data?.zodError?.fieldErrors)}`,
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong.",
        description: "Your comment could not be posted. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setText("");
      setName("");
      setEmail("");

      return toast({
        description: "Your comment has been posted.",
      });
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="name">Your name</Label>
      <div className="my-2">
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What is your name?"
          required
        />
      </div>
      <Label htmlFor="email">Your email</Label>
      <div className="my-2">
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type here your email (optional)"
        />
      </div>
      <Label htmlFor="comment">Your comment</Label>
      <div className="my-2">
        <Textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={text.length === 0}
            onClick={() => comment({ postId, text, email, name })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
