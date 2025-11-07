import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Check, X } from "lucide-react"

export default function Requirements() {
  return (
    <section id="requirements" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What's Required</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">Requirements vary by building tier</p>

          <div className="mb-12">
            <Card className="bg-white border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Requirements Comparison Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2">
                        <th className="text-left p-4 font-semibold">Requirement</th>
                        <th className="text-center p-4 font-semibold text-colorado-blue-600">Tier 1 (50k+ sq ft)</th>
                        <th className="text-center p-4 font-semibold text-blue-700">Tier 2 (20-50k sq ft)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Energy Benchmarking</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b bg-slate-50">
                        <td className="p-4 font-medium">Energy Management Plan (EMP)</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Operations & Maintenance (O&M)</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b bg-slate-50">
                        <td className="p-4 font-medium">Performance Target Compliance</td>
                        <td className="text-center p-4">
                          <Check className="w-5 h-5 text-colorado-blue-500 mx-auto" />
                        </td>
                        <td className="text-center p-4">
                          <X className="w-5 h-5 text-slate-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Penalty for Non-Compliance</td>
                        <td className="text-center p-4 text-sm">$5,000 + $1.00/sq ft annually</td>
                        <td className="text-center p-4 text-sm">$0.30/sq ft flat fee</td>
                      </tr>
                      <tr className="bg-colorado-blue-50">
                        <td className="p-4 font-medium">Early Adopter Incentive</td>
                        <td className="text-center p-4 text-sm font-semibold text-colorado-blue-600">$2.00/sq ft base</td>
                        <td className="text-center p-4 text-sm font-semibold text-blue-700">$0.30-0.75/sq ft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tier 1 Requirements */}
            <Card className="bg-white border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-colorado-blue-500" />
                  <span>Tier 1 Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Benchmark annually</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Energy Management Plan (EMP)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">O&M program</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Meet a performance target or use an allowed alternative</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Submit by your size based deadline</span>
                  </li>
                </ul>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Tier 1 details
                </Button>
              </CardContent>
            </Card>

            {/* Tier 2 Requirements */}
            <Card className="bg-white border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <span>Tier 2 Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Benchmark</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">EMP</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">O&M</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Report on a multi year cycle</span>
                  </li>
                </ul>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Tier 2 details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
