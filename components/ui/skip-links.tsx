"use client";

import { focusManagement } from "@/lib/utils/accessibility";

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
}

const defaultLinks: SkipLink[] = [
  { href: "#main-content", label: "Skip to main content" },
  { href: "#main-navigation", label: "Skip to navigation" },
  { href: "#footer", label: "Skip to footer" },
];

/**
 * Skip links component for keyboard navigation accessibility
 */
export function SkipLinks({ links = defaultLinks }: SkipLinksProps) {
  return (
    <div className="sr-only focus-within:not-sr-only">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={focusManagement.skipLink}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

/**
 * Main content wrapper with skip target
 */
interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main id="main-content" className={className} tabIndex={-1}>
      {children}
    </main>
  );
}

/**
 * Navigation wrapper with skip target
 */
interface NavigationProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Navigation({
  children,
  className,
  ariaLabel = "Main navigation",
}: NavigationProps) {
  return (
    <nav
      id="main-navigation"
      className={className}
      aria-label={ariaLabel}
      role="navigation"
    >
      {children}
    </nav>
  );
}

/**
 * Footer wrapper with skip target
 */
interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Footer({ children, className }: FooterProps) {
  return (
    <footer id="footer" className={className} role="contentinfo">
      {children}
    </footer>
  );
}
