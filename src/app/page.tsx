import { PostsNav } from "@/components/blogs/PostsNav";
import { Latest } from "@/components/blogs/Latest";
import { serverTrpc } from "@/trpc/server";
import Pagination from "@/components/ui/pagination";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/Skeletons";
import { MobileNav } from "@/components/MobileNavDrawer";
import { Search } from "@/components/Search";

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
      <Suspense key={query + currentPage} fallback={<PostsSkeleton />}>
        <Latest
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-16 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
