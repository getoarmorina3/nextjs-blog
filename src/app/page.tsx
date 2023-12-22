import { PostsNav } from "@/components/blogs/PostsNav";
import { MostPopular } from "@/components/blogs/MostPopular";
import { Latest } from "@/components/blogs/Latest";
import { serverTrpc } from "@/trpc/server";

export default async function Home() {
  const categories = await serverTrpc.category.listAll();
  return (
    <main className="container mx-auto mt-16 mb-40">
      <PostsNav categories={categories} />
      <MostPopular />
      <Latest />
    </main>
  );
}
