import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acme Blog",
  description: "Blog for Acme Inc.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("antialiased ", inter.className)}>
      <body className="min-h-screen">
        <Providers>
          <Header />

          <div className="container max-w-7xl mx-auto h-full">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
