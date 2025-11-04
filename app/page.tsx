import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Transform Your{" "}
              <span className="text-primary">Practice</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Experience the heat, feel the energy, and discover your strength at Serenity Yoga Studio.
              From flowing Vinyasa to restorative Yin, we offer classes for every body and every level.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/schedule">Book Your First Class</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-gradient-to-l from-accent/10 to-transparent blur-3xl" />
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Serenity?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're more than just a studio—we're a community dedicated to your wellness journey.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <CardTitle className="text-xl">Beautiful Studio Space</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Natural light, premium props, and a warm atmosphere designed to help you disconnect and focus on your practice.
            </CardContent>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Expert Instructors</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Learn from compassionate, certified teachers who bring years of experience and genuine care to every class.
            </CardContent>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Flexible Pricing</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Choose from drop-in classes, multi-class packs, or unlimited monthly memberships. No commitment required.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
