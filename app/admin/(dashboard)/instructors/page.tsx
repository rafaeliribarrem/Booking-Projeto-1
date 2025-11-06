"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstructorAvatarVariants } from "@/components/ui/instructor-avatar";
import { AddInstructorModal } from "@/components/admin/AddInstructorModal";
import { EditInstructorModal } from "@/components/admin/EditInstructorModal";
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react";

type Instructor = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  bio?: string | null;
  credentials?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
};

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch("/api/admin/instructors");
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (instructor: Instructor) => {
    if (!confirm(`Are you sure you want to delete ${instructor.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/instructors/${instructor.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete instructor");

      await fetchInstructors();
    } catch (error) {
      console.error("Failed to delete instructor:", error);
      alert("Failed to delete instructor");
    }
  };

  const columns = [
    {
      key: "name",
      header: "Instructor",
      sortable: true,
      render: (instructor: Instructor) => (
        <div className="flex items-center gap-3">
          <InstructorAvatarVariants.Medium
            instructorName={instructor.name}
            image={instructor.imageUrl || undefined}
          />
          <div>
            <p className="font-medium text-sand-900">{instructor.name}</p>
            {instructor.credentials && (
              <p className="text-sm text-sand-600">{instructor.credentials}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (instructor: Instructor) => (
        <div className="space-y-1">
          {instructor.email && (
            <div className="flex items-center gap-2 text-sm text-sand-700">
              <Mail className="w-4 h-4" />
              <span>{instructor.email}</span>
            </div>
          )}
          {instructor.phone && (
            <div className="flex items-center gap-2 text-sm text-sand-700">
              <Phone className="w-4 h-4" />
              <span>{instructor.phone}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "bio",
      header: "Bio",
      render: (instructor: Instructor) => (
        <div className="max-w-xs">
          {instructor.bio ? (
            <p className="text-sm text-sand-700 line-clamp-2">
              {instructor.bio}
            </p>
          ) : (
            <span className="text-sm text-sand-500 italic">No bio</span>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      sortable: true,
      render: (instructor: Instructor) => (
        <Badge variant={instructor.isActive ? "success" : "outline"}>
          {instructor.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Added",
      sortable: true,
      render: (instructor: Instructor) => (
        <span className="text-sm text-sand-700">
          {new Date(instructor.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sand-700">Loading instructors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sand-900">Instructors</h2>
          <p className="text-sand-700">Manage your yoga instructors</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Instructor
        </Button>
      </div>

      <DataTable
        data={instructors}
        columns={columns}
        searchable
        searchPlaceholder="Search instructors..."
        actions={(instructor) => (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(instructor)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(instructor)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
        emptyMessage="No instructors found"
      />

      <AddInstructorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchInstructors}
      />

      <EditInstructorModal
        instructor={selectedInstructor}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedInstructor(null);
        }}
        onSuccess={fetchInstructors}
      />
    </div>
  );
}
