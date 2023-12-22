import { serverTrpc } from "@/trpc/server";
import { Post } from "@/components/blogs/Post";
import { PostsNav } from "@/components/blogs/PostsNav";

const CategoryPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const category = await serverTrpc.category.view({ slug });
  const categories = await serverTrpc.category.listAll();
  return (
    <main className="container mx-auto my-16">
      <PostsNav categories={categories} />
      <h1 className="text-4xl font-bold my-16">{category?.name}</h1>
      <div className="grid grid-cols-2 gap-16 mt-8">
        {category &&
          category.posts.map((post) => (
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
              category={category}
            />
          ))}
      </div>
    </main>
  );
};

export default CategoryPage;
