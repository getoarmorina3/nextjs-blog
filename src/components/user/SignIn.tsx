import { Icons } from "@/components/ui/icons";
import UserAuthForm from "@/components/user/UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] rounded-lg border py-12 px-8">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.vercel className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
      </div>
      <UserAuthForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <span className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </span>
        .
      </p>
    </div>
  );
};

export default SignIn;
