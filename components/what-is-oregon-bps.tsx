"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, School, TrendingDown, AlertCircle } from "lucide-react"

export default function WhatIsOregonBPS() {
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
              Colorado BPS is a state law (HB 21-1286, 2021) requiring commercial and institutional buildings to meet energy
              performance targets or report energy use data. The standard uses Energy Use Intensity (EUI) benchmarking
              to drive energy efficiency improvements across Oregon's building stock.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Building className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Tier 1: Performance-Based</p>
                  <p className="text-slate-700">
                    <strong>Commercial buildings ≥35,000 sq ft</strong> must meet energy performance targets (EUIt) by
                    June 2028/2029/2030 (based on size). Penalties apply for non-compliance: $5,000 + $1/sq ft annually.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <School className="w-6 h-6 text-colorado-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Tier 2: Reporting-Only</p>
                  <p className="text-slate-700">
                    <strong>Commercial 20-35k sq ft + ALL institutional buildings ≥35k sq ft</strong> must benchmark and
                    report energy data by <strong>July 2028</strong>. NO performance targets, NO penalties.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-colorado-blue-50 p-4 rounded-lg border border-colorado-blue-200 mb-6">
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-colorado-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-800">
                    <strong>How EUI/EUIt Works:</strong> Your building's Energy Use Intensity (EUI) is calculated from
                    utility bills in kBtu/sq ft/year. Oregon sets performance targets (EUIt) by building type. If your
                    EUI exceeds your EUIt, you must complete energy audits and implement improvements to comply.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-colorado-blue-500 text-colorado-blue-700 hover:bg-colorado-blue-50 bg-transparent"
              onClick={() =>
                window.open("https://www.oregon.gov/energy/energy-oregon/Pages/Building-Performance-Standards.aspx")
              }
            >
              Learn More About Colorado BPS
            </Button>
          </div>

          {/* Right column - Infographic */}
          <div className="space-y-4">
            <Card className="p-6 border-red-200 bg-red-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Tier 1 Buildings</h3>
                  <p className="text-sm text-slate-600">Commercial ≥35,000 sq ft</p>
                </div>
              </div>
              <div className="text-sm text-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span>≥100,000 sq ft</span>
                  <span className="font-medium text-red-700">June 2028</span>
                </div>
                <div className="flex justify-between">
                  <span>50-100k sq ft</span>
                  <span className="font-medium text-red-700">June 2029</span>
                </div>
                <div className="flex justify-between">
                  <span>35-50k sq ft</span>
                  <span className="font-medium text-red-700">June 2030</span>
                </div>
                <div className="mt-3 pt-3 border-t border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-700">
                      <strong>Penalties:</strong> $5,000 + $1/sq ft annually until compliant
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-colorado-blue-200 bg-colorado-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-colorado-blue-600 rounded-lg flex items-center justify-center">
                  <School className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Tier 2 Buildings</h3>
                  <p className="text-sm text-slate-600">Commercial 20-35k + Institutional ≥35k</p>
                </div>
              </div>
              <div className="text-sm text-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span>Benchmarking Required</span>
                  <span className="font-medium text-colorado-blue-700">July 2028</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Reporting</span>
                  <span className="font-medium text-colorado-blue-700">Ongoing</span>
                </div>
                <div className="mt-3 pt-3 border-t border-colorado-blue-200">
                  <p className="text-xs text-colorado-blue-700 font-semibold">
                    ✓ Reporting-only: NO performance targets, NO penalties
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-colorado-gold-300 bg-colorado-gold-50">
              <div className="text-sm text-slate-800">
                <p className="font-semibold mb-2">Institutional Buildings Include:</p>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• Schools, colleges, universities</li>
                  <li>• Hospitals and healthcare facilities</li>
                  <li>• Government buildings</li>
                  <li>• Libraries, museums, community centers</li>
                </ul>
                <p className="text-xs text-colorado-blue-600 mt-2 font-semibold">
                  All institutional buildings ≥35k sqft are Tier 2 (reporting-only)
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
