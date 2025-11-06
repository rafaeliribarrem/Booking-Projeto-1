import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroImage } from "@/components/ui/hero-image";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full">
      <HeroImage
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000"
        alt="Peaceful yoga practice in a serene natural setting"
        className="h-full"
        priority
      >
        {/* Content */}
        <div className="h-full container mx-auto px-4 lg:px-8 flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-50 leading-tight">
              Find Your Inner Peace
            </h1>
            <p className="text-xl md:text-2xl text-cream-100 leading-relaxed">
              Experience transformative yoga classes in a welcoming, mindful
              environment. Begin your journey to wellness today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/schedule">Browse Classes</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 backdrop-blur-sm"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream-50/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-cream-50/50 rounded-full" />
          </div>
        </div>
      </HeroImage>
    </section>
  );
}
