"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, DollarSign, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { useState } from "react"
import { ContactFormModal } from "./contact-form-modal"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

export default function EarlyAdopterIncentives() {
  const [showContactModal, setShowContactModal] = useState(false)
  const { getBookingUrl } = useHubSpotBooking()

  return (
    <>
      <div className="py-16 bg-gradient-to-b from-colorado-gold-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-colorado-blue-600 text-white px-4 py-2 text-sm font-semibold">
              Early Compliance Funding Available Now
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Colorado BPS Incentive Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oregon offers state and federal funding to support building owners in achieving early compliance
              with Building Performance Standard requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* ECAPP Fund */}
            <Card className="border-2 border-colorado-blue-200 bg-colorado-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-colorado-blue-800">ECAPP Fund</CardTitle>
                  <Badge className="bg-colorado-blue-600 text-white">$2M State Fund</Badge>
                </div>
                <CardDescription className="text-colorado-blue-700 font-semibold">
                  Early Compliance Assistance Pilot Program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-colorado-gold-600" />
                    <span className="font-semibold text-colorado-blue-800">Program Details</span>
                  </div>
                  <p className="text-2xl font-bold text-colorado-gold-600 mb-2">$2 Million Available</p>
                  <p className="text-sm text-gray-700">Competitive grants for early compliance projects (2025-2027)</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-colorado-blue-800">Eligible Activities:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Energy audits (ASHRAE Level 2 or equivalent)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Energy efficiency improvements to meet EUIt
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Projects achieving compliance 1-2 years early
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Benchmarking and EUI tracking systems
                    </li>
                  </ul>
                </div>

                <div className="bg-colorado-blue-100 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-colorado-blue-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-colorado-blue-800">Application Window</p>
                      <p className="text-sm text-colorado-blue-700">Available 2025-2027 on rolling basis until funds exhausted</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Competitive Process:</strong> Limited funding available. Strong applications demonstrate
                      significant energy savings and early compliance commitment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BERI Grants */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-800">BERI Grants</CardTitle>
                  <Badge className="bg-blue-600 text-white">$12M Federal Fund</Badge>
                </div>
                <CardDescription className="text-blue-700 font-semibold">
                  Building Efficiency and Resilience Implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Program Details</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">$12 Million Federal CERTA</p>
                  <p className="text-sm text-gray-700">
                    Climate and Energy Resources for Transformation and Assistance program
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">Funding Priorities:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      High energy savings potential (deep retrofits)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      Buildings in disadvantaged communities
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      Projects demonstrating climate resilience
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      Comprehensive building envelope improvements
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      HVAC system modernization
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800">Implementation Focus</p>
                      <p className="text-sm text-blue-700">
                        Grants support actual construction and equipment installation, not just planning
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Federal Requirements:</strong> Additional compliance documentation, prevailing wage, and
                      Davis-Bacon Act requirements may apply.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combined Strategy Card */}
          <Card className="bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-50 border-2 border-colorado-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-colorado-blue-800">Maximize Your Incentives</CardTitle>
              <CardDescription className="text-colorado-blue-700">
                Combine ECAPP and BERI funding for comprehensive project support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="text-3xl font-bold text-colorado-gold-600 mb-2">Step 1</div>
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Energy Audit</h4>
                  <p className="text-sm text-gray-700">
                    Use ECAPP funds for ASHRAE Level 2 audit to identify improvement opportunities
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Step 2</div>
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Implementation</h4>
                  <p className="text-sm text-gray-700">
                    Apply for BERI grants to fund major equipment upgrades and building envelope improvements
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="text-3xl font-bold text-colorado-blue-600 mb-2">Step 3</div>
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Early Compliance</h4>
                  <p className="text-sm text-gray-700">
                    Achieve compliance 1-2 years early, avoid penalties, reduce operating costs
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-colorado-blue-200 mt-6">
                <h4 className="font-semibold text-colorado-blue-800 mb-3 text-lg">Application Support Available</h4>
                <p className="text-gray-700 mb-4">
                  Our team has experience navigating both ECAPP and BERI application processes. We can help you:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Assess incentive eligibility
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Prepare grant applications
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Coordinate audit and implementation timing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Maximize total funding across programs
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-colorado-blue-500 hover:bg-colorado-blue-600"
                    onClick={() => setShowContactModal(true)}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Schedule Incentive Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-colorado-blue-500 text-colorado-blue-700 hover:bg-colorado-blue-50"
                    onClick={() => {
                      const bookingUrl = getBookingUrl({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        company: "",
                        numberOfBuildings: "",
                        squareFootage: "",
                      })
                      window.open(bookingUrl, "_blank")
                    }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Compliance Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Funding Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-800 space-y-2">
                <p>
                  <strong>ECAPP ($2M):</strong> Limited state funding means highly competitive selection process.
                  Priority given to projects demonstrating substantial energy savings and early compliance.
                </p>
                <p>
                  <strong>BERI ($12M):</strong> Federal funds require additional compliance with prevailing wage laws,
                  Buy America provisions, and environmental review processes.
                </p>
                <p>
                  <strong>Timeline:</strong> Grant processes take 3-6 months. Plan applications well in advance of
                  project start dates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Official Program Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800 space-y-2">
                <p>
                  <strong>ECAPP Details:</strong> Contact Colorado Energy Office for current application cycles,
                  eligibility criteria, and award amounts.
                </p>
                <p>
                  <strong>BERI Information:</strong> Federal CERTA program administered through Colorado Energy Office with
                  additional state-specific guidelines.
                </p>
                <p>
                  <strong>Resources:</strong> Visit{" "}
                  <a
                    href="https://www.oregon.gov/energy"
                    className="underline hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    oregon.gov/energy
                  </a>{" "}
                  for official program documentation and application forms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        selectedPackage="Incentive Application Support"
      />
    </>
  )
}
