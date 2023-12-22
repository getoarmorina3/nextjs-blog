import { getAuthSession } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/dashboard/data-table";
import { postColumns } from "@/components/dashboard/table-columns/blog-columns";
import { serverTrpc } from "@/trpc/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const user = session?.user;

  if (user && user.role === "ADMIN") {
    return <>{children}</>;
  }

  const myPosts = await serverTrpc.post.getUserBlogs({
    id: user?.id as string,
  });

  return (
    <>
      <div className="flex-col md:flex mt-8 border rounded-lg">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex flex-col items-start justify-start space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p>Welcome back here's a list of your published blogs</p>
          </div>
          <Tabs defaultValue="blogs" className="space-y-4">
            <TabsContent value="blogs" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7">
                  <CardHeader>
                    <CardTitle>Your Blogs</CardTitle>
                    <CardDescription>
                      You have published <strong>{myPosts.length} </strong>{" "}
                      blogs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={postColumns} data={myPosts} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
