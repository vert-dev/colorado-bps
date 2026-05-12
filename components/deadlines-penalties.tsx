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
            Colorado BPS (HB 21-1286 / CDPHE Regulation 28) at a glance
          </p>

          <div className="mb-8 space-y-3">
            <Alert variant="destructive">
              <Clock className="h-4 w-4" />
              <AlertTitle>Audit + Pathway Selection Deadline</AlertTitle>
              <AlertDescription>
                Every covered building must file an ASHRAE Level 2 energy audit, compliance plan, and pathway
                selection by <strong>December 31, 2025</strong>.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Annual Benchmarking Is Separate</AlertTitle>
              <AlertDescription>
                Annual benchmarking (June 1 each year via BEAM Portal) is its own enforced requirement and carries
                its own penalties — $500 first miss, $2,000 subsequent.
              </AlertDescription>
            </Alert>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Compliance Timeline</h3>
            <div className="relative">
              <div className="absolute left-0 right-0 top-6 h-1 bg-slate-200"></div>
              <div className="flex justify-between items-start relative">
                <div className="text-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Dec 31, 2025</div>
                  <div className="text-xs text-muted-foreground">Audit + Plan + Pathway</div>
                  <div className="text-xs text-red-600 font-bold mt-1">URGENT</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Dec 31, 2026</div>
                  <div className="text-xs text-muted-foreground">Interim Target</div>
                  <div className="text-xs text-blue-600 font-bold">7% GHG reduction</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">June 1, 2027</div>
                  <div className="text-xs text-muted-foreground">Performance Penalties</div>
                  <div className="text-xs text-red-600 font-bold">Monthly accrual begins</div>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-slate-700 rounded-full mb-2 mx-auto"></div>
                  <div className="text-xs font-medium">Dec 31, 2030</div>
                  <div className="text-xs text-muted-foreground">Final Target</div>
                  <div className="text-xs text-slate-600">20% GHG reduction</div>
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
                        June 1, annually — Benchmarking
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Dec 31, 2025 — Audit + Plan + Pathway
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Dec 31, 2026 — Interim target
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        June 1, 2027 — Interim penalties begin
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        Dec 31, 2030 — Final target
                      </Badge>
                      <Badge variant="outline" className="block w-full p-3 text-left justify-start">
                        June 1, 2031 — Final penalties begin
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
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                          <p className="text-sm font-semibold text-orange-800">Benchmarking non-compliance:</p>
                          <p className="text-sm text-orange-700">• First occurrence: $500</p>
                          <p className="text-sm text-orange-700">• Subsequent occurrences: $2,000 each</p>
                          <p className="text-xs text-orange-600 mt-1">
                            Plus the $100/building annual benchmarking program fee.
                          </p>
                        </div>

                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm font-semibold text-red-800">Performance non-compliance:</p>
                          <p className="text-sm text-red-700">
                            • Interim target: monthly penalties beginning June 1, 2027
                          </p>
                          <p className="text-sm text-red-700">
                            • Final target: monthly penalties beginning June 1, 2031
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            Amount set by CDPHE based on degree of non-compliance.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800 font-medium">⚠️ Source: CDPHE Regulation 28</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Penalty amounts are set in 5 CCR 1001-32 and adjustments may be issued by the Air Quality
                          Control Commission.
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
                    Always verify on the official state sites (Colorado Energy Office and CDPHE).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold">Cost-of-Delay Snapshot</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 mb-4">100,000 sq ft Colorado BPS building, illustrative:</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="text-sm">Missed first benchmarking</span>
                      <span className="font-semibold text-orange-600">$500</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-100 rounded">
                      <span className="text-sm">Each subsequent miss</span>
                      <span className="font-semibold text-orange-700">$2,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-100 rounded">
                      <span className="text-sm">Interim target missed</span>
                      <span className="font-semibold text-red-700">Monthly accrual from 6/1/2027</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-colorado-blue-50 rounded">
                    <p className="text-sm text-colorado-blue-700">
                      <strong>Acting early pays:</strong> Federal IRA 179D (up to $5/sqft) plus Xcel and Black Hills
                      utility rebates typically offset 30–60% of upgrade costs.
                    </p>
                  </div>

                  <div className="mt-2 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Pathway flexibility:</strong> If your 2021 baseline is well above the assigned target,
                      the Standard % Reduction pathway (13% by 2026, 29% by 2030) may be the better fit.
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
