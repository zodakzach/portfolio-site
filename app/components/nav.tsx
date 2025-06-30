"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes

const navItems: Record<string, { name: string }> = {
  "/": { name: "Home" },
  "/blog": { name: "Blog" },
  "/contact": { name: "Contact" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-background/70 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Avatar on the left */}
        <Link href="/" className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="Avatar" />
            <AvatarFallback>ZC</AvatarFallback>
          </Avatar>
        </Link>

        {/* Nav menu in the middle */}
        <nav className="flex space-x-1">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "hover:bg-muted relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive && "bg-muted text-foreground",
                )}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle on the right */}
        <ModeToggle />
      </div>
    </header>
  );
}
