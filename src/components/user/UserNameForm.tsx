import { serverTrpc } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/user/SubmitButton";

export async function UserNameForm() {
  const action = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    try {
      await serverTrpc.user.updateUsername({ name });
    } catch (error) {
      console.error(error);
    }
    revalidatePath("/");
    redirect("/");
  };

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center"></div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your username"
              className="w-fit md:w-[400px]"
              size={32}
              required
              minLength={3}
              maxLength={32}
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton>Change name</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
