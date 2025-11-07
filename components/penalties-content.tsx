"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Calculator, Clock, TrendingUp, Shield, ExternalLink, Phone, DollarSign } from "lucide-react"
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
          Understanding Colorado's Building Performance Standard penalty structure for buildings ≥50,000 sq ft
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
        <AlertTitle>Monthly Penalties Start June 2027 (Interim) and June 2031 (Final)</AlertTitle>
        <AlertDescription>
          <strong>All buildings ≥50,000 sq ft:</strong> Monthly penalties begin June 1, 2027 if you miss the December 31, 2026 interim target (7% reduction).
          Final monthly penalties begin June 1, 2031 if you miss the December 31, 2030 final target (20% reduction).
          <strong className="block mt-2">Penalties are monthly (not annual) and continue until compliance is achieved.</strong>
        </AlertDescription>
      </Alert>

      {/* Two-Track Penalty System */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Benchmarking Penalties */}
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <DollarSign className="w-6 h-6 mr-3" />
              Benchmarking Penalties (Annual Reporting)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Annual Benchmarking Deadline: August 1</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Annual Filing Fee:</span>
                  <span className="font-bold text-orange-600">$100/building</span>
                </li>
                <li className="flex justify-between">
                  <span>First Failure Penalty:</span>
                  <span className="font-bold text-red-600">$500</span>
                </li>
                <li className="flex justify-between">
                  <span>Subsequent Failures:</span>
                  <span className="font-bold text-red-600">$2,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Deadline:</span>
                  <span className="font-bold text-orange-600">August 1, annually</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-100 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">What You Must Report:</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Energy usage data via Energy Star Portfolio Manager</span>
                </p>
                <p className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Submit to Colorado Energy Office through BEAM Portal (https://co.beam-portal.org/)</span>
                </p>
                <p className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Pay $100 annual fee per building</span>
                </p>
                <p className="text-xs text-orange-600 mt-2 font-semibold">
                  ⚠️ Failure to benchmark by August 1 triggers penalties
                </p>
              </div>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={() => setIsContactModalOpen(true)}>
              Get Benchmarking Help
            </Button>
          </CardContent>
        </Card>

        {/* Performance Penalties */}
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Performance Penalties (Monthly, Ongoing)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Performance Target Deadlines:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Interim Target (7% reduction):</span>
                  <span className="font-bold text-red-600">Dec 31, 2026</span>
                </li>
                <li className="flex justify-between">
                  <span>Interim Penalties Begin:</span>
                  <span className="font-bold text-red-600">June 1, 2027</span>
                </li>
                <li className="flex justify-between">
                  <span>Final Target (20% reduction):</span>
                  <span className="font-bold text-red-600">Dec 31, 2030</span>
                </li>
                <li className="flex justify-between">
                  <span>Final Penalties Begin:</span>
                  <span className="font-bold text-red-600">June 1, 2031</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">How Performance Penalties Work:</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Monthly penalties</strong> (not annual) based on degree of non-compliance</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Specific penalty amounts to be determined by Colorado Energy Office</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Penalties continue <strong>every month</strong> until compliance is achieved</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Based on shortfall from interim (7%) or final (20%) target</span>
                </p>
                <p className="text-xs text-red-600 mt-2 font-semibold">
                  ⚠️ Penalties accumulate rapidly - monthly vs annual enforcement
                </p>
              </div>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setIsContactModalOpen(true)}>
              Get Performance Compliance Help
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Penalty Timeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-red-600" />
            Monthly Penalty Accumulation: Why Early Action Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Scenario: Miss December 31, 2026 Interim Target</h4>
            <p className="text-sm text-yellow-700">
              If a building fails to meet the 7% interim reduction target by December 31, 2026, monthly penalties begin June 1, 2027 and continue until compliance is achieved.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-700 mb-1">June 2027</div>
              <div className="text-xs text-yellow-600 mb-2">First penalty month</div>
              <div className="text-lg font-bold text-red-600">$X/month</div>
              <div className="text-xs text-slate-500">Amount TBD by CEO</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-700 mb-1">Dec 2027</div>
              <div className="text-xs text-orange-600 mb-2">6 months non-compliant</div>
              <div className="text-lg font-bold text-red-600">6X cumulative</div>
              <div className="text-xs text-slate-500">6 penalty payments</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-700 mb-1">Dec 2028</div>
              <div className="text-xs text-red-600 mb-2">18 months non-compliant</div>
              <div className="text-lg font-bold text-red-700">18X cumulative</div>
              <div className="text-xs text-slate-500">18 penalty payments</div>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg border-2 border-red-300">
              <div className="text-xl font-bold text-red-800 mb-1">Dec 2030</div>
              <div className="text-xs text-red-700 mb-2">42 months + final target</div>
              <div className="text-lg font-bold text-red-800">42X + new</div>
              <div className="text-xs text-slate-500">Final penalties also begin</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-colorado-blue-50 rounded-lg text-center">
            <h4 className="font-semibold text-colorado-blue-700 mb-2">Early Compliance Prevents Monthly Penalties</h4>
            <p className="text-sm text-colorado-blue-600">
              Start your compliance planning now to meet the December 31, 2026 interim target and avoid 42+ months of penalties before the final 2030 deadline.
            </p>
            <Button className="mt-3 bg-colorado-blue-500 hover:bg-colorado-blue-600" onClick={() => setIsContactModalOpen(true)}>
              Start Compliance Process Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Pathways Impact on Penalties */}
      <Card className="border-2 border-colorado-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-colorado-blue-800">
            <Shield className="w-6 h-6 mr-3" />
            Choose Your Compliance Pathway Before December 31, 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">
              <strong>Critical Decision Point:</strong> By December 31, 2025, you must complete an energy audit and select one of three compliance pathways. Your pathway choice determines how penalties are calculated.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-colorado-blue-200">
              <h4 className="font-semibold text-colorado-blue-700 mb-2">Energy Efficiency Pathway</h4>
              <p className="text-xs text-slate-600 mb-2">Reduce Site EUI by:</p>
              <ul className="text-xs space-y-1">
                <li>• 7% by Dec 31, 2026</li>
                <li>• 20% by Dec 31, 2030</li>
              </ul>
              <p className="text-xs text-colorado-blue-600 mt-2">Penalties based on EUI shortfall</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-colorado-blue-200">
              <h4 className="font-semibold text-colorado-blue-700 mb-2">GHG Reduction Pathway</h4>
              <p className="text-xs text-slate-600 mb-2">Reduce emissions by:</p>
              <ul className="text-xs space-y-1">
                <li>• 7% by Dec 31, 2026</li>
                <li>• 20% by Dec 31, 2030</li>
              </ul>
              <p className="text-xs text-colorado-blue-600 mt-2">Penalties based on emissions shortfall</p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-colorado-blue-200">
              <h4 className="font-semibold text-colorado-blue-700 mb-2">Standard % Reduction</h4>
              <p className="text-xs text-slate-600 mb-2">Fixed reductions:</p>
              <ul className="text-xs space-y-1">
                <li>• 13% (2026-2029)</li>
                <li>• 29% (2030-2050)</li>
              </ul>
              <p className="text-xs text-colorado-blue-600 mt-2">Only if baseline >29% above target</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Missing the December 31, 2025 audit/pathway deadline:</strong> May result in additional penalties or forced pathway assignment. Complete your audit in early 2025.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Considerations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700">
              <Shield className="w-5 h-5 mr-2" />
              Regulatory Authority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-3">
              Colorado Energy Office (CEO) has authority to establish specific penalty amounts and enforcement procedures.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Penalty framework set in HB 21-1286 (2021)</li>
              <li>• Specific amounts to be determined via administrative rules</li>
              <li>• Monthly enforcement structure (unique to Colorado)</li>
              <li>• Based on "degree of non-compliance" with targets</li>
              <li>• Check BEAM Portal for current penalty schedule</li>
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
              Always verify penalty information on official Colorado resources:
            </p>
            <ul className="text-sm space-y-1">
              <li>
                •{" "}
                <a
                  href="https://energyoffice.colorado.gov/energy-performance-buildings"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Colorado Energy Office - Building Performance Standards
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="https://co.beam-portal.org/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BEAM Portal - Building Owner Portal
                </a>
              </li>
              <li>
                •{" "}
                <a
                  href="https://leg.colorado.gov/bills/hb21-1286"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HB 21-1286 (2021) - Colorado BPS Legislation
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Final CTA Section */}
      <Card className="bg-slate-900 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Don't Let Monthly Penalties Accumulate</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Colorado's monthly penalty structure means delays are far more costly than in other states. Start your compliance planning today to meet the December 31, 2026 interim target and avoid years of monthly penalties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => setIsContactModalOpen(true)}>
              <Phone className="w-5 h-5 mr-2" />
              Get Compliance Help Now
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
