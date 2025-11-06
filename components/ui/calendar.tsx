"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function Calendar({
  selected,
  onSelect,
  className,
  minDate,
  maxDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected || new Date()
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selected) return false;
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  return (
    <div
      className={cn(
        "p-4 bg-cream-100 rounded-base border border-sand-200 shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={goToPreviousMonth}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-display text-lg font-semibold text-sand-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={goToNextMonth}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-sand-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const disabled = isDateDisabled(date);
          const today = isToday(date);
          const selectedDay = isSelected(date);

          return (
            <button
              key={index}
              onClick={() => date && !disabled && onSelect?.(date)}
              disabled={disabled}
              className={cn(
                "h-10 w-full rounded-base text-sm font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2",
                !date && "invisible",
                date &&
                  !disabled &&
                  !selectedDay &&
                  "hover:bg-sand-100 text-sand-900",
                disabled && "text-sand-400 cursor-not-allowed",
                today &&
                  !selectedDay &&
                  "bg-sage-100 text-sage-700 font-semibold",
                selectedDay &&
                  "bg-terracotta-500 text-cream-50 font-semibold hover:bg-terracotta-600"
              )}
            >
              {date?.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-sand-200 flex items-center justify-center gap-4 text-xs text-sand-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-sage-100 border border-sage-300" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terracotta-500" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
