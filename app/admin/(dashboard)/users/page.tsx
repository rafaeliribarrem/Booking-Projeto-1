"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Mail, Calendar, BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: "USER" | "ADMIN" | "INSTRUCTOR";
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    bookings: number;
  };
};

export default function AdminUsersPage() {
  const { data: session, update: updateSession } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    setUpdatingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update role");
      }

      // Refresh users list
      await fetchUsers();

      // If updating current user's role, refresh session
      if (userId === session?.user?.id) {
        await updateSession();
      }

      alert("User role updated successfully");
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert(error instanceof Error ? error.message : "Failed to update user role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete ${user.name || user.email}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete user");
      }

      await fetchUsers();
      alert("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert(error instanceof Error ? error.message : "Failed to delete user");
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      ADMIN: "error" as const,
      INSTRUCTOR: "warning" as const,
      USER: "outline" as const,
    };
    return <Badge variant={variants[role as keyof typeof variants] || "outline"}>{role}</Badge>;
  };

  const columns = [
    {
      key: "name",
      header: "User",
      sortable: true,
      render: (user: User) => (
        <div>
          <p className="font-medium text-sand-900">{user.name || "No name"}</p>
          <div className="flex items-center gap-1 text-sm text-sand-600">
            <Mail className="w-3 h-3" />
            <span>{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-sand-600" />
          {getRoleBadge(user.role)}
        </div>
      ),
    },
    {
      key: "emailVerified",
      header: "Status",
      sortable: true,
      render: (user: User) => (
        <Badge variant={user.emailVerified ? "success" : "outline"}>
          {user.emailVerified ? "Verified" : "Unverified"}
        </Badge>
      ),
    },
    {
      key: "_count.bookings",
      header: "Bookings",
      sortable: true,
      render: (user: User) => (
        <div className="flex items-center gap-2 text-sm text-sand-700">
          <BookOpen className="w-4 h-4" />
          <span>{user._count.bookings}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Joined",
      sortable: true,
      render: (user: User) => (
        <div className="flex items-center gap-2 text-sm text-sand-700">
          <Calendar className="w-4 h-4" />
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Change Role",
      render: (user: User) => (
        <Select
          value={user.role}
          onValueChange={(value) => handleRoleChange(user.id, value)}
          disabled={updatingUserId === user.id || user.id === session?.user?.id}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sand-700">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sand-900">User Management</h2>
          <p className="text-sand-700">Manage user accounts and roles</p>
        </div>
        <div className="text-sm text-sand-600">
          Total Users: <span className="font-semibold">{users.length}</span>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        searchable
        searchPlaceholder="Search users by name or email..."
        emptyMessage="No users found"
      />
    </div>
  );
}
