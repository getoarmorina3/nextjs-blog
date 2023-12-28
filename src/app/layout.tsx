import type { Metadata } from "next";
import Providers from "../components/Providers";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Blog",
    default: "Acme Blog",
  },
  description: "Next.js Blog Web App built with App Router.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("antialiased ", inter.className)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />

          <div className="min-h-screen max-w-[52rem] mx-auto px-0 md:px-8 xl:px-12 lg:max-w-7xl">
            {children}
          </div>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
