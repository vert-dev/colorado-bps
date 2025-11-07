import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Building2, Star, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { BookCallButton } from "@/components/book-call-button"

export const metadata: Metadata = {
  title: "About Vert Energy Group | Colorado BPS Compliance Experts | Inc 5000 Company",
  description:
    "Vert Energy Group: 16 years of Colorado BPS compliance expertise. Inc 5000 company for 5 consecutive years. Energy Star Partner. VertPro platform manages 10,000+ properties nationwide. Oregon Verified Energy Auditor Network member.",
  keywords: [
    "Vert Energy Group",
    "Colorado BPS experts",
    "Inc 5000 company",
    "Energy Star Partner",
    "VertPro platform",
    "Oregon Verified Energy Auditor",
    "CBPS compliance services",
    "energy management compliance",
    "building performance standards",
    "commercial energy audits",
    "ASHRAE Level 2 audits",
    "Oregon energy compliance",
  ],
  openGraph: {
    title: "About Vert Energy Group | Colorado BPS Experts",
    description:
      "16 years of CBPS expertise. Inc 5000 company. Energy Star Partner. VertPro platform serves 10,000+ properties.",
    url: "https://co-bps.com/about",
    images: [
      {
        url: "/images/vert-energy-group-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Vert Energy Group - Colorado BPS Experts",
      },
    ],
  },
  alternates: {
    canonical: "https://co-bps.com/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-colorado-blue-900 via-colorado-blue-800 to-colorado-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/images/vert-energy-group-official-logo.png"
                alt="Vert Energy Group Logo"
                width={300}
                height={120}
                className="mx-auto mb-6"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Why Vert Energy Group</h1>
            <p className="text-xl md:text-2xl mb-8 text-colorado-blue-100">Your Expert Partner in Clean Buildings Compliance</p>
            <p className="text-lg max-w-3xl mx-auto text-colorado-blue-50">
              For 16 years, we've specialized in energy compliance and performance projects, backed by VertPro®, our
              nationwide SaaS platform built to manage compliance across 50+ energy laws in the U.S.
            </p>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Track Record of Excellence</h2>
            <p className="text-lg text-gray-600">
              Recognized nationally for sustained growth and innovation in energy compliance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Inc 5000 Recognition */}
            <Card className="p-6 border-2 border-colorado-gold-200">
              <CardContent className="text-center">
                <div className="mb-4">
                  <Image
                    src="/images/inc5000-medallion.png"
                    alt="Inc. 5000 Medallion"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5 Consecutive Years on Inc. 5000</h3>
                <div className="space-y-1 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">2021:</span>
                    <span>Ranked #1603 nationally</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">2022:</span>
                    <span>Ranked #4281</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">2021:</span>
                    <span>Ranked #3889</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">2024:</span>
                    <span>Ranked #3211</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">2025:</span>
                    <span>Ranked #2559</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">Sustained high growth delivering compliance solutions</p>
              </CardContent>
            </Card>

            {/* Platform Award */}
            <Card className="p-6 border-2 border-yellow-200">
              <CardContent className="text-center">
                <div className="mb-4">
                  <Image
                    src="/images/platform-award-trophy.png"
                    alt="2024 Energy Benchmark Platform Award"
                    width={100}
                    height={130}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2024 Energy Benchmark Compliance Platform Company of the Year
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Awarded by <strong>Energy Tech Review</strong> for excellence and innovation in energy management and
                  compliance solutions.
                </p>
                <p className="text-xs text-gray-600">
                  Featured on cover story highlighting our industry-leading platform
                </p>
              </CardContent>
            </Card>

            {/* Top Smart Building Solutions Award */}
            <Card className="p-6 border-2 border-blue-200">
              <CardContent className="text-center">
                <div className="mb-4">
                  <Image
                    src="/images/top-smart-building-award.png"
                    alt="Top Smart Building Solution Providers 2021"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Top Smart Building Solution Providers 2021</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Recognized by <strong>PropTech Outlook</strong> as one of the top smart building solution providers,
                  highlighting our innovative VertPro® platform.
                </p>
                <p className="text-xs text-gray-600">
                  "One Platform to Simplify Building Upgrades & Compliance" - Featured for making sustainability more
                  accessible
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Industry Leadership */}
          <Card className="p-8 bg-colorado-blue-50 border-2 border-colorado-gold-200">
            <CardContent>
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-colorado-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Industry Leadership</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-colorado-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">16 Years of Expertise</h4>
                    <p className="text-gray-600">Founded in 2009, specialized in energy compliance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-colorado-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">PropTech Recognition</h4>
                    <p className="text-gray-600">Top 10 Smart Building Solutions Provider</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-colorado-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">VertPro® Platform</h4>
                    <p className="text-gray-600">Nationwide compliance SaaS for 50+ energy laws</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why We're Uniquely Qualified for Colorado BPS
            </h2>
            <p className="text-lg text-gray-600">Comprehensive expertise that delivers results at portfolio scale</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center mb-4">
                  <Building2 className="h-8 w-8 text-colorado-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Proprietary VertPro® Platform</h3>
                </div>
                <p className="text-gray-600">
                  Purpose-built SaaS solution specifically designed for nationwide energy compliance. Manages all 50+
                  energy benchmarking and efficiency laws.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-colorado-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Portfolio-Scale Experience</h3>
                </div>
                <p className="text-gray-600">
                  Proven track record managing compliance for large industrial and commercial portfolios. Our
                  methodology is optimized for multi-property implementation.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center mb-4">
                  <Star className="h-8 w-8 text-colorado-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Guaranteed Compliance</h3>
                </div>
                <p className="text-gray-600">
                  We guarantee to meet all regulatory deadlines and secure available incentives, with a proven
                  systematic approach that eliminates compliance risk.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What Sets Us Apart */}
          <Card className="p-8 bg-blue-50 border-2 border-blue-200">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Sets Us Apart</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Full Accountability</h4>
                    <p className="text-gray-600">We manage the entire compliance process, owning outcomes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Technical Depth</h4>
                    <p className="text-gray-600">Team includes certified energy managers and PEs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Incentive Capture</h4>
                    <p className="text-gray-600">Specialists in securing $200k+ incentives</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">WA CBPS Expertise</h4>
                    <p className="text-gray-600">Deep understanding of Oregon's Building Performance Standard</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Credentials & Partnerships */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Credentials & Partnerships</h2>
            <p className="text-lg text-gray-600">
              Officially recognized and qualified by leading industry organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent>
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/energy-star-partner.png"
                    alt="Energy Star Partner"
                    width={60}
                    height={60}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Energy Star Partner</h3>
                    <p className="text-gray-600">Official EPA Energy Star Partner</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Recognized by the EPA for leadership in energy efficiency and environmental protection.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center mb-4">
                  <Building2 className="h-12 w-12 text-colorado-blue-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">WA State Verified Energy Auditor Network</h3>
                    <p className="text-gray-600">Washington Department of Commerce</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Part of Oregon's official Verified Energy Auditor Network, qualified to perform ASHRAE Level
                  2 Energy Audits for CBPS compliance.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Metrics */}
          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-colorado-blue-500 mb-2">10,000+</div>
                <div className="text-gray-600">Properties Supported</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-colorado-blue-500 mb-2">50+</div>
                <div className="text-gray-600">Energy Laws Managed</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-colorado-blue-500 mb-2">16</div>
                <div className="text-gray-600">Years of Expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-colorado-blue-600 to-colorado-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with the Industry Leader</h2>
          <p className="text-xl mb-8 text-colorado-blue-100">
            Transform your compliance challenge into a significant financial opportunity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-colorado-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <Link href="/pricing">Start Compliance Now</Link>
            </Button>
            <BookCallButton
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-colorado-blue-600 font-semibold px-8 py-4 text-lg bg-transparent"
            >
              Book a Call
            </BookCallButton>
          </div>
          <p className="text-sm text-colorado-gold-300 mt-6">
            Join 10,000+ properties that trust Vert Energy Group for compliance success
          </p>
        </div>
      </section>
    </div>
  )
}
