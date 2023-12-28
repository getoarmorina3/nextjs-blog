import { PostsNav } from "@/components/blogs/PostsNav";
import { Latest } from "@/components/blogs/Latest";
import { serverTrpc } from "@/trpc/server";
import Pagination from "@/components/ui/pagination";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/Skeletons";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await serverTrpc.post.fetchPostsPages({ query });
  const categories = await serverTrpc.category.listAll();
  return (
    <div className="mb-16 md:my-16">
      <PostsNav categories={categories} />
      <Suspense key={query + currentPage} fallback={<PostsSkeleton />}>
        <Latest
          query={query}
          currentPage={currentPage}
          categories={categories}
        />
      </Suspense>
      <div className="mt-16 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
