import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface BookingCardProps {
  booking: {
    id: string;
    className: string;
    instructor: string;
    date: string;
    time: string;
    duration: number;
    location?: string;
    status: "upcoming" | "past" | "cancelled";
  };
  onCancel?: (bookingId: string) => void;
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const getStatusBadge = () => {
    switch (booking.status) {
      case "upcoming":
        return <Badge variant="success">Upcoming</Badge>;
      case "past":
        return <Badge variant="outline">Completed</Badge>;
      case "cancelled":
        return <Badge variant="error">Cancelled</Badge>;
    }
  };

  return (
    <Card
      className={`p-6 ${booking.status === "cancelled" ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-sand-900 mb-1">
                {booking.className}
              </h3>
              {getStatusBadge()}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sand-700">
              <User className="w-4 h-4" />
              <span className="text-sm">{booking.instructor}</span>
            </div>

            <div className="flex items-center gap-2 text-sand-700">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{booking.date}</span>
            </div>

            <div className="flex items-center gap-2 text-sand-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {booking.time} • {booking.duration} min
              </span>
            </div>

            {booking.location && (
              <div className="flex items-center gap-2 text-sand-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{booking.location}</span>
              </div>
            )}
          </div>
        </div>

        {booking.status === "upcoming" && onCancel && (
          <div className="flex md:flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(booking.id)}
              className="text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50"
            >
              Cancel Booking
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
