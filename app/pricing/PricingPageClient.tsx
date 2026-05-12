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
              src="/images/colorado-bps-logo.png"
              alt="Colorado BPS Emblem"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Flat-Fee Compliance Packages
            <br />
            <span className="text-colorado-blue-500">For Colorado BPS (HB 21-1286)</span>
          </h1>
          <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
            Colorado's Building Performance Standard applies to all buildings ≥50,000 sq ft. Your energy audit,
            compliance plan, and pathway selection are due <strong>December 31, 2025</strong>. Interim performance
            targets are due <strong>December 31, 2026</strong> and final targets <strong>December 31, 2030</strong>.
            We stack federal IRA credits and utility rebates to offset upgrade costs.
          </p>
        </div>
      </section>

      {/* Foundation Package */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Foundation Package — Audit + Plan + Pathway Selection
            </h2>
            <p className="text-slate-600">Required for every covered building before December 31, 2025</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Audit + Plan Package */}
            <Card className="relative border-2 border-slate-200 hover:border-colorado-blue-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Audit + Compliance Plan</CardTitle>
                <CardDescription className="text-slate-600">
                  ASHRAE Level 2 audit and CDPHE-ready compliance plan
                </CardDescription>
                <div className="text-4xl font-bold text-colorado-blue-500 mt-4">
                  $15,000
                  <span className="text-lg font-normal text-slate-500"> flat</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>ASHRAE Level 2 energy audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Compliance plan + pathway recommendation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>ENERGY STAR Portfolio Manager + BEAM Portal setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>2021 baseline verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>CDPHE filing by December 31, 2025</span>
                  </div>
                </div>

                <div className="bg-colorado-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-colorado-blue-700 mb-2">
                    <strong>Federal incentive:</strong> Audit costs may qualify under IRA 179D when paired with
                    qualifying upgrades.
                  </p>
                </div>

                <Button
                  className="w-full bg-colorado-blue-500 hover:bg-colorado-blue-600"
                  onClick={() => handlePackageSelect("Foundation: Audit + Compliance Plan - $15,000")}
                >
                  Start Foundation Package
                </Button>
              </CardContent>
            </Card>

            {/* Annual Benchmarking Package */}
            <Card className="relative border-2 border-colorado-blue-500 shadow-lg">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-colorado-blue-500 text-white">
                Required Annually
              </Badge>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Annual Benchmarking</CardTitle>
                <CardDescription className="text-slate-600">
                  Annual report due June 1 each year via BEAM Portal
                </CardDescription>
                <div className="text-4xl font-bold text-colorado-blue-500 mt-4">
                  $2,500
                  <span className="text-lg font-normal text-slate-500"> / building / year</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Whole-building utility data collection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Portfolio Manager → BEAM Portal submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>$100/building program fee handled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Progress reporting vs interim and final targets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Avoids $500 / $2,000 benchmarking penalties</span>
                  </div>
                </div>

                <div className="bg-colorado-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-colorado-blue-700">
                    Bundle with the Foundation Package and get the first benchmarking year included.
                  </p>
                </div>

                <Button
                  className="w-full bg-colorado-blue-500 hover:bg-colorado-blue-600"
                  onClick={() => handlePackageSelect("Annual Benchmarking - $2,500/yr")}
                >
                  Start Benchmarking
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
                Bulk onboarding and group training sessions included.
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

      {/* Pathway Implementation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Pathway Implementation Packages
            </h2>
            <p className="text-slate-600">
              Pick the pathway that fits your portfolio. We handle measure design, incentive stacking, and
              compliance reporting through 2030.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Targeted EUI / GHG Pathway</CardTitle>
                <CardDescription className="text-slate-600">
                  Meet your building-type-specific target
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Targeted EUI or GHG intensity measure design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>IRA 179D / 45L documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Utility rebate filing (Xcel, Black Hills)</span>
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
                  onClick={() => handlePackageSelect("Targeted EUI / GHG Pathway")}
                >
                  Start Targeted Pathway
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-colorado-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Standard % Reduction Pathway</CardTitle>
                <CardDescription className="text-slate-600">
                  13% reduction by 2026, 29% by 2030 vs 2021 baseline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>2021 baseline lock and verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Measure roadmap to 13% interim / 29% final</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-colorado-blue-500" />
                    <span>Annual progress reporting through 2030</span>
                  </div>
                </div>
                <div className="bg-colorado-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-colorado-blue-700">
                    Best for buildings whose 2021 baseline EUI is well above the assigned target.
                  </p>
                </div>
                <Button
                  className="w-full bg-colorado-blue-500 hover:bg-colorado-blue-600"
                  onClick={() => handlePackageSelect("Standard % Reduction Pathway")}
                >
                  Start Standard % Pathway
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">GHG Reduction Pathway</CardTitle>
                <CardDescription className="text-amber-700">
                  Electrification + renewables focus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span>Electrification feasibility study</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span>On-site renewables + REC strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <span>GHG intensity tracking + reporting</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg mb-6 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    Best for owners with capital projects already aligned to electrification or renewables.
                  </p>
                </div>
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => handlePackageSelect("GHG Reduction Pathway")}
                >
                  Start GHG Pathway
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">On Time. CDPHE-Ready. Guaranteed.</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-colorado-blue-500" />
              <span className="text-slate-700">Incentive filing handled for you</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-colorado-blue-500" />
              <span className="text-slate-700">Audit + plan filed by Dec 31, 2025</span>
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
            <h2 className="text-3xl font-bold text-red-900 mb-4">The December 31, 2025 Deadline Is Real</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 bg-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Audit + Pathway</h3>
                <p className="text-sm text-red-700">
                  Energy audit, compliance plan, and pathway selection are <strong>due Dec 31, 2025</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-6 text-center">
                <Calculator className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Interim Target</h3>
                <p className="text-sm text-red-700">
                  <strong>December 31, 2026</strong>: meet your interim target. Monthly penalties begin June 1, 2027.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-900 mb-2">Benchmarking Penalties</h3>
                <p className="text-sm text-red-700">
                  <strong>$500</strong> first miss, <strong>$2,000</strong> each subsequent occurrence.
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
                <h3 className="font-bold text-slate-900 mb-3">Q: Does Colorado BPS have tiers?</h3>
                <p className="text-slate-700">
                  A: No. HB 21-1286 applies a single threshold — buildings <strong>≥50,000 sq ft</strong> — across
                  commercial, multifamily, and institutional property types.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-3">Q: How much will it really cost me?</h3>
                <p className="text-slate-700">
                  A: Federal IRA 179D (up to $5/sqft) plus Xcel and Black Hills utility rebates typically offset
                  30–60% of upgrade costs. We file every incentive on your behalf.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-3">Q: Which pathway should I pick?</h3>
                <p className="text-slate-700">
                  A: It depends on your 2021 baseline, capital plan, and target type. We run a free side-by-side
                  analysis as part of the Foundation Package.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-colorado-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">File On Time. Stack Every Incentive. Hit Your Targets.</h2>
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
