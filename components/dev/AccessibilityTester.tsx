"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  automatedTesting,
  screenReaderTestingChecklist,
  testingInstructions,
} from "@/lib/utils/screen-reader-testing";
import {
  validatedColorCombinations,
  accessibilityTesting,
} from "@/lib/utils/accessibility";
import {
  Eye,
  Keyboard,
  Volume2,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

/**
 * Development-only accessibility testing component
 * Remove from production builds
 */
export function AccessibilityTester() {
  const [testResults, setTestResults] = useState<any>(null);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [colorReport, setColorReport] = useState<any>(null);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Generate color contrast report
    setColorReport(accessibilityTesting.generateColorReport());
  }, []);

  const runAutomatedTests = () => {
    const report = automatedTesting.generateReport();
    setTestResults(report);
  };

  const testScenarios = [
    {
      id: "homepage",
      name: "Homepage Navigation",
      description: "Test homepage accessibility with screen reader",
      checklist: screenReaderTestingChecklist.homepage,
    },
    {
      id: "schedule",
      name: "Schedule Page",
      description: "Test schedule browsing and filtering",
      checklist: screenReaderTestingChecklist.schedule,
    },
    {
      id: "booking",
      name: "Booking Flow",
      description: "Test complete booking process",
      checklist: screenReaderTestingChecklist.booking,
    },
    {
      id: "dashboard",
      name: "User Dashboard",
      description: "Test dashboard navigation and management",
      checklist: screenReaderTestingChecklist.dashboard,
    },
    {
      id: "admin",
      name: "Admin Dashboard",
      description: "Test admin interface accessibility",
      checklist: screenReaderTestingChecklist.admin,
    },
  ];

  // Don't render in production
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="p-4 bg-cream-50 border-2 border-terracotta-200 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-terracotta-600" />
          <h3 className="font-semibold text-sand-900">A11y Tester</h3>
          <Badge variant="warning" className="text-xs">
            DEV
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Automated Tests */}
          <div>
            <Button
              size="sm"
              variant="outline"
              onClick={runAutomatedTests}
              className="w-full gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Run Automated Tests
            </Button>

            {testResults && (
              <div className="mt-2 p-3 bg-sand-50 rounded-base">
                <div className="flex items-center gap-2 mb-2">
                  {testResults.passed ? (
                    <CheckCircle className="w-4 h-4 text-sage-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-terracotta-600" />
                  )}
                  <span className="text-sm font-medium">
                    {testResults.passed
                      ? "All tests passed"
                      : `${testResults.issues.length} issues found`}
                  </span>
                </div>

                {testResults.issues.length > 0 && (
                  <ul className="text-xs text-sand-700 space-y-1">
                    {testResults.issues.map((issue: string, index: number) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Color Contrast Report */}
          {colorReport && (
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-sand-900 flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">
                  ▶
                </span>
                Color Contrast Report
              </summary>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {colorReport.map((item: any, index: number) => (
                  <div key={index} className="p-2 bg-sand-50 rounded text-xs">
                    <div className="font-medium">{item.combination}</div>
                    <div className="text-sand-600">
                      Ratio: {item.contrast} - {item.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Manual Testing Scenarios */}
          <div>
            <h4 className="text-sm font-medium text-sand-900 mb-2 flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              Manual Tests
            </h4>
            <div className="space-y-2">
              {testScenarios.map((scenario) => (
                <details key={scenario.id} className="group">
                  <summary className="cursor-pointer text-xs text-sand-700 hover:text-sand-900 flex items-center gap-2">
                    <span className="group-open:rotate-90 transition-transform">
                      ▶
                    </span>
                    {scenario.name}
                  </summary>
                  <div className="mt-2 p-2 bg-sand-50 rounded">
                    <p className="text-xs text-sand-600 mb-2">
                      {scenario.description}
                    </p>
                    <ul className="text-xs text-sand-700 space-y-1">
                      {scenario.checklist.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-terracotta-600 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Screen Reader Instructions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-sand-900 flex items-center gap-2">
              <span className="group-open:rotate-90 transition-transform">
                ▶
              </span>
              <Volume2 className="w-4 h-4" />
              Screen Reader Setup
            </summary>
            <div className="mt-2 space-y-3">
              <div>
                <h5 className="text-xs font-medium text-sand-900 mb-1">
                  macOS VoiceOver
                </h5>
                <ul className="text-xs text-sand-700 space-y-1">
                  {testingInstructions.voiceOver.setup.map((step, index) => (
                    <li key={index}>• {step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-medium text-sand-900 mb-1">
                  Windows NVDA
                </h5>
                <ul className="text-xs text-sand-700 space-y-1">
                  {testingInstructions.nvda.setup.map((step, index) => (
                    <li key={index}>• {step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Focus first heading
                const firstHeading = document.querySelector("h1, h2");
                if (firstHeading) {
                  (firstHeading as HTMLElement).focus();
                }
              }}
              className="text-xs"
            >
              Focus H1
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Focus main content
                const mainContent = document.querySelector(
                  'main, [role="main"]'
                );
                if (mainContent) {
                  (mainContent as HTMLElement).focus();
                }
              }}
              className="text-xs"
            >
              Focus Main
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
