import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Calculator } from "lucide-react"

export default function ValueCards() {
  return (
    <section id="value" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What You Get for Attending</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">Practical tools you can use immediately</p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Starter Plan Template */}
            <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Starter Plan Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  A one page outline to help you organize your compliance approach and next steps.
                </p>
              </CardContent>
            </Card>

            {/* EUIt Cheat Sheet */}
            <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 text-colorado-blue-500 mx-auto mb-4" />
                <CardTitle className="text-lg">EUIt Cheat Sheet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Activity type quick reference to help you map your building's energy use correctly.
                </p>
              </CardContent>
            </Card>

            {/* Penalty Estimator */}
            <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Calculator className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Penalty Estimator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  Illustrative penalty calculator with assumptions clearly labeled for planning purposes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="bg-transparent">
              Send me the starter kit if I can't attend
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
