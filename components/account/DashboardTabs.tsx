"use client";

import { useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
}

interface DashboardTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children: ReactNode;
}

export function DashboardTabs({
  tabs,
  defaultTab,
  onTabChange,
  children,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-sand-200 overflow-x-auto">
        <nav className="flex gap-8 min-w-max" aria-label="Dashboard tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-4 px-1 text-base font-medium transition-colors relative whitespace-nowrap cursor-pointer ${
                activeTab === tab.id ?
                  "text-terracotta-600"
                : "text-sand-700 hover:text-sand-900"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-600" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div data-active-tab={activeTab}>{children}</div>
    </div>
  );
}
