"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  date?: string;
  classType?: string;
  instructor?: string;
  timeOfDay?: string;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    const dateString = date ? date.toISOString().split("T")[0] : "";
    handleFilterChange("date", dateString);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedDate(undefined);
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <div className="sticky top-[72px] z-40 bg-cream-50 border-b border-sand-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="px-2 py-0.5 bg-terracotta-500 text-cream-50 text-xs rounded-full">
                  {Object.values(filters).filter((v) => v).length}
                </span>
              )}
            </span>
          </Button>
        </div>

        {/* Filter Controls */}
        <div
          className={`${isExpanded ? "block" : "hidden"} md:block mt-4 md:mt-0`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Filter */}
            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker
                selected={selectedDate}
                onSelect={handleDateSelect}
                placeholder="Select a date"
                minDate={new Date()}
              />
            </div>

            {/* Class Type Filter */}
            <div className="space-y-2">
              <Label htmlFor="class-type-filter">Class Type</Label>
              <Select
                value={filters.classType || ""}
                onValueChange={(value) =>
                  handleFilterChange("classType", value)
                }
              >
                <SelectTrigger id="class-type-filter" className="h-11">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="vinyasa">Vinyasa Flow</SelectItem>
                  <SelectItem value="yin">Yin Yoga</SelectItem>
                  <SelectItem value="power">Power Yoga</SelectItem>
                  <SelectItem value="restorative">Restorative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Instructor Filter */}
            <div className="space-y-2">
              <Label htmlFor="instructor-filter">Instructor</Label>
              <Select
                value={filters.instructor || ""}
                onValueChange={(value) =>
                  handleFilterChange("instructor", value)
                }
              >
                <SelectTrigger id="instructor-filter" className="h-11">
                  <SelectValue placeholder="All Instructors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Instructors</SelectItem>
                  <SelectItem value="sarah">Sarah Chen</SelectItem>
                  <SelectItem value="michael">Michael Rodriguez</SelectItem>
                  <SelectItem value="emma">Emma Thompson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time of Day Filter */}
            <div className="space-y-2">
              <Label htmlFor="time-filter">Time of Day</Label>
              <Select
                value={filters.timeOfDay || ""}
                onValueChange={(value) =>
                  handleFilterChange("timeOfDay", value)
                }
              >
                <SelectTrigger id="time-filter" className="h-11">
                  <SelectValue placeholder="Any Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="morning">Morning (6am-12pm)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12pm-5pm)
                  </SelectItem>
                  <SelectItem value="evening">Evening (5pm-9pm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
