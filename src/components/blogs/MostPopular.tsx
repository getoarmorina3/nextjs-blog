import { serverTrpc } from "@/trpc/server";
import { PostCard } from "./PostCard";

export async function MostPopular() {
  const popularPosts = await serverTrpc.post.mostPopular();
  return (
    <>
      <h1 id="most-popular" className="text-4xl font-bold my-16">
        Most Popular
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {popularPosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            createdAt={post.createdAt}
            user={post.author}
            visitCount={post.visitCount}
          />
        ))}
      </div>
    </>
  );
}
