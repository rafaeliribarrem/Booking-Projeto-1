import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getInstructorImageUrl,
  getImageAltText,
  imageOptimization,
} from "@/lib/utils/images";

export function InstructorSpotlight() {
  const instructorName = "Sarah Chen";
  const instructorImage = getInstructorImageUrl(
    instructorName,
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800"
  );

  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src={instructorImage}
              alt={getImageAltText("instructor", instructorName)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={imageOptimization.getBlurDataUrl()}
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-terracotta-600 font-medium mb-2">
                Featured Instructor
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-4">
                Meet {instructorName}
              </h2>
            </div>

            <p className="text-lg text-sand-700 leading-relaxed">
              With over 15 years of experience, Sarah brings a unique blend of
              traditional Hatha yoga and modern mindfulness practices. Her
              classes focus on building strength, flexibility, and inner peace.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-terracotta-500 mt-2" />
                <p className="text-sand-700">
                  500-hour Registered Yoga Teacher (RYT-500)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-terracotta-500 mt-2" />
                <p className="text-sand-700">
                  Certified Meditation & Mindfulness Instructor
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-terracotta-500 mt-2" />
                <p className="text-sand-700">
                  Specializes in Vinyasa Flow and Restorative Yoga
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href="/instructors">Meet Our Instructors</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
