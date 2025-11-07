"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, DollarSign, Calendar, TrendingUp, AlertCircle, Building } from "lucide-react"
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
              Federal Incentives Available Now
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Colorado BPS Incentive Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While Colorado has limited state funding, significant federal IRA tax credits and utility rebates are
              available to help offset compliance costs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Federal IRA 179D Tax Credit */}
            <Card className="border-2 border-colorado-blue-200 bg-colorado-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-colorado-blue-800">IRA 179D Tax Credit</CardTitle>
                  <Badge className="bg-colorado-blue-600 text-white">Up to $5/sqft</Badge>
                </div>
                <CardDescription className="text-colorado-blue-700 font-semibold">
                  Federal Energy Efficient Commercial Buildings Deduction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-colorado-gold-600" />
                    <span className="font-semibold text-colorado-blue-800">Program Details</span>
                  </div>
                  <p className="text-2xl font-bold text-colorado-gold-600 mb-2">Up to $5.00 per sq ft</p>
                  <p className="text-sm text-gray-700">Federal tax deduction for energy efficiency improvements (Inflation Reduction Act)</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-colorado-blue-800">Eligible Improvements:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      HVAC system upgrades (up to $1.00/sqft)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Building envelope improvements (up to $1.00/sqft)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Interior lighting systems (up to $1.00/sqft)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                      Whole-building projects achieving 50%+ energy savings (up to $5.00/sqft)
                    </li>
                  </ul>
                </div>

                <div className="bg-colorado-blue-100 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-colorado-blue-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-colorado-blue-800">Available Through 2032</p>
                      <p className="text-sm text-colorado-blue-700">Annual tax deduction for qualifying energy efficiency projects</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Requirements:</strong> Projects must achieve specified energy savings targets verified
                      through energy modeling. Prevailing wage requirements apply for maximum credit amounts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Utility Rebate Programs */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-800">Utility Rebate Programs</CardTitle>
                  <Badge className="bg-blue-600 text-white">Varies by Utility</Badge>
                </div>
                <CardDescription className="text-blue-700 font-semibold">
                  Xcel Energy, Black Hills Energy, and Municipal Utilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Rebate Opportunities</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">Up to 50% of Project Costs</p>
                  <p className="text-sm text-gray-700">
                    Colorado utilities offer rebates for energy efficiency measures
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">Typical Rebate Categories:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      HVAC equipment upgrades and controls
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      LED lighting retrofits and controls
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      Building automation systems (BAS)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      Custom efficiency projects (engineered approach)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      Energy audits and retro-commissioning
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800">Utility-Specific Programs</p>
                      <p className="text-sm text-blue-700">
                        Contact your utility provider for current rebate schedules and pre-approval requirements
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Application Required:</strong> Most rebates require pre-approval before project start.
                      Rebate amounts and eligibility vary by utility service territory.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colorado Energy Office Support */}
          <Card className="border-2 border-colorado-gold-200 bg-colorado-gold-50 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Colorado Energy Office Technical Assistance</CardTitle>
              <CardDescription className="text-slate-700">
                Free resources and guidance for Colorado BPS compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-colorado-gold-200">
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Building Owner Portal</h4>
                  <p className="text-sm text-gray-700">
                    Access customized compliance reports, technical guides, and submit required documentation through
                    Colorado's BEAM Portal.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-colorado-gold-200">
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Technical Resource Guides</h4>
                  <p className="text-sm text-gray-700">
                    Detailed guidance on benchmarking, pathway selection, energy audits, and compliance verification
                    available through the state portal.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-colorado-gold-200">
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Help Desk Support</h4>
                  <p className="text-sm text-gray-700">
                    Direct support from Colorado Energy Office staff for questions about compliance requirements, deadlines,
                    and technical guidance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Combined Strategy Card */}
          <Card className="bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-50 border-2 border-colorado-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-colorado-blue-800">Maximize Your Incentives</CardTitle>
              <CardDescription className="text-colorado-blue-700">
                Stack federal tax credits with utility rebates for maximum savings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="text-3xl font-bold text-colorado-gold-600 mb-2">Step 1</div>
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Energy Audit</h4>
                  <p className="text-sm text-gray-700">
                    Complete energy audit by Dec 31, 2025 to identify efficiency opportunities and estimate IRA 179D eligibility
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Step 2</div>
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Stack Incentives</h4>
                  <p className="text-sm text-gray-700">
                    Apply for utility rebates (pre-approval), then claim federal 179D tax credit after project completion
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-colorado-blue-200">
                  <div className="text-3xl font-bold text-colorado-blue-600 mb-2">Step 3</div>
                  <h4 className="font-semibold text-colorado-blue-800 mb-2">Meet Targets</h4>
                  <p className="text-sm text-gray-700">
                    Achieve 7% (2026) and 20% (2030) reductions, avoid penalties, reduce operating costs long-term
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-colorado-blue-200 mt-6">
                <h4 className="font-semibold text-colorado-blue-800 mb-3 text-lg">Incentive Application Support Available</h4>
                <p className="text-gray-700 mb-4">
                  Our team has experience navigating federal IRA tax credits and utility rebate programs. We can help you:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Assess IRA 179D tax credit eligibility
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Coordinate utility rebate pre-approvals
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-colorado-gold-600 mt-0.5 flex-shrink-0" />
                    Prepare energy modeling documentation
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
                  Incentive Considerations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-800 space-y-2">
                <p>
                  <strong>IRA 179D Tax Credits:</strong> Require energy modeling certification and may have prevailing wage
                  requirements for maximum credit amounts. Work with qualified tax professionals.
                </p>
                <p>
                  <strong>Utility Rebates:</strong> Most require pre-approval before project start. Rebate amounts vary
                  by utility territory and may have annual budget caps—apply early.
                </p>
                <p>
                  <strong>Timeline:</strong> Incentive application processes take 2-6 months. Plan applications well in
                  advance of December 2025 audit deadline.
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
                  <strong>Colorado Energy Office:</strong> Visit{" "}
                  <a
                    href="https://energyoffice.colorado.gov/building-performance"
                    className="underline hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    energyoffice.colorado.gov/building-performance
                  </a>{" "}
                  for official BPS compliance information.
                </p>
                <p>
                  <strong>BEAM Portal:</strong> Access Colorado's Building Owner Portal at{" "}
                  <a
                    href="https://co.beam-portal.org"
                    className="underline hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    co.beam-portal.org
                  </a>{" "}
                  for benchmarking and compliance reporting.
                </p>
                <p>
                  <strong>IRS 179D Info:</strong> Visit{" "}
                  <a
                    href="https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction"
                    className="underline hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IRS.gov
                  </a>{" "}
                  for federal tax credit details and requirements.
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
