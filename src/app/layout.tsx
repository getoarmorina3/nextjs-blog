import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "../components/Providers";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import Footer from "@/components/Footer";

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
      <body>
        <Providers>
          <Header />

          <div className="min-h-screen max-w-[52rem] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 lg:max-w-7xl">
            {children}
          </div>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
