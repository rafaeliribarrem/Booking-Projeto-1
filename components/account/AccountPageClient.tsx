"use client";

import { useState } from "react";
import { DashboardTabs } from "@/components/account/DashboardTabs";
import { BookingCard } from "@/components/account/BookingCard";
import { PassesDisplay } from "@/components/account/PassesDisplay";
import { AccountSettingsForm } from "@/components/account/AccountSettingsForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AccountPageClientProps {
  upcomingBookings: any[];
  pastBookings: any[];
  activePasses: any[];
  expiredPasses: any[];
  user: {
    name: string;
    email: string;
  };
}

export function AccountPageClient({
  upcomingBookings,
  pastBookings,
  activePasses,
  expiredPasses,
  user,
}: AccountPageClientProps) {
  const [activeTab, setActiveTab] = useState("bookings");

  const tabs = [
    { id: "bookings", label: "Upcoming Bookings" },
    { id: "history", label: "Past Bookings" },
    { id: "passes", label: "My Passes" },
    { id: "settings", label: "Account Settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <div className="space-y-6">
            {upcomingBookings.length > 0 ?
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            : <Card className="p-12 text-center">
                <h3 className="text-xl font-semibold text-sand-900 mb-2">
                  No upcoming bookings
                </h3>
                <p className="text-sand-700 mb-6">
                  Ready to get back on the mat? Browse our schedule and book
                  your next class.
                </p>
                <Button asChild>
                  <Link href="/schedule">Browse Classes</Link>
                </Button>
              </Card>
            }
          </div>
        );

      case "history":
        return (
          <div className="space-y-6">
            {pastBookings.length > 0 ?
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            : <Card className="p-12 text-center">
                <h3 className="text-xl font-semibold text-sand-900 mb-2">
                  No past bookings
                </h3>
                <p className="text-sand-700">
                  Your booking history will appear here once you've attended
                  classes.
                </p>
              </Card>
            }
          </div>
        );

      case "passes":
        return (
          <PassesDisplay
            activePasses={activePasses}
            expiredPasses={expiredPasses}
          />
        );

      case "settings":
        return <AccountSettingsForm user={user} />;

      default:
        return null;
    }
  };

  return (
    <DashboardTabs tabs={tabs} defaultTab="bookings" onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardTabs>
  );
}
