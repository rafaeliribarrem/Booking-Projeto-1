import Link from "next/link";
import {
  ImageCard,
  ImageCardMedia,
  ImageCardBody,
  ImageCardHeader,
  ImageCardTitle,
  ImageCardDescription,
  ImageCardContent,
} from "@/components/ui/image-card";
import { ClassTypeImageVariants } from "@/components/ui/class-type-image";
import { BackgroundTextureVariants } from "@/components/ui/background-texture";
import { ArrowRight } from "lucide-react";

const classTypes = [
  {
    id: 1,
    name: "Vinyasa Flow",
    description: "Dynamic sequences linking breath with movement",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    difficulty: "All Levels",
  },
  {
    id: 2,
    name: "Yin Yoga",
    description: "Slow-paced practice with longer holds for deep stretching",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800",
    difficulty: "Beginner Friendly",
  },
  {
    id: 3,
    name: "Power Yoga",
    description: "Strength-building practice for fitness and flexibility",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
    difficulty: "Intermediate",
  },
];

export function ClassTypesSection() {
  return (
    <BackgroundTextureVariants.Section
      backgroundColor="rgb(250, 250, 249)" // sand-50
      className="py-20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-4">
            Explore Our Classes
          </h2>
          <p className="text-lg text-sand-700">
            Find the perfect practice for your body and mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {classTypes.map((classType) => (
            <Link
              key={classType.id}
              href={`/schedule?classType=${classType.id}`}
              className="group h-full"
            >
              <ImageCard
                variant="elevated"
                className="h-full transition-all hover:shadow-xl"
              >
                {/* Image Section - No padding */}
                <ImageCardMedia className="h-48">
                  <ClassTypeImageVariants.Card
                    classTypeName={classType.name}
                    image={classType.image}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-cream-50/90 backdrop-blur-sm text-sand-900 text-xs font-medium rounded-full">
                      {classType.difficulty}
                    </span>
                  </div>
                </ImageCardMedia>

                {/* Content Section - With padding */}
                <ImageCardBody>
                  <ImageCardHeader>
                    <ImageCardTitle className="font-display group-hover:text-terracotta-600 transition-colors">
                      {classType.name}
                    </ImageCardTitle>
                    <ImageCardDescription className="leading-relaxed">
                      {classType.description}
                    </ImageCardDescription>
                  </ImageCardHeader>

                  <ImageCardContent>
                    <div className="flex items-center text-terracotta-600 font-medium pt-2">
                      <span className="text-sm">View Schedule</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </ImageCardContent>
                </ImageCardBody>
              </ImageCard>
            </Link>
          ))}
        </div>
      </div>
    </BackgroundTextureVariants.Section>
  );
}
