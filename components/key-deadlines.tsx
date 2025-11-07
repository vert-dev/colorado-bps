"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

export default function KeyDeadlines() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Key Deadlines & Compliance Requirements</h2>
          <p className="text-lg text-slate-700">Colorado BPS compliance deadlines by building tier and size</p>
          <p className="text-sm text-slate-500 mt-2">Per HB 21-1286 (2021) and Oregon Administrative Rules (OAR 330-140)</p>
        </div>

        <div className="space-y-4 mb-12">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>First Compliance Period Approaching</AlertTitle>
            <AlertDescription>
              Tier 1 buildings ≥100k sq ft must meet EUI targets by <strong>June 2028</strong>.
              Energy audits and improvement plans should begin in 2025-2026 to ensure adequate time for implementation.
            </AlertDescription>
          </Alert>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Early Compliance Incentives Available</AlertTitle>
            <AlertDescription>
              ECAPP fund ($2M) available for early compliance 2025-2027. BERI grants ($12M federal) support energy efficiency implementations.
              <strong> Apply early - funding is limited and competitive.</strong>
            </AlertDescription>
          </Alert>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-slate-200"></div>

          <div className="space-y-8">
            {/* Tier 2 Reporting Begins */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8">
                <Card className="p-6 border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <Badge className="bg-blue-100 text-blue-800">Tier 2 Reporting</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Tier 2: Initial Reporting Deadline</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Reporting Due:</strong> July 2028
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Covered Buildings:</strong> Commercial 20-35k sq ft + ALL institutional ≥35k sq ft
                    </p>
                    <p>
                      <strong>Requirements:</strong> Energy benchmarking via Energy Star Portfolio Manager, submit data to Colorado Energy Office
                    </p>
                    <p className="text-blue-600 font-semibold">
                      Note: Tier 2 is reporting-only. No performance targets or penalties.
                    </p>
                    <p>
                      <strong>Action Items:</strong> Create Portfolio Manager account, establish benchmarking process
                    </p>
                  </div>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* Tier 1 Largest Buildings */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8">
                <Card className="p-6 border-red-200 bg-red-50">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <Badge variant="destructive">Performance Target</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Tier 1: Commercial ≥100,000 sq ft</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Compliance Due:</strong> June 2028
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirement:</strong> Meet building-specific EUI target (EUIt) based on activity type
                    </p>
                    <p className="text-red-600 font-semibold">
                      <strong>Penalties if non-compliant:</strong> $5,000 + $1.00/sq ft annually
                    </p>
                    <p>
                      <strong>Recommended Timeline:</strong> Complete ASHRAE Level 2 audit by 2026, begin improvements 2026-2027
                    </p>
                    <p>
                      <strong>Incentives:</strong> ECAPP early compliance fund, BERI implementation grants
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Tier 1 Medium Buildings */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8">
                <Card className="p-6 border-amber-200 bg-amber-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <Badge className="bg-amber-100 text-amber-800">Tier 1</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Tier 1: Commercial 50-100k sq ft</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Compliance Due:</strong> June 2029
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirement:</strong> Meet building-specific EUI target (EUIt)
                    </p>
                    <p className="text-amber-600 font-semibold">
                      <strong>Penalties if non-compliant:</strong> $5,000 + $1.00/sq ft annually
                    </p>
                    <p>
                      <strong>Recommended Timeline:</strong> Complete audit by 2027, implement improvements 2027-2028
                    </p>
                    <p>
                      <strong>Advantage:</strong> Learn from 2028 compliance cycle, leverage proven strategies
                    </p>
                  </div>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* Tier 1 Smallest Buildings */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-400 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8">
                <Card className="p-6 border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <Badge variant="secondary">Tier 1</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Tier 1: Commercial 35-50k sq ft</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Compliance Due:</strong> June 2030
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirement:</strong> Meet building-specific EUI target (EUIt)
                    </p>
                    <p className="text-slate-600">
                      <strong>Penalties if non-compliant:</strong> $5,000 + $1.00/sq ft annually
                    </p>
                    <p>
                      <strong>Recommended Timeline:</strong> Complete audit by 2028, implement improvements 2028-2029
                    </p>
                    <p className="text-colorado-gold-600 font-semibold">
                      Maximum time to prepare - use it wisely to avoid costly rush implementations
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800 mb-2">🚨 Penalties Are Real and Significant:</p>
                <p className="text-red-700 mb-2">
                  Tier 1 non-compliance carries penalties of <strong>$5,000 + $1/sq ft annually</strong>.
                  For a 100,000 sq ft building, that's <strong>$105,000/year</strong> in ongoing penalties.
                </p>
                <p className="text-red-800 font-semibold">
                  Start planning now. Energy audits take 3-6 months, and implementation projects can take 12-18 months.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-colorado-blue-50 border border-colorado-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-colorado-blue-800 mb-2">Early Compliance Incentives:</p>
                <p className="text-colorado-blue-700">
                  <strong>ECAPP ($2M state fund):</strong> Available 2025-2027 for early compliance projects.
                  Competitive grants for buildings that achieve compliance ahead of deadlines.
                </p>
                <p className="text-colorado-blue-700 mt-2">
                  <strong>BERI ($12M federal grant):</strong> Implementation funding for energy efficiency improvements.
                  Prioritizes projects with high energy savings potential.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">Understanding EUI vs EUIt:</p>
                <p className="text-amber-700">
                  <strong>EUI (Energy Use Intensity):</strong> Your building's actual energy use per square foot per year.
                  Calculated from utility bills and benchmarked in Energy Star Portfolio Manager.
                </p>
                <p className="text-amber-700 mt-2">
                  <strong>EUIt (Energy Use Intensity Target):</strong> Oregon's performance target for your building type and activity.
                  Your EUI must be ≤ your EUIt to comply.
                </p>
              </div>
            </div>
          </div>

          {/* Portland Buildings - Dual Compliance */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold mt-0.5">
                PDX
              </div>
              <div>
                <p className="font-semibold text-blue-800 mb-2">Portland Buildings - Local Ordinances May Apply:</p>
                <p className="text-blue-700">
                  Portland may have additional local energy benchmarking or performance requirements.
                  Check with City of Portland Bureau of Planning and Sustainability for any supplementary compliance obligations.
                  Coordinate state and local compliance strategies to avoid duplication and maximize efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
