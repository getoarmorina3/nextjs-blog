import { ToggleGroupDemo } from "./ThemePreference";
import { Icons } from "./ui/icons";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="border-t">
      <div className="container mx-auto p-8 md:p-16">
        <div className="flex flex-row justify-between gap-8 md:gap-0">
          <div className="flex flex-col items-start gap-20">
            <div className="flex items-center gap-4 ">
              <Icons.vercel className="h-6 w-6" />
              <span className="font-normal text-sm text-muted-foreground">
                © {year}
              </span>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <Link href="/">
                <Icons.gitHub className="h-4 w-4" />
              </Link>
              <Link href="/">
                <Icons.twitter className="h-4 w-4 fill-primary" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[12px]">
            <span className="font-medium text-sm">Preferences</span>
            <ToggleGroupDemo />
          </div>
        </div>
      </div>
    </footer>
  );
}
