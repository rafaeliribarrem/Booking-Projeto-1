"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnUrl?: string;
}

export function AuthModal({ isOpen, onClose, returnUrl }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "signin") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
        } else {
          onClose();
          if (returnUrl) {
            router.push(returnUrl);
          }
        }
      } else {
        // Sign up logic
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (response.ok) {
          // Auto sign in after signup
          await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          onClose();
          if (returnUrl) {
            router.push(returnUrl);
          }
        } else {
          const data = await response.json();
          setError(data.message || "Failed to create account");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 bg-sand-100 rounded-base">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 px-4 rounded-base text-sm font-medium transition-colors ${
                mode === "signin"
                  ? "bg-cream-50 text-sand-900 shadow-sm"
                  : "text-sand-700 hover:text-sand-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-4 rounded-base text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "bg-cream-50 text-sand-900 shadow-sm"
                  : "text-sand-700 hover:text-sand-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="text-sm text-terracotta-600 bg-terracotta-50 p-3 rounded-base">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Loading..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
