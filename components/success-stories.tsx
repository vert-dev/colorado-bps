"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Users, TrendingUp, CheckCircle, Star, Clock } from "lucide-react"

const successStories = [
  {
    id: 1,
    buildingType: "Office Complex",
    size: "150,000 sq ft",
    pathway: "Energy Efficiency",
    location: "Denver, CO",
    challenge: "Building was tracking above its Site EUI target with aging HVAC systems",
    solution: "ASHRAE Level 2 audit, HVAC optimization and lighting upgrades aligned to the Energy Efficiency pathway",
    results: {
      energySavings: "32%",
      costSavings: "$45,000/year",
      incentiveReceived: "$300,000",
      complianceStatus: "On Track for 2026 Interim Target",
    },
    testimonial:
      "Federal IRA 179D deductions and Xcel rebates covered the majority of our upgrade costs. We're saving $45K annually and well ahead of the 2026 interim target.",
    owner: "Front Range Properties",
    timeline: "Completed in 8 months",
  },
  {
    id: 2,
    buildingType: "Multifamily Residential",
    size: "75,000 sq ft",
    pathway: "GHG Reduction",
    location: "Boulder, CO",
    challenge: "Limited budget for compliance with the Dec 31, 2025 audit and pathway-selection deadline approaching",
    solution: "Selected the GHG Reduction pathway, prioritized electrification and low-cost operational improvements",
    results: {
      energySavings: "18%",
      costSavings: "$12,000/year",
      incentiveReceived: "$26,250",
      complianceStatus: "Pathway Filed • 2026 Interim On Track",
    },
    testimonial:
      "Utility rebates plus federal 45L credits made the project financially viable, and our residents benefit from lower utility costs.",
    owner: "Flatirons Housing Partners",
    timeline: "Completed in 6 months",
  },
  {
    id: 3,
    buildingType: "Retail Center",
    size: "85,000 sq ft",
    pathway: "Standard % Reduction",
    location: "Colorado Springs, CO",
    challenge: "Complex mixed-use building with multiple tenants and a 2021 baseline well above the assigned target",
    solution: "Used the Standard % Reduction pathway (13% by 2026 / 29% by 2030) with coordinated tenant engagement",
    results: {
      energySavings: "28%",
      costSavings: "$38,000/year",
      incentiveReceived: "$170,000",
      complianceStatus: "Compliant with 2026 Interim Target",
    },
    testimonial:
      "Professional guidance was essential for navigating tenant coordination and stacking IRA 179D with utility incentives.",
    owner: "Pikes Peak Retail Group",
    timeline: "Completed in 10 months",
  },
]

export default function SuccessStories() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Colorado BPS Success Stories</h2>
          <p className="text-lg text-slate-700 mb-6">
            Colorado building owners who selected a compliance pathway, hit interim targets, and stacked
            federal and utility incentives
          </p>
          <div className="flex justify-center gap-2 mb-8">
            <Badge variant="outline" className="bg-colorado-blue-50 text-colorado-blue-600">
              <Star className="w-3 h-3 mr-1" />
              $496,250 in incentives secured
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              26% average energy savings
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {successStories.map((story) => (
            <Card key={story.id} className="bg-white border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default">{story.pathway}</Badge>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Building className="w-4 h-4" />
                    {story.size}
                  </div>
                </div>
                <CardTitle className="text-lg">{story.buildingType}</CardTitle>
                <p className="text-sm text-slate-600">{story.location}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Challenge & Solution */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Challenge:</h4>
                  <p className="text-sm text-slate-600 mb-3">{story.challenge}</p>

                  <h4 className="font-semibold text-slate-800 mb-2">Solution:</h4>
                  <p className="text-sm text-slate-600">{story.solution}</p>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-colorado-blue-50 rounded-lg text-center">
                    <div className="font-bold text-colorado-blue-600">{story.results.energySavings}</div>
                    <div className="text-xs text-colorado-blue-500">Energy Savings</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <div className="font-bold text-blue-700">{story.results.costSavings}</div>
                    <div className="text-xs text-blue-600">Annual Savings</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <div className="font-bold text-purple-700">{story.results.incentiveReceived}</div>
                    <div className="text-xs text-purple-600">Incentive Received</div>
                  </div>
                  <div className="p-3 bg-colorado-blue-50 rounded-lg text-center">
                    <CheckCircle className="w-4 h-4 text-colorado-gold-600 mx-auto mb-1" />
                    <div className="text-xs text-colorado-gold-600">Compliant</div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                  <p className="text-sm text-slate-700 italic mb-2">"{story.testimonial}"</p>
                  <p className="text-xs text-slate-500">— {story.owner}</p>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{story.timeline}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-colorado-gold-50 to-blue-50 border-2">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Ready to Join These Success Stories?</h3>
            <p className="text-slate-700 mb-6">
              Our compliance experts have helped dozens of Colorado building owners select a pathway, hit interim
              targets, and stack federal and utility incentives to offset upgrade costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-colorado-blue-600 hover:bg-colorado-blue-700 text-white"
                onClick={() => document.getElementById("compliance-help")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Users className="w-4 h-4 mr-2" />
                Get Expert Help
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("coverage-checker")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Building className="w-4 h-4 mr-2" />
                Check Your Building
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
