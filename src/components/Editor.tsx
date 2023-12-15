"use client";

import EditorJS from "@editorjs/editorjs";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "@/components/ui/use-toast";
import { PostCreationRequest } from "@/lib/validators/post";
import { trpc } from "@/trpc/client";

interface EditorState {
  title: string;
  content: any;
}

export const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    title: "",
    content: null,
  });

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { mutate: createPost } = trpc.post.create.useMutation({
    onSuccess: () => {
      router.push("/");
      router.refresh();

      return toast({
        description: "Your post has been published.",
      });
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          list: List,
          code: Code,
          inlineCode: InlineCode,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const onSubmit = async () => {
    const blocks = await ref.current?.save();

    const payload: PostCreationRequest = {
      title: editorState.title,
      content: blocks,
    };

    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full p-4 rounded-lg border">
      <form
        id="post-form"
        className="w-fit"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              // @ts-ignore
              _titleRef.current = e;
            }}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            value={editorState.title}
            onChange={(e) =>
              setEditorState((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
};
