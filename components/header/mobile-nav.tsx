"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* asChild is still used here so SheetTrigger renders your Button */}
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          {/* Link now directly accepts className and renders an <a> */}
          <Link href="/" className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/avatar.png" alt="Avatar" />
              <AvatarFallback>ZC</AvatarFallback>
            </Avatar>
          </Link>

          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>

        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none space-y-3 text-center">
              {navItems.map((navItem) => (
                <li key={navItem.label}>
                  {/* onClick, target, rel, and className all flow into the <a> */}
                  <Link
                    href={navItem.href}
                    onClick={() => setOpen(false)}
                    target={navItem.target ? "_blank" : undefined}
                    rel={navItem.target ? "noopener noreferrer" : undefined}
                    className="text-lg hover:opacity-50"
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
