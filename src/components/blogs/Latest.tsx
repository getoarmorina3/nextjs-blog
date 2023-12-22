import { serverTrpc } from "@/trpc/server";
import { Post } from "@/components/blogs/Post";

export async function Latest() {
  const posts = await serverTrpc.post.listAll();

  return (
    <>
      <h1 id="latest" className="text-4xl font-bold my-16">
        Latest
      </h1>
      <div className="grid grid-cols-2 gap-16 mt-8">
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
          />
        ))}
      </div>
    </>
  );
}
