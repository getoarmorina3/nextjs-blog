import { serverTrpc } from "@/trpc/server";
import { Post } from "@/components/Post";

export default async function Home() {
  const posts = await serverTrpc.post.listAll();

  return (
    <main className="container mx-auto mt-12">
      <h1 className="text-4xl font-bold mb-8">Latest</h1>
      <div className="grid grid-cols-2 gap-16">
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
          />
        ))}
      </div>
    </main>
  );
}
