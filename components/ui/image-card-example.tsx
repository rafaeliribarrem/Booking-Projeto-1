/**
 * ImageCard Component Usage Examples
 *
 * This file demonstrates how to use the ImageCard component with images.
 * Delete this file after reviewing the examples.
 */

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ImageCard,
  ImageCardMedia,
  ImageCardBody,
  ImageCardHeader,
  ImageCardTitle,
  ImageCardDescription,
  ImageCardContent,
  ImageCardFooter,
} from "@/components/ui/image-card";

// Example 1: Basic Image Card
export function BasicImageCard() {
  return (
    <ImageCard>
      <ImageCardMedia>
        <Image
          src="/images/yoga-class.jpg"
          alt="Yoga Class"
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      </ImageCardMedia>
      <ImageCardBody>
        <ImageCardHeader>
          <ImageCardTitle>Vinyasa Flow</ImageCardTitle>
          <ImageCardDescription>
            A dynamic practice linking breath with movement
          </ImageCardDescription>
        </ImageCardHeader>
        <ImageCardContent>
          <p className="text-sm text-sand-700">
            Duration: 60 minutes • Level: Intermediate
          </p>
        </ImageCardContent>
        <ImageCardFooter>
          <Button>Book Now</Button>
        </ImageCardFooter>
      </ImageCardBody>
    </ImageCard>
  );
}

// Example 2: Elevated Variant with Hover Effect
export function ElevatedImageCard() {
  return (
    <ImageCard variant="elevated">
      <ImageCardMedia>
        <div className="relative h-48 w-full">
          <Image
            src="/images/instructor.jpg"
            alt="Instructor"
            fill
            className="object-cover"
          />
        </div>
      </ImageCardMedia>
      <ImageCardBody>
        <ImageCardHeader>
          <ImageCardTitle>Sarah Johnson</ImageCardTitle>
          <ImageCardDescription>Senior Yoga Instructor</ImageCardDescription>
        </ImageCardHeader>
        <ImageCardContent>
          <p className="text-sm text-sand-700">
            10+ years of experience in Hatha and Vinyasa yoga
          </p>
        </ImageCardContent>
      </ImageCardBody>
    </ImageCard>
  );
}

// Example 3: Outlined Variant
export function OutlinedImageCard() {
  return (
    <ImageCard variant="outlined">
      <ImageCardMedia>
        <Image
          src="/images/class-schedule.jpg"
          alt="Class Schedule"
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
      </ImageCardMedia>
      <ImageCardBody>
        <ImageCardHeader>
          <ImageCardTitle>Morning Flow</ImageCardTitle>
          <ImageCardDescription>
            Start your day with energy
          </ImageCardDescription>
        </ImageCardHeader>
        <ImageCardContent>
          <div className="flex items-center justify-between text-sm">
            <span className="text-sand-600">Mon, Wed, Fri</span>
            <span className="font-medium text-terracotta-600">7:00 AM</span>
          </div>
        </ImageCardContent>
      </ImageCardBody>
    </ImageCard>
  );
}

// Example 4: Compact Card without Footer
export function CompactImageCard() {
  return (
    <ImageCard className="max-w-sm">
      <ImageCardMedia>
        <Image
          src="/images/meditation.jpg"
          alt="Meditation"
          width={400}
          height={200}
          className="w-full h-32 object-cover"
        />
      </ImageCardMedia>
      <ImageCardBody className="p-4 gap-2">
        <ImageCardTitle className="text-base">
          Meditation Session
        </ImageCardTitle>
        <ImageCardDescription>
          Find inner peace and clarity
        </ImageCardDescription>
      </ImageCardBody>
    </ImageCard>
  );
}

// Example 5: Card with Overlay Badge on Image
export function ImageCardWithBadge() {
  return (
    <ImageCard variant="elevated">
      <ImageCardMedia className="relative">
        <Image
          src="/images/special-class.jpg"
          alt="Special Class"
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-terracotta-500 text-cream-50 px-3 py-1 rounded-full text-xs font-semibold">
          New
        </div>
      </ImageCardMedia>
      <ImageCardBody>
        <ImageCardHeader>
          <ImageCardTitle>Restorative Yoga</ImageCardTitle>
          <ImageCardDescription>
            Deep relaxation and healing
          </ImageCardDescription>
        </ImageCardHeader>
        <ImageCardContent>
          <div className="flex items-center gap-4 text-sm text-sand-700">
            <span>90 minutes</span>
            <span>•</span>
            <span>All levels</span>
          </div>
        </ImageCardContent>
        <ImageCardFooter>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </ImageCardFooter>
      </ImageCardBody>
    </ImageCard>
  );
}

// Example 6: Grid Layout with Multiple Cards
export function ImageCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BasicImageCard />
      <ElevatedImageCard />
      <OutlinedImageCard />
    </div>
  );
}
