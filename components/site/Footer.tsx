import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-sand-100 border-t border-sand-200">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Studio Info */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-terracotta-600">
              Serenity Yoga
            </h3>
            <p className="text-sand-700 text-sm leading-relaxed">
              Find your balance and inner peace through mindful movement and
              breath.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-sage-500 text-cream-50 hover:bg-sage-600 transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-sage-500 text-cream-50 hover:bg-sage-600 transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@serenityyoga.com"
                className="p-2 rounded-full bg-sage-500 text-cream-50 hover:bg-sage-600 transition-colors cursor-pointer"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/schedule"
                  className="text-sand-700 hover:text-terracotta-600 transition-colors text-sm"
                >
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="text-sand-700 hover:text-terracotta-600 transition-colors text-sm"
                >
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sand-700 hover:text-terracotta-600 transition-colors text-sm"
                >
                  Pricing & Passes
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-sand-700 hover:text-terracotta-600 transition-colors text-sm"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-900">Contact</h4>
            <ul className="space-y-2 text-sm text-sand-700">
              <li>123 Peaceful Lane</li>
              <li>Wellness City, WC 12345</li>
              <li className="pt-2">
                <a
                  href="tel:+15551234567"
                  className="hover:text-terracotta-600 transition-colors"
                >
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@serenityyoga.com"
                  className="hover:text-terracotta-600 transition-colors"
                >
                  hello@serenityyoga.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-900">Stay Connected</h4>
            <p className="text-sm text-sand-700">
              Subscribe to receive updates on classes and special offers.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="h-10 text-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="w-full" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sand-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-sand-700">
            © {new Date().getFullYear()} Serenity Yoga. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-sand-700 hover:text-terracotta-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-sand-700 hover:text-terracotta-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
