import { UserNav } from "./user/UserNav";
import { getAuthSession } from "@/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icons } from "./ui/icons";

export default async function Header() {
  const session = await getAuthSession();
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center px-4 md:px-16 xl:px-32 border-b">
        <nav className="flex items-space space-x-4 lg:space-x-6">
          <Link
            href="/"
            className="font bold text-md font-medium transition-colors text-primary"
          >
            <Icons.vercelFull className="h-20 w-20 md:h-32 md:w-32" />
          </Link>
        </nav>
        <div className="flex items-center space-x-2 ml-auto">
          {/* actions */}
          {session?.user ? (
            <>
              <Button
                variant={"link"}
                className="text-muted-foreground hover:text-primary hover:no-underline"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserNav user={session.user} />
            </>
          ) : (
            <Button>
              <Link className="mr-4" href="/sign-in">
                Get Started
              </Link>
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
