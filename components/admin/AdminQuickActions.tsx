"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreateSessionModal } from "@/components/admin/CreateSessionModal";
import {
  Plus,
  Users,
  Calendar,
  BarChart3,
  Settings,
  FileText,
} from "lucide-react";

export function AdminQuickActions() {
  const router = useRouter();
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] =
    useState(false);
  const actions = [
    {
      title: "Create Session",
      description: "Schedule a new yoga class",
      onClick: () => setIsCreateSessionModalOpen(true),
      icon: Plus,
      variant: "default" as const,
    },
    {
      title: "Manage Instructors",
      description: "Add or edit instructor profiles",
      href: "/admin/instructors",
      icon: Users,
      variant: "secondary" as const,
    },
    {
      title: "View Calendar",
      description: "See all scheduled sessions",
      href: "/admin/sessions",
      icon: Calendar,
      variant: "outline" as const,
    },
    {
      title: "View Reports",
      description: "Analytics and insights",
      href: "/admin/reports",
      icon: BarChart3,
      variant: "outline" as const,
    },
    {
      title: "Class Types",
      description: "Manage yoga class types",
      href: "/admin/classes",
      icon: Settings,
      variant: "outline" as const,
    },
    {
      title: "Export Data",
      description: "Download booking reports",
      href: "/admin/export",
      icon: FileText,
      variant: "outline" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-sand-900 mb-2">Quick Actions</h2>
        <p className="text-sand-700">
          Common administrative tasks and shortcuts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-sand-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-sand-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-sand-700 mb-4">
                    {action.description}
                  </p>
                  {action.onClick ? (
                    <Button
                      variant={action.variant}
                      size="sm"
                      className="w-full"
                      onClick={action.onClick}
                    >
                      {action.title}
                    </Button>
                  ) : (
                    <Button
                      variant={action.variant}
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href={action.href || "#"}>{action.title}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <CreateSessionModal
        isOpen={isCreateSessionModalOpen}
        onClose={() => setIsCreateSessionModalOpen(false)}
        onSuccess={() => {
          setIsCreateSessionModalOpen(false);
          router.push("/admin/sessions");
        }}
      />
    </div>
  );
}
