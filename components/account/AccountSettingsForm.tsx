"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountSettingsFormProps {
  user: {
    name: string;
    email: string;
  };
  onSave?: (data: {
    name: string;
    email: string;
    password?: string;
  }) => Promise<void>;
}

export function AccountSettingsForm({
  user,
  onSave,
}: AccountSettingsFormProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password change if attempted
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        setError("New passwords don't match");
        return;
      }
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      if (!currentPassword) {
        setError("Current password is required to change password");
        return;
      }
    }

    setIsLoading(true);

    try {
      await onSave?.({
        name,
        email,
        password: newPassword || undefined,
      });
      setSuccess("Settings updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to update settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Information */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-sand-900 mb-6">
          Profile Information
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-sand-900 mb-6">
          Change Password
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </Card>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-terracotta-50 border border-terracotta-200 rounded-base">
          <p className="text-sm text-terracotta-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-sage-50 border border-sage-200 rounded-base">
          <p className="text-sm text-sage-600">{success}</p>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
