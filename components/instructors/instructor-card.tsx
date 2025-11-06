"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ImageCard,
  ImageCardMedia,
  ImageCardBody,
  ImageCardHeader,
  ImageCardTitle,
  ImageCardDescription,
  ImageCardContent,
} from "@/components/ui/image-card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { imageOptimization } from "@/lib/utils/images";

interface InstructorCardProps {
  instructor: {
    id: string;
    name: string;
    bio: string | null;
    imageUrl: string | null;
  };
  specialty?: string;
  experience?: string;
  index?: number;
}

export function InstructorCard({
  instructor,
  specialty,
  experience,
  index = 0,
}: InstructorCardProps) {
  // Array of yoga-related Unsplash images
  const yogaImages = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800",
    "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800",
    "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800",
  ];

  // Select image based on index for consistency
  const backgroundImage = yogaImages[index % yogaImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <ImageCard
        variant="elevated"
        className="group transition-all duration-300 hover:shadow-xl h-full"
      >
        {/* Image Section - No padding */}
        <ImageCardMedia className="h-48 bg-sand-100">
          <Image
            src={instructor.imageUrl || backgroundImage}
            alt={`${instructor.name} background`}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={imageOptimization.getBlurDataUrl()}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-sand-900/40" />
        </ImageCardMedia>

        {/* Content Section - With padding */}
        <ImageCardBody>
          <ImageCardHeader className="text-center">
            <ImageCardTitle className="font-display text-2xl font-bold">
              {instructor.name}
            </ImageCardTitle>
            {specialty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary" className="mt-2 gap-1">
                  {specialty}
                </Badge>
              </motion.div>
            )}
          </ImageCardHeader>

          <ImageCardContent>
            {instructor.bio && (
              <ImageCardDescription className="line-clamp-3 text-center">
                {instructor.bio}
              </ImageCardDescription>
            )}

            {experience && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 text-xs text-sand-700"
              >
                <span>{experience}</span>
              </motion.div>
            )}

            <motion.div
              className="border-t border-sand-200 pt-3 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    <Star
                      className="h-4 w-4 text-terracotta-500"
                      fill="currentColor"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ImageCardContent>
        </ImageCardBody>
      </ImageCard>
    </motion.div>
  );
}
