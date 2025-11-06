"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  onRowClick,
  actions,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Filter data based on search term
  const filteredData = searchable
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Sort data
  const sortedData = sortConfig
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-600" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sand-50 border-b border-sand-200">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-6 py-4 text-left text-sm font-medium text-sand-900 ${
                      column.sortable ? "cursor-pointer hover:bg-sand-100" : ""
                    } ${column.className || ""}`}
                    onClick={
                      column.sortable
                        ? () => handleSort(String(column.key))
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && getSortIcon(String(column.key))}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-4 text-right text-sm font-medium text-sand-900">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {sortedData.length > 0 ? (
                sortedData.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-sand-50 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={`px-6 py-4 text-sm text-sand-900 ${
                          column.className || ""
                        }`}
                      >
                        {column.render
                          ? column.render(item)
                          : String(item[column.key] || "")}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 text-right">
                        <div
                          className="flex items-center justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {actions(item)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-sand-600"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {searchable && searchTerm && (
        <p className="text-sm text-sand-600">
          Showing {sortedData.length} of {data.length} results
        </p>
      )}
    </div>
  );
}
