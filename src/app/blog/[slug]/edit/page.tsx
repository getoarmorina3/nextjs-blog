import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { serverTrpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Blog",
};

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const data = await serverTrpc.post.view({ slug });
  return (
    <div className="flex flex-col items-center gap-6 mt-4 mb-20">
      <Editor data={data} />

      <div className="flex w-full justify-center">
        <Button type="submit" className="w-1/4" form="post-form">
          Edit Blog
        </Button>
      </div>
    </div>
  );
};

export default page;
