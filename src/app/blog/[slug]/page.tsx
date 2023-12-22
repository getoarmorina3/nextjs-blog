import EditorOutput from "@/components/EditorOutput";
import { serverTrpc } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";
import { formatCustomDate } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { UserAvatar } from "@/components/user/UserAvatar";
import { Options } from "@/components/Options";
import CommentsSection from "@/components/comments/CommentSection";

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await serverTrpc.post.view({ slug });
  const currentSession = await getAuthSession();
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary flex items-center"
          >
            <ArrowLeft
              className="h-4 w-4"
              style={{
                marginRight: "0.10rem",
              }}
            />
            Back to Blog
          </Link>
          {currentSession?.user.id === post?.author.id && (
            <Options slug={slug} />
          )}
        </div>
        <div className="w-[calc(100%-350px)] mt-16">
          <div className="flex items-center">
            <p className="max-h-40 mt-1 truncate text-md text-muted-foreground">
              {post && formatCustomDate(new Date(post.createdAt))}
            </p>
          </div>
          <h1 className="text-5xl font-bold mt-6 leading-[1.25] mb-8 break-words">
            {post?.title}
          </h1>
        </div>
      </div>
      {/* Article Layout */}
      <div className="px-6 grid grid-cols-[1fr_340px]">
        <div className="pr-20 pb-20 border-r">
          <EditorOutput content={post?.content} />
          <div></div>
          {/* Comments */}
          {post && <CommentsSection postId={post.id} />}
        </div>
        <div className="relative">
          <div className="flex flex-col gap-4 px-12 pb-12 sticky top-8">
            {post?.Comment && (
              <Link
                className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                href={`#comments`}
              >
                {post.Comment.length === 0
                  ? "Be the first to comment"
                  : `${post.Comment.length} ${
                      post.Comment.length === 1 ? "Comment" : "Comments"
                    }`}
              </Link>
            )}
            <p className="text-muted-foreground">Posted by</p>
            <div className="flex items-center gap-2">
              <UserAvatar
                className="w-8 h-8"
                user={{
                  name: post?.author.name ?? null,
                  image: post?.author.image ?? null,
                }}
              />
              <p className="text-md font-normal">{post?.author.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
