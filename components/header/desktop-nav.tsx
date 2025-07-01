import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map(({ href, label, target }) => {
          const isActive = pathname === href;
          return (
            <NavigationMenuItem key={href}>
              <Link href={href} passHref legacyBehavior>
                <NavigationMenuLink
                  className={cn(
                    "hover:bg-muted rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive && "bg-muted text-foreground",
                  )}
                  target={target ? "_blank" : undefined}
                  rel={target ? "noopener" : undefined}
                >
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
