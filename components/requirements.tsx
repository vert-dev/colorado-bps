import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Check } from "lucide-react"

export default function Requirements() {
  return (
    <section id="requirements" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What's Required</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Single statewide threshold (≥50,000 sq ft) — owner picks one of three compliance pathways
          </p>

          <div className="mb-12">
            <Card className="bg-white border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Pathway Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2">
                        <th className="text-left p-4 font-semibold">Requirement</th>
                        <th className="text-center p-4 font-semibold text-colorado-blue-600">Targeted EUI</th>
                        <th className="text-center p-4 font-semibold text-blue-700">GHG Reduction</th>
                        <th className="text-center p-4 font-semibold text-amber-700">Standard %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Annual Benchmarking (BEAM Portal)</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-amber-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b bg-slate-50">
                        <td className="p-4 font-medium">ASHRAE Level 2 Energy Audit (by Dec 31, 2025)</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-amber-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Compliance Plan + Pathway Selection</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-amber-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b bg-slate-50">
                        <td className="p-4 font-medium">Interim Target (Dec 31, 2026)</td>
                        <td className="text-center p-4 text-sm">Property-type Site EUI target</td>
                        <td className="text-center p-4 text-sm">Property-type GHG intensity target</td>
                        <td className="text-center p-4 text-sm">13% reduction vs 2021</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Final Target (Dec 31, 2030)</td>
                        <td className="text-center p-4 text-sm">Property-type Site EUI target</td>
                        <td className="text-center p-4 text-sm">Property-type GHG intensity target</td>
                        <td className="text-center p-4 text-sm">29% reduction vs 2021</td>
                      </tr>
                      <tr className="bg-colorado-blue-50">
                        <td className="p-4 font-medium">Best For</td>
                        <td className="text-center p-4 text-sm font-semibold text-colorado-blue-600">
                          Buildings near their property-type EUI target
                        </td>
                        <td className="text-center p-4 text-sm font-semibold text-blue-700">
                          Electrification + renewables strategies
                        </td>
                        <td className="text-center p-4 text-sm font-semibold text-amber-700">
                          2021 baseline well above target
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-colorado-blue-500" />
                  <span>Every Covered Building Must</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Benchmark in ENERGY STAR Portfolio Manager and submit to BEAM Portal each June 1</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Complete an ASHRAE Level 2 energy audit</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">File a compliance plan and select a pathway by Dec 31, 2025</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Pay the $100/building annual program fee</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Hit the interim (2026) and final (2030) targets for the selected pathway</span>
                  </li>
                </ul>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Colorado BPS details
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <span>What's NOT Required</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">No tier classification — single statewide threshold</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">No Washington-style Energy Management Plan (EMP) document</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">No formal Operations &amp; Maintenance (O&amp;M) program submittal</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">No 12-month O&amp;M look-back requirement</span>
                  </li>
                </ul>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Compare to other state BPS programs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
