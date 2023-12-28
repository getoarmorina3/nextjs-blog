import { serverTrpc } from "@/trpc/server";
import { PostsNav } from "@/components/blogs/PostsNav";
import { Latest } from "@/components/blogs/Latest";
import Pagination from "@/components/ui/pagination";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/Skeletons";
import { MobileNav } from "@/components/MobileNavDrawer";
import { Search } from "@/components/Search";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const category = await serverTrpc.category.view({ slug });

  return {
    title: category?.name || undefined,
  };
}

const CategoryPage = async ({ params: { slug }, searchParams }: Props) => {
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
        <Latest query={query} currentPage={currentPage} category={slug} />
      </Suspense>
      <div className="mt-16 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CategoryPage;
