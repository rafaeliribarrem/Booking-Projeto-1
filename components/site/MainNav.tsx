"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = session?.user?.role === "ADMIN";

  const navLinks = [
    { href: "/schedule", label: "Schedule" },
    { href: "/instructors", label: "Instructors" },
    { href: "/pricing", label: "Pricing" },
  ];

  const userLinks = session ? [{ href: "/account", label: "My Account" }] : [];

  const adminLinks =
    isAdmin ? [{ href: "/admin", label: "Admin Dashboard" }] : [];

  const allLinks = [...navLinks, ...userLinks, ...adminLinks];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sand-200 bg-cream-100/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl font-bold text-terracotta-600 hover:text-terracotta-700 transition-colors"
        >
          Serenity Yoga
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-base text-base font-medium transition-all relative",
                pathname.startsWith(link.href) ?
                  "text-terracotta-600"
                : "text-sand-900 hover:text-terracotta-600 hover:bg-sand-50"
              )}
            >
              {link.label}
              {pathname.startsWith(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {status === "loading" ?
            null
          : session ?
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          : <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </>
          }
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-base hover:bg-sand-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ?
            <X className="h-6 w-6 text-sand-900" />
          : <Menu className="h-6 w-6 text-sand-900" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-sand-900/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-[72px] right-0 bottom-0 w-full max-w-sm bg-cream-100 shadow-xl md:hidden z-50 animate-in slide-in-from-right">
            <nav className="flex flex-col p-6 gap-2">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-base text-lg font-medium transition-all min-h-[44px] flex items-center",
                    pathname.startsWith(link.href) ?
                      "bg-terracotta-500 text-cream-50"
                    : "text-sand-900 hover:bg-sand-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-6 pt-6 border-t border-sand-200 flex flex-col gap-3">
                {status === "loading" ?
                  null
                : session ?
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                : <>
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </>
                }
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
