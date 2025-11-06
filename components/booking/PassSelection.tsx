import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Pass {
  id: string;
  name: string;
  price: number;
  credits?: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface PassSelectionProps {
  passes: Pass[];
  selectedPassId?: string;
  onSelectPass: (passId: string) => void;
}

export function PassSelection({
  passes,
  selectedPassId,
  onSelectPass,
}: PassSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-sand-900 mb-2">
          Choose Your Pass
        </h2>
        <p className="text-sand-700">
          Select how you'd like to pay for this class
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {passes.map((pass) => (
          <Card
            key={pass.id}
            variant={selectedPassId === pass.id ? "elevated" : "default"}
            className={`relative p-6 cursor-pointer transition-all ${
              selectedPassId === pass.id
                ? "ring-2 ring-terracotta-500"
                : "hover:shadow-md"
            }`}
            onClick={() => onSelectPass(pass.id)}
          >
            {pass.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default">Recommended</Badge>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-sand-900 mb-1">
                  {pass.name}
                </h3>
                <p className="text-sm text-sand-700">{pass.description}</p>
              </div>

              <div>
                <span className="text-4xl font-bold text-terracotta-600">
                  ${pass.price}
                </span>
                {pass.credits && (
                  <span className="text-sand-700 ml-2">
                    ({pass.credits} {pass.credits === 1 ? "credit" : "credits"})
                  </span>
                )}
              </div>

              <ul className="space-y-2">
                {pass.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                    <span className="text-sand-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={selectedPassId === pass.id ? "default" : "outline"}
                className="w-full"
              >
                {selectedPassId === pass.id ? "Selected" : "Select"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
