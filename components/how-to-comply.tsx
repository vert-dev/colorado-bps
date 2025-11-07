"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, TrendingDown, Upload, AlertCircle } from "lucide-react"

export default function HowToComply() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">How to Comply with Colorado BPS</h2>
          <p className="text-lg text-slate-700">
            Follow these essential steps to meet Oregon's Building Performance Standard requirements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Step 1 */}
          <Card className="p-6 text-center border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Benchmark Your Building</h3>
            <p className="text-sm text-slate-600">
              Use EPA's ENERGY STAR Portfolio Manager to track your building's Energy Use Intensity (EUI).
            </p>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 text-center border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="w-12 h-12 bg-colorado-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2">
              <FileText className="w-6 h-6 text-colorado-gold-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Compare to Target (EUIt)</h3>
            <p className="text-sm text-slate-600">
              Determine your building-specific Energy Use Intensity Target (EUIt) based on building type and activity.
            </p>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 text-center border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2">
              <TrendingDown className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Implement Improvements</h3>
            <p className="text-sm text-slate-600">
              If EUI exceeds EUIt: Complete ASHRAE Level 2 audit and implement energy efficiency improvements.
            </p>
          </Card>

          {/* Step 4 */}
          <Card className="p-6 text-center border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Report Compliance</h3>
            <p className="text-sm text-slate-600">
              Submit energy data and compliance documentation to Colorado Energy Office (CEO) by your deadline.
            </p>
          </Card>
        </div>

        {/* Important callout for Tier differences */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-red-200 bg-red-50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Tier 1: Performance-Based</h3>
                <p className="text-slate-700 mb-2">
                  <strong>Commercial buildings ≥35,000 sq ft</strong>
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Must meet EUI performance targets (EUIt)</li>
                  <li>• Deadlines: June 2028/2029/2030 (by size)</li>
                  <li>• ASHRAE Level 2 audit required if EUI exceeds EUIt</li>
                  <li>• Penalties: $5,000 + $1/sq ft annually until compliant</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-colorado-blue-200 bg-colorado-blue-50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-colorado-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Tier 2: Reporting-Only</h3>
                <p className="text-slate-700 mb-2">
                  <strong>Commercial 20-35k + ALL institutional ≥35k sq ft</strong>
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Benchmarking and data reporting only</li>
                  <li>• Deadline: July 2028</li>
                  <li>• NO performance targets required</li>
                  <li>• NO penalties for any level of performance</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed compliance path */}
        <Card className="p-8 bg-white border-colorado-blue-200 mb-8">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Tier 1 Detailed Compliance Path
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Create Portfolio Manager Account</h4>
                <p className="text-sm text-slate-700">
                  Register your building in EPA's ENERGY STAR Portfolio Manager. Input building details: size, activity
                  type, operating hours, and occupancy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Collect 12 Months of Utility Data</h4>
                <p className="text-sm text-slate-700">
                  Gather electricity, natural gas, and other energy utility bills for a full 12-month period. Input data
                  monthly into Portfolio Manager to calculate your building's EUI (kBtu/sq ft/year).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Determine Your EUIt (Target)</h4>
                <p className="text-sm text-slate-700">
                  Colorado Energy Office will provide building-specific EUI targets (EUIt) based on your building type and primary
                  activity. These targets are set to median or better performance for your building category.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-gold-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Compare: EUI vs EUIt</h4>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>If EUI ≤ EUIt:</strong> Your building complies! Submit annual compliance report to CEO.
                </p>
                <p className="text-sm text-slate-700">
                  <strong>If EUI &gt; EUIt:</strong> Proceed to energy audit and improvement implementation (Steps 5-7).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Complete ASHRAE Level 2 Energy Audit</h4>
                <p className="text-sm text-slate-700">
                  Hire a qualified energy auditor to perform comprehensive building assessment. Audit identifies specific
                  energy conservation measures (ECMs) to achieve EUIt compliance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                6
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Implement Energy Efficiency Improvements</h4>
                <p className="text-sm text-slate-700">
                  Execute recommended ECMs: HVAC upgrades, lighting retrofits, building envelope improvements, controls
                  optimization. Apply for ECAPP/BERI grants to offset costs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                7
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Verify Compliance & Submit Documentation</h4>
                <p className="text-sm text-slate-700">
                  After improvements, track energy use for 12 months to confirm EUI now meets or beats EUIt. Submit
                  compliance documentation to Colorado Energy Office by your deadline.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline recommendation */}
        <Card className="p-6 bg-colorado-blue-50 border-colorado-blue-200 mb-8">
          <h3 className="font-semibold text-colorado-blue-800 mb-3 text-lg">⏰ Recommended Timeline</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-colorado-blue-700 mb-1">2-3 Years Before Deadline:</p>
              <p className="text-colorado-blue-600">
                Start benchmarking, complete energy audit, apply for incentives, plan capital improvements.
              </p>
            </div>
            <div>
              <p className="font-semibold text-colorado-blue-700 mb-1">12-18 Months Before Deadline:</p>
              <p className="text-colorado-blue-600">
                Execute major energy efficiency projects, track progress monthly, adjust strategy as needed.
              </p>
            </div>
            <div>
              <p className="font-semibold text-colorado-blue-700 mb-1">By Compliance Deadline:</p>
              <p className="text-colorado-blue-600">
                Verify EUI ≤ EUIt for full 12-month period, submit compliance report to CEO, avoid penalties.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-colorado-blue-500 hover:bg-colorado-blue-600 text-white px-8 mr-4"
            onClick={() => document.getElementById("compliance-help")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Compliance Help
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-colorado-blue-500 text-colorado-blue-700 hover:bg-colorado-blue-50"
            onClick={() => document.getElementById("interactive-checklist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Download Compliance Checklist
          </Button>
        </div>
      </div>
    </section>
  )
}
