import { Heart, Users, Sparkles } from "lucide-react";
import { BackgroundTextureVariants } from "@/components/ui/background-texture";

const features = [
  {
    icon: Heart,
    title: "Mindful Practice",
    description:
      "Connect with your breath and body through intentional movement and meditation.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from certified yoga teachers with years of experience and passion for wellness.",
  },
  {
    icon: Sparkles,
    title: "Welcoming Community",
    description:
      "Join a supportive community of practitioners at all levels on their wellness journey.",
  },
];

export function FeaturesSection() {
  return (
    <BackgroundTextureVariants.Section
      backgroundColor="rgb(250, 248, 245)" // cream-50
      className="py-20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-4">
            Why Choose Serenity Yoga
          </h2>
          <p className="text-lg text-sand-700">
            Experience the difference of a truly mindful yoga practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center space-y-4 p-6"
              >
                <div className="w-16 h-16 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Icon
                    className="w-8 h-8 text-terracotta-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-semibold text-sand-900">
                  {feature.title}
                </h3>
                <p className="text-sand-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </BackgroundTextureVariants.Section>
  );
}
