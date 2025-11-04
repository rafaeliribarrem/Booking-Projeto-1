import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12 grid gap-6 md:grid-cols-3">
      {[
        {
          name: "Drop-in",
          price: "$20",
          desc: "One class. No commitment.",
          href: "/schedule",
        },
        {
          name: "5-Class Pack",
          price: "$85",
          desc: "Save and practice more.",
          href: "/schedule",
        },
        {
          name: "Unlimited Month",
          price: "$140",
          desc: "Best for frequent yogis.",
          href: "/schedule",
        },
      ].map((tier) => (
        <Card key={tier.name}>
          <CardHeader>
            <CardTitle>{tier.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{tier.price}</p>
            <p className="mt-2 text-muted-foreground">{tier.desc}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={tier.href}>Book now</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
