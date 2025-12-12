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
    <footer className="relative mt-12">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div
          className="absolute top-0 -left-10 h-48 w-48 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, var(--glow-1), transparent 60%)",
          }}
        />
        <div
          className="absolute top-10 right-0 h-48 w-48 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, var(--glow-2), transparent 60%)",
          }}
        />
      </div>
      <div className="border-border/60 bg-card/80 text-foreground relative border-t px-4 py-10 backdrop-blur-xl lg:px-8">
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
