import { PostsNav } from "@/components/blogs/PostsNav";
import { serverTrpc } from "@/trpc/server";
import { getAuthSession } from "@/lib/auth";
import { PostCard } from "@/components/blogs/PostCard";

export default async function Home() {
  const session = await getAuthSession();
  const userId = session?.user.id;
  const categories = await serverTrpc.category.listAll();
  const getUserBlogs = await serverTrpc.post.getUserBlogs({
    id: userId as string,
  });

  return (
    <main className="container mx-auto mt-16 mb-40">
      <PostsNav categories={categories} />
      <h1 id="my-blogs" className="text-4xl font-bold my-16">
        My Blogs
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {getUserBlogs.map((post) => (
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
    </main>
  );
}
