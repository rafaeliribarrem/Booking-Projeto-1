"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddClassTypeModal } from "@/components/admin/AddClassTypeModal";
import { EditClassTypeModal } from "@/components/admin/EditClassTypeModal";
import { Plus, Edit, Trash2, Clock, Users } from "lucide-react";

type ClassType = {
  id: string;
  name: string;
  description?: string | null;
  durationMinutes: number;
  defaultCapacity: number;
  difficulty?: string | null;
  image?: string | null;
  isActive: boolean;
  createdAt: Date;
};

export default function AdminClassesPage() {
  const [classTypes, setClassTypes] = useState<ClassType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState<ClassType | null>(
    null
  );

  useEffect(() => {
    fetchClassTypes();
  }, []);

  const fetchClassTypes = async () => {
    try {
      const response = await fetch("/api/admin/class-types");
      const data = await response.json();
      setClassTypes(data);
    } catch (error) {
      console.error("Failed to fetch class types:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (classType: ClassType) => {
    setSelectedClassType(classType);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (classType: ClassType) => {
    if (!confirm(`Are you sure you want to delete ${classType.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/class-types/${classType.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete class type");

      await fetchClassTypes();
    } catch (error) {
      console.error("Failed to delete class type:", error);
      alert("Failed to delete class type");
    }
  };

  const getDifficultyBadge = (difficulty?: string | null) => {
    if (!difficulty) return null;

    const variant =
      difficulty.toLowerCase() === "beginner"
        ? "success"
        : difficulty.toLowerCase() === "intermediate"
        ? "warning"
        : difficulty.toLowerCase() === "advanced"
        ? "error"
        : "outline";

    return <Badge variant={variant}>{difficulty}</Badge>;
  };

  const columns = [
    {
      key: "name",
      header: "Class Type",
      sortable: true,
      render: (classType: ClassType) => (
        <div>
          <p className="font-medium text-sand-900">{classType.name}</p>
          {classType.description && (
            <p className="text-sm text-sand-600 line-clamp-1 max-w-xs">
              {classType.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "durationMinutes",
      header: "Duration",
      sortable: true,
      render: (classType: ClassType) => (
        <div className="flex items-center gap-2 text-sm text-sand-700">
          <Clock className="w-4 h-4" />
          <span>{classType.durationMinutes} min</span>
        </div>
      ),
    },
    {
      key: "defaultCapacity",
      header: "Capacity",
      sortable: true,
      render: (classType: ClassType) => (
        <div className="flex items-center gap-2 text-sm text-sand-700">
          <Users className="w-4 h-4" />
          <span>{classType.defaultCapacity} people</span>
        </div>
      ),
    },
    {
      key: "difficulty",
      header: "Difficulty",
      sortable: true,
      render: (classType: ClassType) => (
        <div>
          {getDifficultyBadge(classType.difficulty) || (
            <span className="text-sm text-sand-500 italic">Not set</span>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      sortable: true,
      render: (classType: ClassType) => (
        <Badge variant={classType.isActive ? "success" : "outline"}>
          {classType.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (classType: ClassType) => (
        <span className="text-sm text-sand-700">
          {new Date(classType.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sand-700">Loading class types...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sand-900">Class Types</h2>
          <p className="text-sand-700">Manage your yoga class offerings</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Class Type
        </Button>
      </div>

      <DataTable
        data={classTypes}
        columns={columns}
        searchable
        searchPlaceholder="Search class types..."
        actions={(classType) => (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(classType)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(classType)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
        emptyMessage="No class types found"
      />

      <AddClassTypeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchClassTypes}
      />

      <EditClassTypeModal
        classType={selectedClassType}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedClassType(null);
        }}
        onSuccess={fetchClassTypes}
      />
    </div>
  );
}
