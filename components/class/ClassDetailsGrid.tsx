import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Award,
} from "lucide-react";

interface ClassDetailsGridProps {
  session: {
    startsAt: Date;
    duration: number;
    location?: string;
    capacity: number;
    bookedCount: number;
    price: number;
  };
  classType: {
    description?: string;
    difficulty?: string;
    expectations?: string[];
  };
  instructor: {
    name: string;
    avatar?: string;
    bio?: string;
    credentials?: string[];
  };
}

export function ClassDetailsGrid({
  session,
  classType,
  instructor,
}: ClassDetailsGridProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const spotsLeft = session.capacity - session.bookedCount;

  return (
    <section className="py-12 bg-cream-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Class Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-sand-900 mb-4">
                About This Class
              </h2>
              <p className="text-sand-700 text-lg leading-relaxed mb-6">
                {classType.description ||
                  "Experience a transformative yoga practice designed to strengthen your body and calm your mind."}
              </p>

              {classType.difficulty && (
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sand-900 font-medium">
                    Difficulty Level:
                  </span>
                  <Badge variant="outline">{classType.difficulty}</Badge>
                </div>
              )}

              {classType.expectations && classType.expectations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sand-900 mb-3">
                    What to Expect
                  </h3>
                  <ul className="space-y-2">
                    {classType.expectations.map((expectation, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sand-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-2 shrink-0" />
                        <span>{expectation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Session Details */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-sand-900 mb-6">
                Session Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <div>
                    <p className="text-sm text-sand-700 mb-1">Date</p>
                    <p className="font-medium text-sand-900">
                      {formatDate(session.startsAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <p className="text-sm text-sand-700 mb-1">Time</p>
                    <p className="font-medium text-sand-900">
                      {formatTime(session.startsAt)} • {session.duration} min
                    </p>
                  </div>
                </div>

                {session.location && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-clay-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-clay-600" />
                    </div>
                    <div>
                      <p className="text-sm text-sand-700 mb-1">Location</p>
                      <p className="font-medium text-sand-900">
                        {session.location}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <p className="text-sm text-sand-700 mb-1">Capacity</p>
                    <p className="font-medium text-sand-900">
                      {spotsLeft > 0 ? (
                        <span className="text-sage-600">
                          {spotsLeft} spots left
                        </span>
                      ) : (
                        <span className="text-terracotta-600">Class Full</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <div>
                    <p className="text-sm text-sand-700 mb-1">Price</p>
                    <p className="font-medium text-sand-900">
                      ${session.price} or 1 credit
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Instructor Card */}
          <div className="lg:col-span-1">
            <Card className="p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-sand-900 mb-6">
                Your Instructor
              </h2>

              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={instructor.avatar} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(instructor.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-sand-900 mb-2">
                  {instructor.name}
                </h3>
              </div>

              {instructor.bio && (
                <p className="text-sand-700 leading-relaxed mb-6">
                  {instructor.bio}
                </p>
              )}

              {instructor.credentials && instructor.credentials.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-terracotta-600" />
                    <h4 className="font-semibold text-sand-900">Credentials</h4>
                  </div>
                  <ul className="space-y-2">
                    {instructor.credentials.map((credential, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-sand-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-1.5 shrink-0" />
                        <span>{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
