import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Home, ExternalLink, MessageCircle } from "lucide-react"

export default function CoverageTiers() {
  return (
    <section id="coverage" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Am I Covered?</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Coverage depends on your building size and type
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Tier 1 Card */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-8 h-8 text-slate-600" />
                  <CardTitle className="text-xl">Tier 1 (Large Buildings)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 font-medium">Buildings ≥ 50,000 sq ft; performance standard applies.</p>

                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Must meet energy performance targets</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Annual benchmarking required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Energy Management Plan (EMP) required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Operations & Maintenance (O&M) program required</span>
                  </li>
                </ul>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn more about Tier 1
                </Button>
              </CardContent>
            </Card>

            {/* Tier 2 Card */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Home className="w-8 h-8 text-slate-600" />
                  <CardTitle className="text-xl">Tier 2 (Mid-Size Buildings)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 font-medium">
                  20,000–49,999 sq ft (incl. multifamily) — benchmarking + EMP + O&M.
                </p>

                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Annual benchmarking required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Energy Management Plan (EMP) required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Operations & Maintenance (O&M) program required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Multi-year reporting cycle</span>
                  </li>
                </ul>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn more about Tier 2
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Ask a question link */}
          <div className="text-center">
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
