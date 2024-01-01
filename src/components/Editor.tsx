"use client";

import EditorJS from "@editorjs/editorjs";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { SelectCategory } from "./SelectCategory";
import { uploadFiles } from "@/lib/uploadthing";

interface EditorState {
  title: string;
  content: any;
}

interface EditorProps {
  data?: any; // Optional data for editing
}

export const Editor: React.FC<EditorProps> = ({ data }) => {
  const [editorState, setEditorState] = useState<EditorState>({
    title: data?.title || "",
    content: data?.content || null,
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(data?.categoryId || "");

  const { mutate: savePost } = data
    ? trpc.post.update.useMutation({
        onSuccess: () => {
          router.push("/");
          router.refresh();

          return toast({
            description: "Your blog has been updated.",
          });
        },
        onError: (error) => {
          if (error?.data?.zodError?.fieldErrors) {
            const fieldErrors = error.data.zodError.fieldErrors;
            const errorMessages = Object.values(fieldErrors).flatMap(
              (messages) => messages
            );

            return toast({
              title: "Blog was not updated.",
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
            description: "Your blog could not be updated. Please try again.",
            variant: "destructive",
          });
        },
      }) // Use update mutation for editing
    : trpc.post.create.useMutation({
        onSuccess: () => {
          router.push("/");
          router.refresh();

          return toast({
            description: "Your blog has been published.",
          });
        },
        onError: (error) => {
          if (error?.data?.zodError?.fieldErrors) {
            const fieldErrors = error.data.zodError.fieldErrors;
            const errorMessages = Object.values(fieldErrors).flatMap(
              (messages) => messages
            );

            return toast({
              title: "Blog was not published.",
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
            description: "Your blog could not be published. Please try again.",
            variant: "destructive",
          });
        },
      }); // Use create mutation for creating

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const LinkTool = (await import("@editorjs/link")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: data?.content || { blocks: [] },
        tools: {
          header: Header,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles("imageUploader", {
                    files: [file],
                  });
                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
        },
      });
    }
  }, [data]);

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

    const payload = {
      id: data?.id as string | undefined,
      title: editorState.title,
      content: blocks,
      categoryId: selectedCategoryId,
    };

    // @ts-ignore
    savePost(payload);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex justify-center p-4 rounded-lg">
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
          <div id="editor" className="text-left min-h-[500px]" />
          <div className="flex justify-between items-center">
            <p className="text-sm">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
            <SelectCategory
              onSelectCategory={(categoryId) => {
                setSelectedCategoryId(categoryId);
              }}
              defaultValue={selectedCategoryId}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
