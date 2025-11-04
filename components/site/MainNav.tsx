"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function MainNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-xl">Serenity Yoga</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "px-3 py-2 rounded-md",
                      pathname.startsWith("/schedule") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <Link href="/schedule">Schedule</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "px-3 py-2 rounded-md",
                      pathname.startsWith("/pricing") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <Link href="/pricing">Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {session && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "px-3 py-2 rounded-md",
                        pathname.startsWith("/account") &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link href="/account">Account</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          {status === "loading" ? null : session ? (
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
