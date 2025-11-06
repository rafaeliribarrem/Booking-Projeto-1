"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ClassType {
  id: string;
  name: string;
  description?: string | null;
  durationMinutes: number;
  defaultCapacity: number;
  difficulty?: string | null;
  isActive: boolean;
}

interface EditClassTypeModalProps {
  classType: ClassType | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditClassTypeModal({
  classType,
  isOpen,
  onClose,
  onSuccess,
}: EditClassTypeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    durationMinutes: "60",
    defaultCapacity: "20",
    difficulty: "",
    isActive: true,
  });

  useEffect(() => {
    if (classType) {
      setFormData({
        name: classType.name,
        description: classType.description || "",
        durationMinutes: classType.durationMinutes.toString(),
        defaultCapacity: classType.defaultCapacity.toString(),
        difficulty: classType.difficulty || "",
        isActive: classType.isActive,
      });
    }
  }, [classType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classType) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/class-types/${classType.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          durationMinutes: parseInt(formData.durationMinutes),
          defaultCapacity: parseInt(formData.defaultCapacity),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update class type");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!classType) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Class Type</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Class Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Vinyasa Flow"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of the class"
              className="w-full min-h-[80px] rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) =>
                  setFormData({ ...formData, durationMinutes: e.target.value })
                }
                min="15"
                max="180"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Default Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.defaultCapacity}
                onChange={(e) =>
                  setFormData({ ...formData, defaultCapacity: e.target.value })
                }
                min="1"
                max="100"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              className="w-full h-11 rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 rounded border-sand-300 text-terracotta-500 focus:ring-terracotta-500"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active (visible to users)
            </Label>
          </div>

          {error && (
            <div className="p-3 bg-terracotta-50 border border-terracotta-200 rounded-base text-sm text-terracotta-700">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
