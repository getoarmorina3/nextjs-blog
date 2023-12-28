import { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/dashboard/data-table";
import { userColumns } from "@/components/dashboard/table-columns/user-columns";
import { postColumns } from "@/components/dashboard/table-columns/blog-columns";
import { categoryColumns } from "@/components/dashboard/table-columns/category-columns";
import { serverTrpc } from "@/trpc/server";
import { commentColmns } from "@/components/dashboard/table-columns/comment-columns";
import AddCategory from "@/components/dashboard/table-columns/category-actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard to manage your data for the Acme Blog.",
};

export default async function DashboardPage() {
  const posts = await serverTrpc.post.listAll();
  const users = await serverTrpc.user.listAll();
  const categories = await serverTrpc.category.listAll();
  const comments = await serverTrpc.comment.listAll();

  return (
    <>
      <div className="flex-col md:flex my-8 border rounded-lg">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Admin&apos;s Dashboard
            </h2>
          </div>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="blogs" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7 overflow-x-auto border-0">
                  <CardHeader className="pl-2">
                    <CardTitle>Blogs</CardTitle>
                    <CardDescription>
                      There have been <strong>{posts.length} </strong> blogs
                      published.
                    </CardDescription>
                  </CardHeader>
                  <DataTable columns={postColumns} data={posts} />
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7 overflow-x-auto border-0">
                  <CardHeader className="pl-2">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                      There have been <strong>{users.length} </strong>users
                      registered.
                    </CardDescription>
                  </CardHeader>
                  <DataTable columns={userColumns} data={users} />
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7 overflow-x-auto border-0">
                  <CardHeader className="pl-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Blog Categories</CardTitle>
                      <AddCategory />
                    </div>
                    <CardDescription>
                      There have been <strong>{categories.length} </strong>
                      categories registered.
                    </CardDescription>
                  </CardHeader>
                  <DataTable columns={categoryColumns} data={categories} />
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7 overflow-x-auto border-0">
                  <CardHeader className="pl-2">
                    <CardTitle>Blog Comments</CardTitle>
                    <CardDescription>
                      There have been <strong>{comments.length} </strong>
                      comments posted.
                    </CardDescription>
                  </CardHeader>
                  <DataTable columns={commentColmns} data={comments} />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
