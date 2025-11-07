"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, TrendingDown, Upload, AlertCircle, GitBranch } from "lucide-react"

export default function HowToComply() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">How to Comply with Colorado BPS</h2>
          <p className="text-lg text-slate-700">
            Follow these essential steps to meet Colorado's Building Performance Standard requirements
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
              Use EPA's ENERGY STAR Portfolio Manager to establish your 2021 baseline and track annual energy use (Site EUI).
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
            <h3 className="font-semibold text-slate-800 mb-3">Complete Energy Audit</h3>
            <p className="text-sm text-slate-600">
              Hire qualified auditor to assess your building and identify energy/emissions reduction opportunities by Dec 31, 2025.
            </p>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 text-center border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2">
              <GitBranch className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Select Pathway</h3>
            <p className="text-sm text-slate-600">
              Choose Energy Efficiency, GHG Reduction, or Standard % Reduction pathway by Dec 31, 2025.
            </p>
          </Card>

          {/* Step 4 */}
          <Card className="p-6 text-center border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2">
              <TrendingDown className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Implement & Track</h3>
            <p className="text-sm text-slate-600">
              Execute improvements, track progress monthly, and meet 7% (2026) and 20% (2030) reduction targets.
            </p>
          </Card>
        </div>

        {/* Three Pathways Explained */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Choose Your Compliance Pathway
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-colorado-blue-200 bg-colorado-blue-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-colorado-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Pathway 1: Energy Efficiency</h3>
                  <p className="text-slate-700 mb-2 text-sm">
                    <strong>Reduce Site EUI</strong> by 7% (2026) and 20% (2030) from 2021 baseline
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• HVAC system upgrades</li>
                    <li>• LED lighting retrofits</li>
                    <li>• Building envelope improvements</li>
                    <li>• Controls & automation</li>
                  </ul>
                  <p className="text-xs text-colorado-blue-600 mt-2 font-semibold">
                    Best for: Most buildings
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-colorado-gold-200 bg-colorado-gold-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-colorado-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Pathway 2: GHG Reduction</h3>
                  <p className="text-slate-700 mb-2 text-sm">
                    <strong>Reduce emissions</strong> by 7% (2026) and 20% (2030) from 2021 baseline
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Electrification (heat pumps)</li>
                    <li>• On-site solar/renewables</li>
                    <li>• Renewable Energy Credits (RECs)</li>
                    <li>• Fuel switching strategies</li>
                  </ul>
                  <p className="text-xs text-colorado-gold-600 mt-2 font-semibold">
                    Best for: Electrification plans
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-200 bg-slate-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GitBranch className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Pathway 3: Standard % Reduction</h3>
                  <p className="text-slate-700 mb-2 text-sm">
                    <strong>Fixed reductions:</strong> 13% interim / 29% final
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Only if 2021 EUI is 29%+ above target</li>
                    <li>• Choose any mix of measures</li>
                    <li>• Fixed % regardless of building type</li>
                    <li>• Alternative to assigned targets</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-2 font-semibold">
                    Best for: High baseline buildings
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed compliance path */}
        <Card className="p-8 bg-white border-colorado-blue-200 mb-8">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Detailed Compliance Steps
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Create Portfolio Manager Account & Establish 2021 Baseline</h4>
                <p className="text-sm text-slate-700">
                  Register your building in EPA's ENERGY STAR Portfolio Manager. Input 2021 utility data (or most recent
                  12-month period) to establish your baseline Site EUI or GHGI. This baseline is critical for calculating
                  your 7% and 20% reduction targets.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Connect to BEAM Portal & Submit Annual Reports</h4>
                <p className="text-sm text-slate-700">
                  Connect Portfolio Manager to Colorado's BEAM Portal using Web Services. Submit annual benchmarking
                  report + $100 fee by August 1 each year. BEAM Portal provides customized compliance reports showing
                  your current performance against targets.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Complete Energy Audit by December 31, 2025</h4>
                <p className="text-sm text-slate-700">
                  Hire qualified energy auditor to perform comprehensive building assessment. Audit identifies specific
                  measures to achieve compliance, cost estimates, and payback periods. This audit is mandatory and must
                  be submitted to Colorado Energy Office by Dec 31, 2025.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-gold-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Select Compliance Pathway by December 31, 2025</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Based on audit findings, choose the pathway that best aligns with your building's capabilities:
                </p>
                <ul className="text-sm text-slate-700 space-y-1 ml-4">
                  <li>• <strong>Energy Efficiency:</strong> If traditional improvements (HVAC, lighting, envelope) are most cost-effective</li>
                  <li>• <strong>GHG Reduction:</strong> If electrification, renewables, or RECs make more sense</li>
                  <li>• <strong>Standard %:</strong> If your baseline is significantly above target (29%+)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Implement Improvements & Meet Interim Target (Dec 31, 2026)</h4>
                <p className="text-sm text-slate-700">
                  Execute energy efficiency or emissions reduction measures identified in audit. Track progress monthly
                  in Portfolio Manager. Meet 7% reduction target by December 31, 2026 to avoid monthly penalties starting
                  June 1, 2027.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                6
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Continue Improvements & Meet Final Target (Dec 31, 2030)</h4>
                <p className="text-sm text-slate-700">
                  Continue implementing measures to achieve 20% reduction by December 31, 2030. Track energy use or
                  emissions annually. Submit compliance verification through BEAM Portal. Avoid monthly penalties starting
                  June 1, 2031 by meeting final targets.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-colorado-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                7
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Ongoing Benchmarking & Compliance Reporting</h4>
                <p className="text-sm text-slate-700">
                  Continue annual benchmarking (August 1 deadline) and submit compliance documentation showing you maintain
                  20% reduction through 2050. Pathway selection can be changed in future compliance cycles if needed.
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
              <p className="font-semibold text-colorado-blue-700 mb-1">Now - December 2025:</p>
              <p className="text-colorado-blue-600">
                Complete energy audit, develop compliance plan, select pathway, apply for IRA tax credits. This is CRITICAL—deadline is December 31, 2025.
              </p>
            </div>
            <div>
              <p className="font-semibold text-colorado-blue-700 mb-1">2025-2026:</p>
              <p className="text-colorado-blue-600">
                Execute Phase 1 improvements to achieve 7% interim target by Dec 31, 2026. Track progress monthly to avoid June 2027 penalties.
              </p>
            </div>
            <div>
              <p className="font-semibold text-colorado-blue-700 mb-1">2027-2030:</p>
              <p className="text-colorado-blue-600">
                Complete remaining improvements to achieve 20% final target by Dec 31, 2030. Maintain compliance through 2050.
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
