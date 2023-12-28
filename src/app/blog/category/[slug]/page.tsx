import { serverTrpc } from "@/trpc/server";
import { PostsNav } from "@/components/blogs/PostsNav";
import { Latest } from "@/components/blogs/Latest";
import Pagination from "@/components/ui/pagination";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/Skeletons";

const CategoryPage = async ({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const categories = await serverTrpc.category.listAll();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await serverTrpc.post.fetchPostsPages({
    query,
    category: slug,
  });

  return (
    <div className="mb-16 md:my-16">
      <PostsNav categories={categories} />
      <Suspense key={query + currentPage} fallback={<PostsSkeleton />}>
        <Latest
          query={query}
          currentPage={currentPage}
          categories={categories}
          category={slug}
        />
      </Suspense>
      <div className="mt-16 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CategoryPage;
