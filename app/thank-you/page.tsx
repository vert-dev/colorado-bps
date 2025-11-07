import type { Metadata } from "next"
import { CheckCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookCallButton } from "@/components/book-call-button"

export const metadata: Metadata = {
  title: "Thank You | CBPS Compliance Inquiry Received | Colorado BPS",
  description:
    "Thank you for your Colorado BPS compliance inquiry. We'll contact you within 24 hours with your custom assessment, penalty risk calculation, and incentive eligibility review.",
  keywords: [
    "CBPS compliance inquiry",
    "Colorado BPS assessment",
    "building compliance consultation",
    "CBPS penalty risk",
    "energy incentive eligibility",
    "compliance roadmap",
    "Oregon building compliance",
  ],
  robots: {
    index: false, // Don't index thank you pages
    follow: true,
  },
  openGraph: {
    title: "Thank You | CBPS Compliance Inquiry Received",
    description: "We'll contact you within 24 hours with your custom CBPS assessment and compliance roadmap.",
    url: "https://co-bps.com/thank-you",
  },
  alternates: {
    canonical: "https://co-bps.com/thank-you",
  },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <CheckCircle className="w-20 h-20 text-colorado-blue-500 mx-auto mb-6" />

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Thank You for Your Interest!</h1>

          <p className="text-lg text-slate-600 mb-6">
            We've received your CBPS compliance inquiry and will contact you within 24 hours with your custom
            assessment.
          </p>

          <div className="bg-colorado-blue-50 border border-colorado-gold-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-colorado-blue-700 mb-3">What Happens Next:</h2>
            <ul className="text-sm text-colorado-blue-600 space-y-2 text-left">
              <li>✓ Custom CBPS compliance assessment within 24 hours</li>
              <li>✓ Penalty risk calculation for your specific building</li>
              <li>✓ Early adopter incentive eligibility review</li>
              <li>✓ Step-by-step compliance roadmap</li>
              <li>✓ Fixed-price service options (no obligation)</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-slate-800 mb-3">Need Immediate Assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12065934243"
                className="flex items-center justify-center gap-2 text-colorado-blue-500 hover:text-colorado-blue-600 font-medium"
              >
                <Phone className="w-4 h-4" />
                (206) 593-4243
              </a>
              <BookCallButton
                variant="ghost"
                className="text-colorado-blue-500 hover:text-colorado-blue-600 font-medium"
              >
                Schedule a Call
              </BookCallButton>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="w-full sm:w-auto bg-colorado-blue-500 hover:bg-colorado-blue-600">View Compliance Packages</Button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 mt-6">Check your email for confirmation and additional resources.</p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "CBPS Compliance Inquiry Confirmation",
              description: "Confirmation page for Colorado BPS compliance inquiry submission",
              url: "https://co-bps.com/thank-you",
              mainEntity: {
                "@type": "ContactPoint",
                telephone: "+1-206-593-4243",
                contactType: "Customer Service",
                areaServed: "Oregon",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
