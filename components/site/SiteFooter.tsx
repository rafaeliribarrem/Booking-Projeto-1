"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Thank you for subscribing!");
    setEmail("");
    setIsSubmitting(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <footer className="bg-sand-50 border-t border-sand-200">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-terracotta-600">
              Serenity Yoga
            </h3>
            <p className="text-sand-700 leading-relaxed">
              Find your inner peace through mindful movement and breath. Join
              our welcoming community of practitioners.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-100 hover:bg-sage-200 flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-sage-700 group-hover:text-sage-800" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-100 hover:bg-sage-200 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-sage-700 group-hover:text-sage-800" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-100 hover:bg-sage-200 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-sage-700 group-hover:text-sage-800" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-900 text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/schedule"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                Class Schedule
              </Link>
              <Link
                href="/instructors"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                Our Instructors
              </Link>
              <Link
                href="/pricing"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                Pricing & Passes
              </Link>
              <Link
                href="/account"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                My Account
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-900 text-lg">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sage-600 mt-0.5 shrink-0" />
                <div className="text-sand-700">
                  <p>123 Peaceful Lane</p>
                  <p>Wellness District</p>
                  <p>San Francisco, CA 94102</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sage-600 shrink-0" />
                <a
                  href="tel:+14155551234"
                  className="text-sand-700 hover:text-terracotta-600 transition-colors"
                >
                  (415) 555-1234
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sage-600 shrink-0" />
                <a
                  href="mailto:hello@serenityyoga.com"
                  className="text-sand-700 hover:text-terracotta-600 transition-colors"
                >
                  hello@serenityyoga.com
                </a>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm font-medium text-sand-900 mb-1">
                Studio Hours
              </p>
              <p className="text-sm text-sand-700">Mon-Fri: 6am - 9pm</p>
              <p className="text-sm text-sand-700">Sat-Sun: 7am - 7pm</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sand-900 text-lg">
              Stay Connected
            </h4>
            <p className="text-sand-700 text-sm">
              Subscribe to our newsletter for class updates, wellness tips, and
              special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full"
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
              {message && (
                <p className="text-sm text-sage-600 font-medium">{message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sand-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-sand-700">
              © {new Date().getFullYear()} Serenity Yoga Studio. All rights
              reserved. Breathe. Move. Restore.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-sand-700 hover:text-terracotta-600 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
