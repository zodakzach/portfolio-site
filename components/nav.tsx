"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./theme-toggle";
import MobileNav from "./header/mobile-nav";
import DesktopNav from "./header/desktop-nav";

const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "Projects",
    href: "/projects",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "Contact",
    href: "/contact",
    target: false,
  },
];

export function Navbar() {
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

        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={navItems} />
          <ModeToggle />
        </div>

        <div className="flex items-center xl:hidden">
          <ModeToggle />
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
