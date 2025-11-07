"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Clock, Shield, Users, Calculator } from "lucide-react"
import { ContactFormModal } from "@/components/contact-form-modal"
import Image from "next/image"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

export default function PricingPageClient() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("")
  const { openBooking } = useHubSpotBooking()

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName)
    setIsContactModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Image
              src="/images/oregon-bps-emblem-hero.png"
              alt="Colorado BPS Emblem"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Flat-Fee Compliance Packages.
            <br />
            <span className="text-colorado-blue-500">Covered by Incentives.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
            Oregon's Building Performance Standard is here. Don't wait until 2028 — Tier 1 buildings must meet EUI targets by{" "}
            <strong>June 2028-2030</strong>. Act now and secure <strong>ECAPP/BERI grant funding</strong> to offset 30-60% of compliance costs.
          </p>
        </div>
      </section>

      {/* Tier II Packages */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tier II Packages (20k–50k sq ft + all Multifamily ≥20k)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Commercial Package */}
            <Card className="relative border-2 border-slate-200 hover:border-colorado-blue-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Tier II: Commercial</CardTitle>
                <CardDescription className="text-slate-600">20–50k sq ft commercial buildings</CardDescription>
                <div className="text-4xl font-bold text-colorado-blue-500 mt-4">
                  $15,000
                  <span className="text-lg font-normal text-slate-500"> flat</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Energy Management Plan (EMP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Operations & Maintenance Program (O&M)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Benchmarking setup & filing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Staff training + certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Incentive paperwork filing</span>
                  </div>
                </div>

                <div className="bg-colorado-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-colorado-blue-700 mb-2">
                    <strong>Incentive offset:</strong> $0.30/sf → Typical 50k building ={" "}
                    <strong>$15,000 incentive</strong>
                  </p>
                  <p className="text-lg font-bold text-colorado-blue-600">
                    💰 Net cost: <span className="text-2xl">$0</span> (if incentive approved)
                  </p>
                </div>

                <Button
                  className="w-full bg-colorado-blue-500 hover:bg-colorado-blue-600"
                  onClick={() => handlePackageSelect("Tier II Commercial Package - $15,000")}
                >
                  Start My Commercial Package
                </Button>
              </CardContent>
            </Card>

            {/* Multifamily Package */}
            <Card className="relative border-2 border-colorado-blue-500 shadow-lg">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-colorado-blue-500 text-white">
                Enhanced Incentives
              </Badge>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Tier II: Multifamily</CardTitle>
                <CardDescription className="text-slate-600">20–50k sq ft multifamily buildings</CardDescription>
                <div className="text-4xl font-bold text-colorado-blue-500 mt-4">
                  $17,000
                  <span className="text-lg font-normal text-slate-500"> flat</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Energy Management Plan (EMP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>O&M Program tailored for multifamily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Resident-focused policies + manager training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Benchmarking setup & filing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Incentive paperwork filing</span>
                  </div>
                </div>

                <div className="bg-colorado-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-colorado-blue-700 mb-2">
                    <strong>Incentive offset:</strong> $0.30/sf base;{" "}
                    <strong>$0.75/sf with Anti-Displacement Agreement</strong> → Typical 50k ={" "}
                    <strong>$37,500 incentive</strong>
                  </p>
                  <p className="text-lg font-bold text-colorado-blue-600">
                    💰 Net cost: <span className="text-2xl">$0</span> (if incentive approved)
                  </p>
                </div>

                <Button
                  className="w-full bg-colorado-blue-500 hover:bg-colorado-blue-600"
                  onClick={() => handlePackageSelect("Tier II Multifamily Package - $17,000")}
                >
                  Start My Multifamily Package
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Discounts */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Portfolio Discounts</h3>
              <p className="text-slate-600 mb-4">
                Manage 5+ buildings? Get <strong>10% off</strong> portfolio packages.
                <br />
                Bulk onboarding + group training sessions included.
              </p>
              <Button
                variant="outline"
                className="border-colorado-blue-500 text-colorado-blue-500 hover:bg-colorado-blue-50 bg-transparent"
                onClick={() => openBooking()}
              >
                Talk to Us About Portfolios
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tier I Packages */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tier I Packages (≥50k nonresidential, hotel, motel, dormitory)
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Documentation Package */}
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Tier I: Documentation Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Energy Management Plan (EMP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>O&M Program (12-month look-back logs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Benchmarking setup & filing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Forms A/B/C preparation + portal submission</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span>50–90k sq ft</span>
                    <span className="font-bold text-blue-600">$25,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span>90–220k sq ft</span>
                    <span className="font-bold text-blue-600">$35,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded border">
                    <span>&gt; 220k sq ft</span>
                    <span className="font-bold text-blue-600">$45,000</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePackageSelect("Tier I Documentation Package")}
                >
                  Start My Tier I Package
                </Button>
              </CardContent>
            </Card>

            {/* Conditional Path Package */}
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Tier I: Conditional Path Package</CardTitle>
                <CardDescription className="text-orange-700">
                  <em>If building doesn't meet EUIt</em>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-orange-600">Add-on: $15,000–$25,000</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span>ASHRAE Level II Audit (Form D)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span>Investment Criteria Tool (Form F)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <span>Implementation roadmap</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-bold text-blue-800 mb-2">Tier I Incentives</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>$0.85/sf</strong> OR <strong>$2.00/sf + $0.05 per kBtu saved &gt;15</strong> (capped at 50%
                    of project cost)
                  </p>
                  <p className="text-sm text-blue-700">
                    Example: 100k ft² office → <strong>$85k–$200k+ incentive</strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    💰 Packages designed to ensure you capture maximum funding
                  </p>
                </div>

                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => handlePackageSelect("Tier I Conditional Path Package")}
                >
                  Start My Conditional Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Guarantee */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="h-12 w-12 text-colorado-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6">On Time. State-Ready. Guaranteed.</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-colorado-blue-500" />
              <span className="text-slate-700">Incentive filing handled for you</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-colorado-blue-500" />
              <span className="text-slate-700">On-time delivery of EMP + O&M package</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-colorado-blue-500" />
              <span className="text-slate-700">Money-back if we don't deliver by deadline</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-colorado-blue-500 hover:bg-colorado-blue-600 text-white px-8 py-4"
            onClick={() => handlePackageSelect("Package Reservation")}
          >
            Reserve My Package Today
          </Button>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-red-50 border-t-4 border-red-500">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-red-900 mb-4">🚨 Don't Wait Until 2027</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 bg-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Tier II Deadline</h3>
                <p className="text-sm text-red-700">
                  Your EMP + O&M must be <strong>operational by July 1, 2026</strong> to file in 2027
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-6 text-center">
                <Calculator className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Limited Incentives</h3>
                <p className="text-sm text-red-700">
                  <strong>$150M pool is first-come, first-served</strong>. At current pace, funds may run out before
                  2027
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Penalties</h3>
                <p className="text-sm text-red-700">
                  <strong>$0.30/sf (Tier II)</strong> or <strong>$5,000 + $1.00/sf annually (Tier I)</strong> if late
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4"
              onClick={() => handlePackageSelect("Urgent Compliance Package")}
            >
              Start My Compliance Package
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">FAQ Highlights</h2>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-3">Q: Why act now if my Tier II deadline is 2027?</h3>
                <p className="text-slate-700">
                  A: Because O&M must be <strong>implemented by July 1, 2026</strong>, and incentives will likely be
                  gone if you wait.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-3">Q: How much will it really cost me?</h3>
                <p className="text-slate-700">
                  A: With incentives, your net cost is usually <strong>$0</strong> for Tier II and often covered for
                  Tier I.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-3">Q: Do I need an engineer?</h3>
                <p className="text-slate-700">
                  A: Tier I requires a Qualified Person (e.g. PE, CEM) on forms. Tier II only needs a Qualified Energy
                  Manager (QEM). Vert handles it either way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-colorado-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Secure Your Incentives. Avoid Penalties. Simplify Compliance.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-colorado-blue-500 hover:bg-gray-100 px-8 py-4"
              onClick={() => handlePackageSelect("Final CTA Package")}
            >
              Start My Package
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-colorado-blue-500 px-8 py-4 bg-transparent"
              onClick={() => openBooking()}
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  )
}
