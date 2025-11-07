"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, TrendingDown, Calendar, AlertCircle } from "lucide-react"

export default function WhatIsColoradoBPS() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              What is the Colorado Building Performance Standard?
            </h2>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Colorado BPS is a state law (HB 21-1286, passed in 2021) requiring buildings 50,000 sq ft or larger
              to benchmark energy use annually and meet performance targets through one of three compliance pathways.
              The law is emissions-focused, giving building owners flexibility to choose the best path for their property.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Building className="w-6 h-6 text-colorado-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Buildings Covered</p>
                  <p className="text-slate-700">
                    All buildings <strong>≥50,000 sq ft</strong> (commercial, institutional, residential). No exemptions based
                    on building type—single threshold applies to all.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-colorado-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Key Deadlines</p>
                  <p className="text-slate-700">
                    <strong>Dec 31, 2025:</strong> Energy audit + compliance plan + pathway selection<br />
                    <strong>Dec 31, 2026:</strong> Meet interim targets (7% reduction)<br />
                    <strong>Dec 31, 2030:</strong> Meet final targets (20% reduction)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="w-6 h-6 text-colorado-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Three Compliance Pathways</p>
                  <p className="text-slate-700">
                    Choose from <strong>Energy Efficiency</strong> (reduce Site EUI), <strong>GHG Reduction</strong> (reduce emissions),
                    or <strong>Standard % Reduction</strong> (fixed 13%/29% cuts). Select the best fit for your building by Dec 2025.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-colorado-blue-50 p-4 rounded-lg border border-colorado-blue-200 mb-6">
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-colorado-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-800">
                    <strong>How Colorado BPS Works:</strong> Establish your 2021 baseline energy use, then reduce either
                    energy consumption (Site EUI) or greenhouse gas emissions (GHGI) by 7% (2026) and 20% (2030). Choose
                    the pathway that aligns with your building's capabilities and investment plans.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-colorado-blue-500 text-colorado-blue-700 hover:bg-colorado-blue-50 bg-transparent"
              onClick={() =>
                window.open("https://energyoffice.colorado.gov/building-performance")
              }
            >
              Learn More About Colorado BPS
            </Button>
          </div>

          {/* Right column - Infographic */}
          <div className="space-y-4">
            <Card className="p-6 border-colorado-blue-200 bg-colorado-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-colorado-blue-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Covered Buildings</h3>
                  <p className="text-sm text-slate-600">≥50,000 sq ft (all types)</p>
                </div>
              </div>
              <div className="text-sm text-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span>Annual Benchmarking</span>
                  <span className="font-medium text-colorado-blue-700">August 1 deadline</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit + Plan + Pathway</span>
                  <span className="font-medium text-colorado-blue-700">Dec 31, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Interim Target (7%)</span>
                  <span className="font-medium text-colorado-blue-700">Dec 31, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Target (20%)</span>
                  <span className="font-medium text-colorado-blue-700">Dec 31, 2030</span>
                </div>
                <div className="mt-3 pt-3 border-t border-colorado-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-colorado-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-colorado-blue-700">
                      <strong>Penalties:</strong> Monthly penalties begin June 2027 (interim) and June 2031 (final) if non-compliant
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-colorado-gold-200 bg-colorado-gold-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-colorado-gold-600 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Three Pathways</h3>
                  <p className="text-sm text-slate-600">Choose by Dec 31, 2025</p>
                </div>
              </div>
              <div className="text-sm text-slate-700 space-y-2">
                <div>
                  <p className="font-medium text-colorado-gold-700">1. Energy Efficiency</p>
                  <p className="text-xs">Reduce Site EUI by 7% (2026) and 20% (2030)</p>
                </div>
                <div>
                  <p className="font-medium text-colorado-gold-700">2. GHG Reduction</p>
                  <p className="text-xs">Reduce emissions by 7% (2026) and 20% (2030)</p>
                </div>
                <div>
                  <p className="font-medium text-colorado-gold-700">3. Standard % Reduction</p>
                  <p className="text-xs">13% interim / 29% final (if baseline 29%+ above target)</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-slate-200 bg-slate-50">
              <div className="text-sm text-slate-800">
                <p className="font-semibold mb-2">Benchmarking Requirements:</p>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• Use Energy Star Portfolio Manager</li>
                  <li>• Connect to Colorado's BEAM Portal</li>
                  <li>• Submit annual report + $100 fee</li>
                  <li>• August 1 deadline each year</li>
                </ul>
                <p className="text-xs text-colorado-blue-600 mt-2 font-semibold">
                  Benchmarking enforcement began January 1, 2024
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
