"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Calculator, Clock, TrendingUp, Shield, ExternalLink, Phone } from "lucide-react"
import { ContactFormModal } from "@/components/contact-form-modal"

export default function PenaltiesContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-600 mr-4" />
          <h1 className="text-4xl font-bold text-slate-900">Colorado BPS Penalties & Costs</h1>
        </div>
        <p className="text-xl text-slate-600 mb-6">
          Understanding Oregon's Building Performance Standard penalty structure (Tier 1 only)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => setIsContactModalOpen(true)}>
            <Phone className="w-5 h-5 mr-2" />
            Get Help Avoiding Penalties
          </Button>
          <Button variant="outline" size="lg" onClick={() => setIsContactModalOpen(true)}>
            <Calculator className="w-5 h-5 mr-2" />
            Calculate My Building's Risk
          </Button>
        </div>
      </div>

      {/* Critical Alert */}
      <Alert variant="destructive">
        <Clock className="h-4 w-4" />
        <AlertTitle>Tier 1 Penalties Apply Annually Until Compliance</AlertTitle>
        <AlertDescription>
          <strong>Tier 1 commercial buildings (≥35k sqft):</strong> Annual penalties of $5,000 + $1/sq ft for non-compliance.
          For a 100,000 sq ft building, that's <strong>$105,000 per year</strong> until you comply.
          <strong className="block mt-2">Tier 2 buildings are penalty-exempt</strong> - reporting only, no fines.
        </AlertDescription>
      </Alert>

      {/* Penalty Structure Cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tier 1 Penalties */}
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Tier 1: Commercial Buildings ≥35,000 sq ft
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Colorado BPS Penalty Structure:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Base Fine (annual):</span>
                  <span className="font-bold text-red-600">$5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Size-Based Fee (annual):</span>
                  <span className="font-bold text-red-600">$1.00/sq ft</span>
                </li>
                <li className="flex justify-between">
                  <span>Applied:</span>
                  <span className="font-bold text-red-600">Annually until compliant</span>
                </li>
                <li className="flex justify-between">
                  <span>First Assessment:</span>
                  <span className="font-bold text-red-600">June/July 2028-2030</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Example Scenarios:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold mb-1">50,000 sq ft building (June 2029 deadline):</div>
                  <div className="flex justify-between">
                    <span>Annual penalty if non-compliant:</span>
                    <span className="font-bold text-red-700">$55,000/year</span>
                  </div>
                </div>
                <div className="border-t pt-2">
                  <div className="font-semibold mb-1">100,000 sq ft building (June 2028 deadline):</div>
                  <div className="flex justify-between">
                    <span>Annual penalty if non-compliant:</span>
                    <span className="font-bold text-red-700">$105,000/year</span>
                  </div>
                </div>
                <div className="text-xs text-red-600 mt-2 font-semibold">
                  ⚠️ Penalties continue every year until building achieves EUI compliance
                </div>
              </div>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setIsContactModalOpen(true)}>
              Get Tier 1 Compliance Help Now
            </Button>
          </CardContent>
        </Card>

        {/* Tier 2 No Penalties */}
        <Card className="border-2 border-colorado-blue-200 bg-colorado-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-colorado-blue-800">
              <Shield className="w-6 h-6 mr-3" />
              Tier 2: No Penalties - Reporting Only
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
              <h4 className="font-semibold text-colorado-blue-800 mb-2">Tier 2 Coverage:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-colorado-gold-600 mr-2">✓</span>
                  <span>Commercial buildings 20,000-35,000 sq ft</span>
                </li>
                <li className="flex items-start">
                  <span className="text-colorado-gold-600 mr-2">✓</span>
                  <span>ALL institutional buildings ≥35,000 sq ft (schools, hospitals, government)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-colorado-gold-600 mr-2">✓</span>
                  <span>Reporting deadline: July 2028</span>
                </li>
              </ul>
            </div>

            <div className="bg-colorado-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-colorado-blue-800 mb-2">No Penalties Apply:</h4>
              <div className="space-y-2 text-sm">
                <p className="text-colorado-blue-700 font-semibold">
                  Tier 2 buildings have NO financial penalties under Colorado BPS.
                </p>
                <p className="text-colorado-gold-600">
                  Requirements are limited to energy benchmarking via Energy Star Portfolio Manager and data reporting to Colorado Energy Office.
                </p>
                <p className="text-colorado-blue-700 font-semibold mt-2">
                  No performance targets. No fines. Just transparency.
                </p>
              </div>
            </div>

            <Button className="w-full bg-colorado-blue-600 hover:bg-colorado-blue-700" onClick={() => setIsContactModalOpen(true)}>
              Get Tier 2 Reporting Help
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Penalty Growth Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-red-600" />
            How Tier 1 Penalties Accumulate Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700 mb-2">Year 1</div>
              <div className="text-sm text-yellow-600">100k sq ft building non-compliant</div>
              <div className="text-xl font-bold text-red-600 mt-2">$105,000</div>
              <div className="text-xs text-slate-500">$5,000 base + $100,000 size-based</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700 mb-2">Year 2</div>
              <div className="text-sm text-orange-600">Still non-compliant</div>
              <div className="text-xl font-bold text-red-600 mt-2">$210,000</div>
              <div className="text-xs text-slate-500">Cumulative: 2 years of penalties</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-700 mb-2">Year 3</div>
              <div className="text-sm text-red-600">Ongoing non-compliance</div>
              <div className="text-xl font-bold text-red-700 mt-2">$315,000</div>
              <div className="text-xs text-slate-500">Penalties continue annually until compliant</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-colorado-blue-50 rounded-lg text-center">
            <h4 className="font-semibold text-colorado-blue-700 mb-2">Early Compliance Saves Money</h4>
            <p className="text-sm text-colorado-blue-600">
              Avoid all penalties + qualify for ECAPP/BERI incentives. Start planning 2-3 years before your deadline to ensure successful compliance.
            </p>
            <Button className="mt-3 bg-colorado-blue-500 hover:bg-colorado-blue-600" onClick={() => setIsContactModalOpen(true)}>
              Start Compliance Process Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Considerations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700">
              <Shield className="w-5 h-5 mr-2" />
              Regulatory Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-3">
              Colorado Energy Office (CEO) may adjust penalty amounts based on administrative rules.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Penalty rates set in HB 21-1286 (2021)</li>
              <li>• Subject to adjustment via Oregon Administrative Rules</li>
              <li>• First assessment: 2028-2030 compliance cycles</li>
              <li>• Check CEO website for current penalty schedule</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <ExternalLink className="w-5 h-5 mr-2" />
              Official Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-3">
              Always verify penalty information on official Oregon resources:
            </p>
            <ul className="text-sm space-y-1">
              <li>
                •{" "}
                <a
                  href="https://www.oregon.gov/energy/energy-oregon/Pages/Building-Performance-Standards.aspx"
                  className="text-blue-600 hover:underline"
                >
                  Colorado Energy Office BPS Program Page
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="https://olis.oregonlegislature.gov/liz/2021R1/Measures/Overview/HB3409"
                  className="text-blue-600 hover:underline"
                >
                  HB 21-1286 (2021) - Colorado BPS Law
                </a>
              </li>
              <li>
                •{" "}
                <a href="https://secure.sos.state.or.us/oard/displayDivisionRules.action?selectedDivision=6874" className="text-blue-600 hover:underline">
                  OAR 330-140 - BPS Administrative Rules
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Final CTA Section */}
      <Card className="bg-slate-900 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Don't Let Penalties Accumulate</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Every day of non-compliance costs money. Get expert help to achieve compliance quickly and avoid costly
            penalties while qualifying for available incentives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => setIsContactModalOpen(true)}>
              <Phone className="w-5 h-5 mr-2" />
              Get Emergency Compliance Help
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              onClick={() => setIsContactModalOpen(true)}
            >
              Schedule Free Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        selectedPackage="Penalty Avoidance Consultation"
      />
    </div>
  )
}
