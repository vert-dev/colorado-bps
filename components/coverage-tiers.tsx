import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, TrendingDown, GitBranch, ExternalLink, MessageCircle } from "lucide-react"

export default function CoverageTiers() {
  return (
    <section id="coverage" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Am I Covered?</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Colorado BPS applies to all buildings ≥50,000 sq ft—choose your compliance pathway
          </p>

          <div className="grid md:grid-cols-1 gap-8 mb-8">
            {/* Building Coverage Card */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-8 h-8 text-colorado-blue-600" />
                  <CardTitle className="text-xl">Buildings ≥50,000 sq ft</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 font-medium">
                  All building types covered: commercial, institutional, residential (multifamily). Single threshold
                  applies—no exemptions based on building type.
                </p>

                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-colorado-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Annual benchmarking required (Energy Star Portfolio Manager)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-colorado-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Energy audit + compliance plan due December 31, 2025</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-colorado-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Select compliance pathway by December 31, 2025</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-colorado-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Meet interim targets (7% reduction) by December 31, 2026</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-colorado-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Meet final targets (20% reduction) by December 31, 2030</span>
                  </li>
                </ul>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Benchmarking Fee:</strong> $100 per building annually. Benchmarking enforcement began January 1, 2024.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8 mt-12">Three Compliance Pathways</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Energy Efficiency Pathway */}
            <Card className="border-2 border-colorado-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <TrendingDown className="w-8 h-8 text-colorado-blue-600" />
                  <CardTitle className="text-lg">Energy Efficiency</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-700 font-medium text-sm">
                  Reduce building energy use (Site EUI)
                </p>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Interim (2026):</span>
                    <span className="font-semibold text-colorado-blue-700">7% reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Final (2030):</span>
                    <span className="font-semibold text-colorado-blue-700">20% reduction</span>
                  </div>
                </div>

                <div className="bg-colorado-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-700">
                    <strong>Best for:</strong> Most buildings. Traditional efficiency improvements like HVAC upgrades,
                    lighting retrofits, and equipment optimization.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* GHG Reduction Pathway */}
            <Card className="border-2 border-colorado-gold-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-8 h-8 text-colorado-gold-600" />
                  <CardTitle className="text-lg">GHG Reduction</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-700 font-medium text-sm">
                  Reduce greenhouse gas emissions (GHGI)
                </p>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Interim (2026):</span>
                    <span className="font-semibold text-colorado-gold-700">7% reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Final (2030):</span>
                    <span className="font-semibold text-colorado-gold-700">20% reduction</span>
                  </div>
                </div>

                <div className="bg-colorado-gold-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-700">
                    <strong>Best for:</strong> Buildings with electrification or renewable energy plans. Can use RECs,
                    on-site solar, or fuel switching.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Standard % Reduction Pathway */}
            <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <GitBranch className="w-8 h-8 text-slate-600" />
                  <CardTitle className="text-lg">Standard % Reduction</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-700 font-medium text-sm">
                  Fixed percentage reductions
                </p>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Interim (2026-2029):</span>
                    <span className="font-semibold text-slate-700">13% reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Final (2030-2050):</span>
                    <span className="font-semibold text-slate-700">29% reduction</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-700">
                    <strong>Available if:</strong> 2021 baseline EUI is 29%+ above assigned target. Fixed reductions
                    regardless of building type.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pathway Selection Note */}
          <Card className="border-2 border-colorado-blue-200 bg-colorado-blue-50">
            <CardContent className="p-6">
              <h4 className="font-semibold text-colorado-blue-800 mb-3">Pathway Selection Flexibility</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-colorado-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>Deadline:</strong> Must select pathway by December 31, 2025
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-colorado-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>Can be changed:</strong> Pathway selection can be changed in future compliance cycles
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-colorado-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>Submit through:</strong> Building Owner Portal pathway selection form
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Ask a question link */}
          <div className="text-center mt-8">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask a question
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
