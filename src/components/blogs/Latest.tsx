import { serverTrpc } from "@/trpc/server";
import { Post } from "@/components/blogs/PostCard";
import { Search } from "../Search";
import { Categories } from "@/types";
import { MobileNav } from "../MobileNavDrawer";

export async function Latest({
  query,
  currentPage,
  category,
  categories,
}: {
  query: string;
  currentPage: number;
  category?: string;
  categories: Categories[];
}) {
  const posts = await serverTrpc.post.fetchFilteredPosts({
    query,
    currentPage,
    category,
  });

  return (
    <>
      <div className="flex flex-col gap-8 mb-8 md:mb-16 justify-center items-center">
        <h1
          id="latest"
          className="text-center text-4xl font-bold mt-8 md:mt-16"
        >
          Latest
        </h1>
        <div className="flex md:justify-center justify-between items-center w-full gap-4 px-4">
          <MobileNav categories={categories} />
          <Search />
        </div>
      </div>
      {posts.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p>{`No results found for "${query}".`}</p>
          <p>Please try again with a different keyword.</p>
        </div>
      ) : (
        <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px sm:block bg-border mt-6"></div>
          <div className="space-y-8 md:space-y-16">
            {posts.map((post) => (
              <Post
                key={post.id}
                slug={post.slug}
                title={post.title}
                createdAt={post.createdAt}
                user={{
                  name: post.author?.name,
                  image: post.author?.image,
                }}
                visitCount={post.visitCount}
                category={post.category}
                content={post.content}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
