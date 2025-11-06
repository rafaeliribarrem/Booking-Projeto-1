// Shared types for admin components

export type AdminSession = {
  id: string;
  startsAt: Date;
  endsAt: Date;
  capacity: number;
  location?: string | null;
  classType: { id: string; name: string };
  instructor: { id: string; name: string };
  bookings: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    status: string;
    createdAt: Date;
  }[];
};

export type AdminInstructor = {
  id: string;
  name: string;
};

export type AdminClassType = {
  id: string;
  name: string;
};

// Simplified session type for calendar view (without detailed booking info)
export type CalendarSession = {
  id: string;
  startsAt: Date;
  endsAt: Date;
  capacity: number;
  location?: string | null;
  classType: { id: string; name: string };
  instructor: { id: string; name: string };
  bookings: { id: string }[];
};
