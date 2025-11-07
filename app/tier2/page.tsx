"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContactFormModal } from "@/components/contact-form-modal"
import { Building2, CheckCircle, Clock, DollarSign, Shield, ArrowRight } from "lucide-react"

export default function Tier2LandingPage() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("")

  const handlePackageClick = (packageName: string) => {
    setSelectedPackage(packageName)
    setShowContactModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-colorado-blue-900 via-colorado-blue-800 to-colorado-blue-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/oregon-bps-logo.png" alt="CBPS Logo" width={40} height={40} className="bg-transparent" />
            <span className="text-white font-bold text-xl">WashingtonCBPS.com</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              onClick={() => handlePackageClick("Tier 2 Package")}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Location Badge */}
          <div className="flex justify-center mb-8">
            <Badge className="bg-yellow-400 text-colorado-blue-800 hover:bg-yellow-300 px-4 py-2 text-sm font-medium">
              <Building2 className="w-4 h-4 mr-2" />
              Oregon • Tier 2 CBPS Compliance
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get CBPS Compliant
            <br />
            <span className="text-yellow-400">For Free</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional Tier 2 compliance packages fully covered by Oregon incentives. Act by July 2026 to
            secure your $15,000-$17,000 incentive before funding runs out.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-colorado-blue-800 font-bold px-8 py-4 text-lg mb-16"
            onClick={() => handlePackageClick("Tier 2 Early Adopter Package")}
          >
            Claim My Free Package
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Product Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative">
              <Image
                src="/images/cbps-dashboard-mockup.png"
                alt="CBPS Compliance Dashboard"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />

              {/* Floating CTA Card */}
              <div className="absolute -left-4 md:-left-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-colorado-blue-800 p-6 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center mb-2">
                  <Building2 className="w-6 h-6 mr-2" />
                  <span className="font-bold text-lg">TIER 2</span>
                </div>
                <div className="font-bold text-xl mb-2">Get Compliant Now</div>
                <div className="text-sm opacity-90">Before incentives run out</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/5 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose Our Tier 2 Packages?</h2>
            <p className="text-xl text-white/80">Complete compliance solution with zero out-of-pocket costs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-colorado-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">$0 Net Cost</h3>
              <p className="text-white/80">$15,000-$17,000 incentives fully cover our professional packages</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-colorado-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Compliant</h3>
              <p className="text-white/80">Guaranteed compliance with all Tier 2 requirements and deadlines</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-colorado-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Act Fast</h3>
              <p className="text-white/80">Limited $150M incentive pool - secure yours before it's gone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Choose Your Tier 2 Package</h2>
            <p className="text-xl text-white/80">Both packages fully covered by Oregon incentives</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Commercial Package */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Commercial Package</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">$15,000</div>
                <div className="text-white/80 line-through">Regular Price</div>
                <div className="text-2xl font-bold text-colorado-gold-500">$0 With Incentives</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Complete EMP + O&M Development
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  ENERGY STAR Portfolio Manager Setup
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Compliance Filing & Documentation
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Ongoing Support Through 2027
                </li>
              </ul>

              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-colorado-blue-800 font-bold py-3"
                onClick={() => handlePackageClick("Commercial Tier 2 Package")}
              >
                Start My Commercial Package
              </Button>
            </div>

            {/* Multifamily Package */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Multifamily Package</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">$17,000</div>
                <div className="text-white/80 line-through">Regular Price</div>
                <div className="text-2xl font-bold text-colorado-gold-500">$0 With Incentives</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Tenant Engagement Strategy
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Anti-Displacement Agreement
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Complete EMP + O&M Development
                </li>
                <li className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-500 mr-3 flex-shrink-0" />
                  Compliance Filing & Documentation
                </li>
              </ul>

              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-colorado-blue-800 font-bold py-3"
                onClick={() => handlePackageClick("Multifamily Tier 2 Package")}
              >
                Start My Multifamily Package
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="bg-red-900/20 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't Wait Until 2027</h2>
            <p className="text-xl text-white/90 mb-8">
              Your EMP + O&M must be operational by July 1, 2026 to avoid penalties. The $150M incentive pool is being
              depleted rapidly - secure yours now.
            </p>
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-4 text-lg"
              onClick={() => handlePackageClick("Urgent Tier 2 Package")}
            >
              Reserve My Package Today
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  )
}
