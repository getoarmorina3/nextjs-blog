import EditorOutput from "@/components/EditorOutput";
import { serverTrpc } from "@/trpc/server";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { formatCustomDate, formatTimeToNow } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { UserAvatar } from "@/components/user/UserAvatar";
import { Options } from "@/components/Options";
import CommentsSection from "@/components/comments/CommentSection";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const post = await serverTrpc.post.view({ slug });

  return {
    title: post?.title || undefined,
  };  
}

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await serverTrpc.post.view({ slug });
  const currentSession = await getAuthSession();
  const isBlogOwner = currentSession?.user.id === post?.author.id;

  if (!post) {
    return null;
  } else
    return (
      <>
        <div
          className="absolute h-96 w-full top-[81px] left-0 z-[-1]"
          style={{
            background:
              "linear-gradient(to top,hsl(var(--background)) 0,hsla(0,0%,100%,0) 100%),linear-gradient(90deg,rgb(var(--bg-gradient-from,85 85 85)/.2) 0,rgb(var(--bg-gradient-to,85 85 85)/.2) 100%)",
            backgroundSize: "100% 100%,100% 100%,1440px 1px",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {/* Blog Header */}
        <div className="p-4 md:pt-8 md:p-6">
          <div className="flex justify-between">
            <Link
              href="/"
              className="text-sm text-muted-foreground font-normal transition-colors hover:text-primary flex items-center"
            >
              <ArrowLeft
                className="h-4 w-4"
                style={{
                  marginRight: "0.10rem",
                }}
              />
              Back to Blog
            </Link>
            {isBlogOwner && <Options slug={slug} />}
          </div>
          <div className="w-full md:w-[calc(100%-350px)] mt-8 md:mt-16">
            <div className="flex flex-col gap-4 items-start md:items-center md:flex-row">
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="w-fit font-normal rounded-[32px] py-[6px] px-[12px] text-sm text-primary inline-block"
                style={{
                  background:
                    "linear-gradient(135deg,rgb(var(--gradient-from)) 0,rgb(var(--gradient-to)) 100%)",
                }}
              >
                {post.category.name}
              </Link>
              <p className="font-normal text-sm text-muted-foreground">
                {`${formatCustomDate(
                  "full",
                  new Date(post.createdAt)
                )} - ${formatTimeToNow(new Date(post.createdAt))}`}
              </p>
            </div>
            <h1 className="text-[28px] md:text-5xl font-bold mt-6 md:leading-[1.25] leading-[2.5rem] tracking-[-.049375rem] md:tracking-[-.04em] mb-8 break-words">
              {post.title}
            </h1>
          </div>
        </div>
        {/* Blog Layout */}
        <div className="px-4 md:px-6 flex flex-col-reverse md:grid md:grid-cols-[1fr_340px]">
          <div className="pr-0 md:pr-20 pb-20 pt-8 md:pt-0 border-t md:border-t-0 md:border-r">
            <EditorOutput content={post.content} />
            {/* Comments */}
            <CommentsSection postId={post.id} isBlogOwner={isBlogOwner} />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 px-0 md:px-12 pb-4 md:pb-12 sticky top-28">
              {post.Comment && (
                <Link
                  className="text-muted-foreground hover:text-primary transition-colors"
                  href={`#comments`}
                >
                  <MessageSquare className="h-4 w-4 inline mr-2" />
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
                    name: post.author.name ?? null,
                    image: post.author.image ?? null,
                  }}
                />
                <p className="text-md font-normal">{post.author.name}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default PostPage;
