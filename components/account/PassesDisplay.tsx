import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar } from "lucide-react";

interface Pass {
  id: string;
  type: string;
  creditsRemaining?: number;
  totalCredits?: number;
  expiresAt?: string;
  status: "active" | "expired";
}

interface PassesDisplayProps {
  activePasses: Pass[];
  expiredPasses: Pass[];
}

export function PassesDisplay({
  activePasses,
  expiredPasses,
}: PassesDisplayProps) {
  const renderPass = (pass: Pass) => {
    const isExpired = pass.status === "expired";
    const hasCredits = pass.creditsRemaining !== undefined;

    return (
      <Card key={pass.id} className={`p-6 ${isExpired ? "opacity-60" : ""}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-sand-900 mb-1">
              {pass.type}
            </h3>
            {isExpired ? (
              <Badge variant="outline">Expired</Badge>
            ) : (
              <Badge variant="success">Active</Badge>
            )}
          </div>
          <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-terracotta-600" />
          </div>
        </div>

        {hasCredits && (
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-sand-900">
                {pass.creditsRemaining}
              </span>
              <span className="text-sand-700">
                / {pass.totalCredits} credits left
              </span>
            </div>
            <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sage-500 transition-all"
                style={{
                  width: `${
                    ((pass.creditsRemaining || 0) / (pass.totalCredits || 1)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        {pass.expiresAt && (
          <div className="flex items-center gap-2 text-sm text-sand-700">
            <Calendar className="w-4 h-4" />
            <span>
              {isExpired ? "Expired" : "Expires"} {pass.expiresAt}
            </span>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Active Passes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-sand-900">Active Passes</h2>
          <Button asChild>
            <Link href="/pricing">Purchase Pass</Link>
          </Button>
        </div>

        {activePasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePasses.map(renderPass)}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-sand-700 mb-4">
              You don't have any active passes
            </p>
            <Button asChild>
              <Link href="/pricing">Browse Passes</Link>
            </Button>
          </Card>
        )}
      </div>

      {/* Expired Passes */}
      {expiredPasses.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center justify-between py-4 border-t border-sand-200">
              <h3 className="font-semibold text-sand-900">
                Expired Passes ({expiredPasses.length})
              </h3>
              <span className="text-sand-700 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </div>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {expiredPasses.map(renderPass)}
          </div>
        </details>
      )}
    </div>
  );
}
