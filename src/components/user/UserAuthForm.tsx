"use client";

import { cn } from "../../lib/utils";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Icons } from "../ui/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: `There was an error logging in with google`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex  flex-col justify-center gap-4", className)}
      {...props}
    >
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
