"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

export default function CBPSSummaryGuideClientPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const { getBookingUrl } = useHubSpotBooking()

  useEffect(() => {
    // Check if user came from email capture (simple check - in production would use proper auth)
    const hasEmailCapture = sessionStorage.getItem("cbps-email-captured")
    if (!hasEmailCapture) {
      router.push("/")
      return
    }
    setHasAccess(true)
  }, [router])

  const handleDownload = () => {
    // Create download link for the PDF
    const link = document.createElement("a")
    link.href = "/resources/cbps-summary-guide.pdf"
    link.download = "CBPS-Summary-Guide.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">CBPS Summary Guide</h1>
              <p className="text-slate-600">
                Complete overview of Colorado Building Performance Standard
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">What's Included:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Tier 1 & Tier 2 requirements breakdown</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Critical deadlines and timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Compliance pathways and options</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Penalty structures and calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Early adopter incentive details</span>
                </li>
              </ul>
            </div>
            <div>
              <Card className="p-6 bg-emerald-50 border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-3">Ready to Download</h3>
                <p className="text-emerald-700 text-sm mb-4">
                  Your comprehensive 24-page guide to CBPS compliance is ready. This PDF includes everything you need to
                  understand your requirements and next steps.
                </p>
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Guide
                </Button>
              </Card>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Need Help with Implementation?</h2>
            <p className="text-slate-600 mb-6">
              While this guide provides comprehensive information, every building is unique. Our CBPS experts can help
              you create a customized compliance strategy that saves time and money.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-slate-800 hover:bg-slate-900">
                <Link href="/pricing">View Compliance Packages</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={getBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule Free Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
