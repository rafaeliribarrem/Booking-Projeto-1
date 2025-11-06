import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ClassDetailHeroProps {
  classType: {
    name: string;
    image?: string;
    difficulty?: string;
  };
}

export function ClassDetailHero({ classType }: ClassDetailHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={
          classType.image ||
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000"
        }
        alt={classType.name}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-sand-900/50" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-end pb-12">
        <div className="space-y-4">
          {classType.difficulty && (
            <Badge variant="default" className="text-base px-4 py-1">
              {classType.difficulty}
            </Badge>
          )}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-50">
            {classType.name}
          </h1>
        </div>
      </div>
    </section>
  );
}
