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
        const fieldErrors = error.data.zodError.fieldErrors;
        const errorMessages = Object.values(fieldErrors).flatMap(
          (messages) => messages
        );

        return toast({
          title: "Comment was not posted.",
          description: (
            <ul>
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          ),
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
      <div className="flex just my-2 items-center gap-8">
        <div className="w-full">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What is your name?"
            required
            className="focus-visible:ring-offset-0 focus-visible:ring-muted my-2"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="email">Your email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here your email (optional)"
            className="focus-visible:ring-offset-0 focus-visible:ring-muted my-2"
          />
        </div>
      </div>
      <Label htmlFor="comment">Your comment</Label>
      <div className="my-2">
        <Textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="What are your thoughts?"
          className="focus-visible:ring-offset-0 focus-visible:ring-muted resize-none"
        />

        <div className="mt-4 flex justify-end">
          <Button
            variant={"outline"}
            isLoading={isLoading}
            onClick={() => comment({ postId, text, email, name })}
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
