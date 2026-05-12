"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp } from "lucide-react"

export default function Pitfalls() {
  const scrollToMasterclass = () => {
    document.getElementById("masterclass")?.scrollIntoView({ behavior: "smooth" })
  }

  const pitfalls = [
    {
      number: 1,
      title: "Skipping benchmarking while you plan",
      description:
        "Annual benchmarking is its own requirement. Missing the June 1 BEAM Portal submission triggers $500 / $2,000 penalties regardless of your performance pathway.",
    },
    {
      number: 2,
      title: "Picking a pathway without a 2021 baseline check",
      description:
        "Targeted EUI, GHG Reduction, and Standard % Reduction each compare to a 2021 baseline. Lock and verify the baseline before choosing — the wrong pathway can lock you into a steeper reduction.",
    },
    {
      number: 3,
      title: "Waiting until December 2025 to file the audit",
      description:
        "ASHRAE Level 2 audits, compliance plan, and pathway selection are all due December 31, 2025. A 30-day audit can't be started on December 1 — start now.",
    },
    {
      number: 4,
      title: "Skipping the BEAM Portal Web Services connection",
      description:
        "ENERGY STAR Portfolio Manager must be connected to Colorado's BEAM Portal via Web Services. Without the connection, submitted data may not count.",
    },
    {
      number: 5,
      title: "Counting on Oregon ECAPP / BERI grants",
      description:
        "Those are Oregon-only programs. Colorado's incentive stack is federal IRA 179D / 45L plus utility rebates from Xcel Energy, Black Hills Energy, and municipal providers.",
    },
    {
      number: 6,
      title: "Ignoring local ordinances on top of state BPS",
      description:
        "Denver and other municipalities have local energize / GHG ordinances that layer on top of HB 21-1286. Confirm your building isn't subject to additional local deadlines.",
    },
  ]

  return (
    <section id="pitfalls" className="py-10 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold">The 6 Common Colorado BPS Pitfalls</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Avoid these costly mistakes that cause most compliance issues and penalties
              </p>
              <div className="text-xs text-slate-500 mb-4">
                Based on HB 21-1286 and CDPHE Regulation 28 (5 CCR 1001-32)
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-sm">Penalty Snapshot</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>First benchmarking miss</span>
                  <span className="font-medium text-orange-600">$500</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-1/5"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Subsequent miss</span>
                  <span className="font-medium text-red-600">$2,000</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-2/3"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Performance penalties</span>
                  <span className="font-medium text-red-600">Monthly</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full w-full"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  *Performance penalties begin June 1, 2027 (interim) and June 1, 2031 (final). Annual benchmarking fee:
                  $100/building.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {pitfalls.map((pitfall) => (
              <Card key={pitfall.number} className="bg-white border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xs">
                      {pitfall.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">{pitfall.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed">{pitfall.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={scrollToMasterclass} className="bg-slate-700 hover:bg-slate-800 text-white">
              Get Expert Help with These Pitfalls →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
