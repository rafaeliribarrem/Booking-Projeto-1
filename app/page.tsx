import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ClassTypesSection } from "@/components/home/ClassTypesSection";
import { InstructorSpotlight } from "@/components/home/InstructorSpotlight";
import { PricingSection } from "@/components/home/PricingSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <FeaturesSection />
      <ClassTypesSection />
      <InstructorSpotlight />
      <PricingSection />
    </div>
  );
}
