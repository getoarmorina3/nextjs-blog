"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { Icons } from "./ui/icons";
import Link from "next/link";
import { Categories } from "@/types";

export function MobileNav({ categories }: { categories: Categories[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`block md:hidden h-6 w-6`}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="h-6 w-6">
          <Icons.hamburgerMenu className="h-6 w-6" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerDescription className="flex flex-col gap-4 ml-2">
              <DrawerTitle className="text-primary text-lg mb-4 font-medium">
                Categories
              </DrawerTitle>
              <Link
                href={"/"}
                className={"text-md font-medium text-primary"}
              >All Posts</Link>
              {categories.map((category: Categories) =>
                category.posts.length >= 1 ? (
                  <Link
                    key={category.id}
                    className={"text-md font-medium text-primary"}
                    href={`/blog/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                ) : null
              )}
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
