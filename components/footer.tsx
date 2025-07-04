import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navItems = [
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

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer>
      <div className="dark:bg-background py-5 xl:py-5 dark:text-gray-300">
        <Link className="mx-auto block w-8" href="/" aria-label="Home page">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="Avatar" />
            <AvatarFallback>ZC</AvatarFallback>
          </Avatar>
        </Link>
        <div className="text-primary mt-8 flex flex-wrap items-center justify-center gap-7">
          {navItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className="hover:text-foreground/80 text-foreground/60 text-sm transition-colors"
            >
              {navItem.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col justify-center gap-6 border-t pt-8 text-center text-xs lg:mt-5 lg:flex-row">
          <p className="text-foreground/60">
            &copy; {getCurrentYear()} Built by{" "}
            <Link
              href="https://github.com/zodakzach"
              target="_blank"
              rel="noopener"
            >
              ZodakZach
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
