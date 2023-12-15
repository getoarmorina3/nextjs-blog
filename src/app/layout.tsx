import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import Providers from "../components/Providers";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme Blog",
  description: "Blog for Acme Inc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("antialiased ", GeistSans.className)}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <Providers>
          <Header />

          <div className="container max-w-7xl mx-auto h-full">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
