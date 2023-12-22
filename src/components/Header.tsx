import { UserNav } from "./UserNav";
import { getAuthSession } from "@/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Icons } from "./ui/icons";

export default async function Header() {
  const session = await getAuthSession();
  return (
    <div className="border-b">
      <div className="flex h-20 items-center px-12">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/"
            className="font bold text-md font-medium transition-colors text-primary"
          >
            <Icons.logo className="mr-4 w-8 h-8 inline" />
            <span>Home</span>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {/* actions */}
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (
            <Button>
              <Link className="mr-4" href="/sign-in">
                Get Started
              </Link>
              <Icons.rightArrow />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
