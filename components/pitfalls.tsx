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
      title: "Assuming Tier 2 has a 12-month rule",
      description:
        "Tier 2 only requires EMP & O&M to be 'complete and being implemented' by July 1, 2027. The 12-month look-back applies to Tier 1 only.",
    },
    {
      number: 2,
      title: "Marketing a single EUIt target",
      description:
        "Energy targets vary by activity mix, operating hours, climate zone, and building type. Always compute Form B first for accurate targets.",
    },
    {
      number: 3,
      title: "Waiting on the compliance portal",
      description:
        "Tier 2 owners can start filing July 1, 2025. Digital signatures are required to submit - don't wait until the deadline.",
    },
    {
      number: 4,
      title: "Skipping the Energy Manager role",
      description:
        "The Qualified Energy Manager (QEM) is explicitly required on forms and expected by Commerce for both tiers.",
    },
    {
      number: 5,
      title: "Missing conditional compliance deadlines",
      description:
        "Tier 1 conditional applications must be submitted ≥180 days before compliance date. Plan ahead for audit and investment criteria pathways.",
    },
    {
      number: 6,
      title: "Ignoring Seattle BEPS overlay requirements",
      description:
        "Seattle buildings must comply with both WA CBPS AND Seattle's Building Emissions Performance Standard (BEPS) - separate laws with different timelines.",
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
                <h2 className="text-2xl font-bold">The 6 Common Pitfalls</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Avoid these costly mistakes that cause most compliance issues and penalties
              </p>
              <div className="text-xs text-slate-500 mb-4">
                Based on RCW 19.27A.210 requirements and WAC 194-50 implementation rules
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-sm">Penalty Comparison by Tier</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Tier 1 Base Fine</span>
                  <span className="font-medium text-red-600">$5,000</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-1/6"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>+ $1.00/sq ft annually</span>
                  <span className="font-medium text-red-600">$273.97/day</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full w-full"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Tier 2 Flat Fee</span>
                  <span className="font-medium text-orange-600">$0.30/sq ft</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-1/5"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">*Per RCW 19.27A.230, adjusted annually for inflation</p>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold mt-0.5">
                SEA
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Seattle Buildings: Dual Compliance Required</h3>
                <p className="text-sm text-blue-800">
                  Seattle properties must comply with <strong>both</strong> WA CBPS <strong>and</strong> Seattle's
                  Building Emissions Performance Standard (BEPS). BEPS has separate GHG reporting requirements starting
                  2027 and performance targets beginning 2031-2033.
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
