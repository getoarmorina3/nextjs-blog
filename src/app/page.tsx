import TrpcTest from "@/components/TestTrpc";

export default async function Home() {
  return (
    <main
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <h1 className="text-6xl">Acme Blog</h1>
      <TrpcTest name='Getoar' />
    </main>
  );
}
