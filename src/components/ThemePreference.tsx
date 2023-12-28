"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";
import { Icons } from "./ui/icons";

export function ToggleGroupDemo() {
  const { setTheme } = useTheme();
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem
        className="rounded-full hover:bg-transparent text-muted-foreground hover:text-primary"
        onClick={() => setTheme("dark")}
        value="dark"
        aria-label="Toggle dark"
        
      >
        <Icons.moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="rounded-full hover:bg-transparent text-muted-foreground hover:text-primary"
        onClick={() => setTheme("light")}
        value="light"
        aria-label="Toggle light"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="rounded-full hover:bg-transparent text-muted-foreground hover:text-primary"
        onClick={() => setTheme("system")}
        value="system"
        aria-label="Toggle system"
      >
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
