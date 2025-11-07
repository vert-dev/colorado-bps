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
          <p className="text-lg text-slate-700">Colorado BPS compliance timeline for buildings ≥50,000 sq ft</p>
          <p className="text-sm text-slate-500 mt-2">Per HB 21-1286 (2021) and Colorado Energy Office regulations</p>
        </div>

        <div className="space-y-4 mb-12">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Deadline: December 31, 2025</AlertTitle>
            <AlertDescription>
              Complete energy audit, select compliance pathway, and file compliance plan by <strong>December 31, 2025</strong>.
              This is mandatory for all buildings ≥50k sqft and determines your path to 2026 & 2030 targets.
            </AlertDescription>
          </Alert>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Annual Benchmarking Required</AlertTitle>
            <AlertDescription>
              Annual benchmarking reports due <strong>August 1 each year</strong> with $100/building fee.
              Penalties: $500 (first occurrence), $2,000 (subsequent occurrences).
            </AlertDescription>
          </Alert>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-slate-200"></div>

          <div className="space-y-8">
            {/* 2024-2025: Benchmarking & Planning */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8">
                <Card className="p-6 border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <Badge className="bg-blue-100 text-blue-800">Ongoing</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">2024-2025: Benchmarking & Planning Phase</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Annual Deadline:</strong> August 1 each year
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirements:</strong> Submit annual benchmarking report via Energy Star Portfolio Manager
                    </p>
                    <p>
                      <strong>Fee:</strong> $100 per building per year
                    </p>
                    <p>
                      <strong>Penalties:</strong> $500 (first failure), $2,000 (subsequent failures)
                    </p>
                    <p className="text-blue-600 font-semibold">
                      Action: Set up Portfolio Manager account and connect to Colorado BEAM Portal
                    </p>
                  </div>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* December 2025: Audit & Pathway Selection */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-colorado-red-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8">
                <Card className="p-6 border-red-200 bg-red-50">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <Badge variant="destructive">Critical Deadline</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">December 31, 2025: Audit & Pathway Selection</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Deadline:</strong> December 31, 2025
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirements:</strong> Complete energy audit, select compliance pathway, file compliance plan
                    </p>
                    <p>
                      <strong>3 Pathway Options:</strong> Energy Efficiency, GHG Reduction, or Standard % Reduction
                    </p>
                    <p className="text-red-600 font-semibold">
                      This determines your interim and final targets
                    </p>
                    <p>
                      <strong>Recommended:</strong> Start audit process in early 2025
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* December 2026: Interim Target */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8">
                <Card className="p-6 border-yellow-200 bg-yellow-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <Badge className="bg-yellow-100 text-yellow-800">Interim Target</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">December 31, 2026: Interim Performance Target</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Target:</strong> 7% reduction from 2021 baseline
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirements:</strong> Meet interim EUI or GHG targets based on selected pathway
                    </p>
                    <p>
                      <strong>Verification:</strong> Submit compliance report via Building Owner Portal
                    </p>
                    <p className="text-yellow-700 font-semibold">
                      Monthly penalties begin June 1, 2027 if non-compliant
                    </p>
                  </div>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8"></div>
            </div>

            {/* June 2027: Penalties Begin */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-colorado-red-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8">
                <Card className="p-6 border-red-200 bg-red-50">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <Badge variant="destructive">Enforcement Begins</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">June 1, 2027: Monthly Interim Penalties Begin</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Enforcement:</strong> Monthly penalties for missing 2026 targets
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Penalty Structure:</strong> Based on degree of non-compliance (monthly)
                    </p>
                    <p className="text-red-600 font-semibold">
                      Penalties continue monthly until compliance is achieved
                    </p>
                    <p>
                      <strong>Avoidance:</strong> Meet 2026 interim targets to avoid all penalties
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* December 2030: Final Target */}
            <div className="relative flex items-center">
              <div className="flex-1 pr-8">
                <Card className="p-6 border-colorado-blue-200 bg-colorado-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-colorado-blue-600" />
                    <Badge className="bg-colorado-blue-100 text-colorado-blue-800">Final Target</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">December 31, 2030: Final Performance Target</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Target:</strong> 20% reduction from 2021 baseline
                  </p>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <strong>Requirements:</strong> Meet final EUI or GHG targets based on selected pathway
                    </p>
                    <p>
                      <strong>Long-term Goal:</strong> Sustained energy/emissions reductions through 2050
                    </p>
                    <p className="text-colorado-blue-700 font-semibold">
                      Monthly penalties begin June 1, 2031 if non-compliant
                    </p>
                  </div>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-colorado-blue-500 rounded-full border-4 border-white"></div>
              <div className="flex-1 pl-8"></div>
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="mt-12">
          <div className="p-6 bg-gradient-to-r from-colorado-blue-50 to-colorado-gold-50 border border-colorado-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-colorado-blue-800 mb-4">Compliance Timeline Summary</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold text-colorado-blue-700 mb-2">Annual (2024+)</p>
                <ul className="space-y-1 text-slate-600">
                  <li>• Benchmark by Aug 1</li>
                  <li>• Pay $100 fee</li>
                  <li>• Submit to CEO</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-colorado-red-700 mb-2">2025-2026</p>
                <ul className="space-y-1 text-slate-600">
                  <li>• Complete audit (by Dec 31, 2025)</li>
                  <li>• Select pathway</li>
                  <li>• Meet 7% target (by Dec 31, 2026)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-colorado-blue-700 mb-2">2027-2030</p>
                <ul className="space-y-1 text-slate-600">
                  <li>• Avoid monthly penalties</li>
                  <li>• Continue improvements</li>
                  <li>• Meet 20% target (by Dec 31, 2030)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
