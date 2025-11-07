import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, AlertTriangle, ExternalLink, TrendingUp, Clock } from "lucide-react"

export default function DeadlinesPenalties() {
  return (
    <section id="deadlines" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Deadlines & Penalties Snapshot</h2>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Key dates and penalty information at a glance
          </p>

          <div className="mb-8 space-y-3">
            <Alert variant="destructive">
              <Clock className="h-4 w-4" />
              <AlertTitle>Conditional Compliance Deadline Alert</AlertTitle>
              <AlertDescription>
                Buildings seeking conditional compliance must apply ≥180 days before their deadline.
                <strong>Large buildings: Applications due December 1, 2025.</strong>
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Incentive Funding Depletion Warning</AlertTitle>
              <AlertDescription>
                $150M Tier 2 and $75M Tier 1 incentive pools are first-come, first-served.
                <strong>Funding may be exhausted by Q2 2026 at current application rates.</strong>
              </AlertDescription>
            </Alert>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Compliance Timeline</h3>
            <div className="relative">
              <div className="absolute left-0 right-0 top-6 h-1 bg-slate-200"></div>
              <div className="flex justify-between items-start relative">
                <div className="text-center">
                  <div className="w-4 h-4 bg-colorado-blue-500 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">July 1, 2025</div>
                  <div className="text-xs text-muted-foreground">Tier 2 Early Compliance</div>
                  <div className="text-xs text-colorado-gold-600 font-bold">$150M Available</div>
                  <div className="text-xs text-red-600 font-bold mt-1">⚠️ May deplete Q2 2026</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">June 1, 2026</div>
                  <div className="text-xs text-muted-foreground">Large Buildings (220k+ sq ft)</div>
                  <div className="text-xs text-red-600 font-bold">Conditional apps due Dec 1, 2025</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">June/July 2027</div>
                  <div className="text-xs text-muted-foreground">Mid-size & Tier 2</div>
                  <div className="text-xs text-amber-600 font-bold">Conditional apps due Dec 1, 2026</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-slate-400 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">June 1, 2028</div>
                  <div className="text-xs text-muted-foreground">Small Buildings (50-90k sq ft)</div>
                  <div className="text-xs text-slate-600">Conditional apps due Dec 1, 2027</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-2 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Deadlines Column */}
                  <div id="deadlines-section">
                    <div className="flex items-center space-x-3 mb-6">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-semibold">Deadlines</h3>
                    </div>

                    <div className="space-y-3">
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start bg-colorado-blue-50">
                        Tier 2 Early — July 1, 2025
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Large buildings — June 1, 2026
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Mid-size — June 1, 2027
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Tier 2 Required — July 1, 2027
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Small covered — June 1, 2028
                      </Badge>
                    </div>
                  </div>

                  {/* Penalties Column */}
                  <div id="penalties">
                    <div className="flex items-center space-x-3 mb-6">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <h3 className="text-xl font-semibold">Penalties</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm font-semibold text-red-800">Tier 1 Buildings (≥50,000 sq ft):</p>
                          <p className="text-sm text-red-700">• Base fine: $5,000 (one-time)</p>
                          <p className="text-sm text-red-700">
                            • Additional: $1.00/sq ft annually ($0.00274/sq ft daily)
                          </p>
                          <p className="text-sm text-red-700">• Maximum duration: 18 months of accrual</p>
                          <p className="text-xs text-red-600 mt-1">
                            Example: 100,000 sq ft = $5,000 + $150,000 max = $155,000 total
                          </p>
                        </div>

                        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                          <p className="text-sm font-semibold text-orange-800">
                            Tier 2 Buildings (20,000-49,999 sq ft + multifamily ≥20,000):
                          </p>
                          <p className="text-sm text-orange-700">• Flat fee: $0.30/sq ft per compliance cycle</p>
                          <p className="text-sm text-orange-700">• No base fine or daily accrual</p>
                          <p className="text-xs text-orange-600 mt-1">Example: 30,000 sq ft = $9,000 per cycle</p>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800 font-medium">⚠️ Inflation Adjustments (WAC 194-50)</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Commerce may adjust penalty amounts annually for inflation. Current rates effective through
                          2025. Expect 3-5% annual increases based on Consumer Price Index.
                        </p>
                      </div>

                      <Button variant="outline" size="sm" className="bg-transparent">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Calculate your building's penalty exposure →
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Always verify on the official state site (linked below).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold">Penalty Growth Example</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 mb-4">100,000 sq ft Tier 1 building non-compliance costs:</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">Base Fine</span>
                      <span className="font-semibold text-red-600">$5,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-100 rounded">
                      <span className="text-sm">Year 1 Daily Penalties</span>
                      <span className="font-semibold text-red-600">$100,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-200 rounded">
                      <span className="text-sm">18 Month Maximum</span>
                      <span className="font-bold text-red-700">$155,000</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-colorado-blue-50 rounded">
                    <p className="text-sm text-colorado-blue-700">
                      <strong>Early compliance saves:</strong> Avoid penalties + qualify for Tier 1 incentives up to
                      $2.00/sq ft (plus energy savings bonuses)
                    </p>
                  </div>

                  <div className="mt-2 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Tier 2 Example:</strong> 30,000 sq ft multifamily = $9,000 per cycle
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
