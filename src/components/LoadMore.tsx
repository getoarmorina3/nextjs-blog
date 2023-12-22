"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function LoadMore() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center items-center mt-32">
      <Button disabled={true} variant={"outline"} className="px-24">
        Load More
      </Button>
    </div>
  );
}