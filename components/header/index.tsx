"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme-toggle";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { IoLogoGithub } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

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

export default function Header() {
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

        <div className="hidden items-center justify-between gap-7 xl:flex">
          <DesktopNav navItems={navItems} />
          <div className="flex h-6 items-center space-x-1">
            <Link
              href="https://github.com/zodakzach"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-muted rounded p-2 transition"
              aria-label="View my GitHub"
            >
              <IoLogoGithub size={18} />
            </Link>

            <Separator orientation="vertical" className="border-1" />

            <ModeToggle />
          </div>
        </div>

        <div className="flex items-center xl:hidden">
          {/* GitHub Link */}
          <Link
            href="https://github.com/zodakzach"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-muted rounded p-2 transition"
            aria-label="View my GitHub"
          >
            <IoLogoGithub size={18} />
          </Link>
          <ModeToggle />
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
