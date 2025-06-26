"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

const navItems: Record<string, { name: string }> = {
  "/": { name: "home" },
  "/blog": { name: "blog" },
  "https://vercel.com/templates/next.js/portfolio-starter-kit": {
    name: "deploy",
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 -ml-[8px] tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          id="nav"
          className="fade /* center links + toggle vertically */ /* consistent gap */ /* let dropdown overflow instead of clipping */ relative flex h-20 flex-row items-center space-x-4 overflow-visible pr-10"
        >
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="m-1 flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              {name}
            </Link>
          ))}

          <div className="relative flex-shrink-0">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </aside>
  );
}
