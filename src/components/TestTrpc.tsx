"use client";

import { trpc } from "@/trpc/client";

export default function TrpcTest({ name }: { name: string }) {
  const { data } = trpc.hello.useQuery({ name });
  return (
    <>
      <p>{data?.greeting}</p>
    </>
  );
}
