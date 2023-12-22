import { getAuthSession } from "@/lib/auth";
import { serverTrpc } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function UserNameForm() {
  const session = await getAuthSession();
  const userId = session?.user.id;

  const action = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    try {
      await serverTrpc.user.updateUsername({ name, id: userId as string });
    } catch (error) {
      console.error(error);
    }
    revalidatePath("/");
    redirect("/");
  };

  return (
    <form action={action}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" placeholder="Enter your name" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
