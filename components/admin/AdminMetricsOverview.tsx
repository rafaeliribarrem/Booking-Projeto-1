import { Card } from "@/components/ui/card";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react";

interface AdminMetricsOverviewProps {
  metrics: {
    todayBookings: number;
    totalBookings: number;
    todaySessions: number;
    totalActiveSessions: number;
    totalUsers: number;
    monthlyRevenue: number;
    capacityUtilization: number;
  };
}

export function AdminMetricsOverview({ metrics }: AdminMetricsOverviewProps) {
  const metricCards = [
    {
      title: "Today's Bookings",
      value: metrics.todayBookings,
      subtitle: `${metrics.totalBookings} this month`,
      icon: Calendar,
      color: "terracotta",
    },
    {
      title: "Today's Sessions",
      value: metrics.todaySessions,
      subtitle: `${metrics.totalActiveSessions} upcoming`,
      icon: Clock,
      color: "sage",
    },
    {
      title: "Total Users",
      value: metrics.totalUsers,
      subtitle: "Registered members",
      icon: Users,
      color: "clay",
    },
    {
      title: "Monthly Revenue",
      value: `$${metrics.monthlyRevenue.toLocaleString()}`,
      subtitle: "This month",
      icon: DollarSign,
      color: "terracotta",
    },
    {
      title: "Capacity Utilization",
      value: `${metrics.capacityUtilization}%`,
      subtitle: "Today's sessions",
      icon: BarChart3,
      color: "sage",
    },
    {
      title: "Growth",
      value: "+12%",
      subtitle: "vs last month",
      icon: TrendingUp,
      color: "clay",
    },
  ];

  const getIconBgColor = (color: string) => {
    switch (color) {
      case "terracotta":
        return "bg-terracotta-100";
      case "sage":
        return "bg-sage-100";
      case "clay":
        return "bg-clay-100";
      default:
        return "bg-sand-100";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "terracotta":
        return "text-terracotta-600";
      case "sage":
        return "text-sage-600";
      case "clay":
        return "text-clay-600";
      default:
        return "text-sand-600";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-sand-900 mb-2">
          Studio Overview
        </h2>
        <p className="text-sand-700">
          Key metrics and performance indicators for today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.title}
              className="p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${getIconBgColor(
                    metric.color
                  )} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-6 h-6 ${getIconColor(metric.color)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-sand-700 mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-sand-900 mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-sand-600">{metric.subtitle}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
