import { Card } from "@/components/ui/card";
import { Calendar, CreditCard } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  upcomingClasses: number;
  remainingCredits: number;
}

export function DashboardHeader({
  userName,
  upcomingClasses,
  remainingCredits,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-sand-900 mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-lg text-sand-700">
          Here's your yoga journey at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-terracotta-600" />
            </div>
            <div>
              <p className="text-sm text-sand-700 mb-1">Upcoming Classes</p>
              <p className="text-3xl font-bold text-sand-900">
                {upcomingClasses}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-sm text-sand-700 mb-1">Remaining Credits</p>
              <p className="text-3xl font-bold text-sand-900">
                {remainingCredits}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
