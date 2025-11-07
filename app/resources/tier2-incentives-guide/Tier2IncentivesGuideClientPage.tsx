"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, DollarSign, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

export default function Tier2IncentivesGuideClientPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const { getBookingUrl } = useHubSpotBooking()

  useEffect(() => {
    const hasEmailCapture = sessionStorage.getItem("cbps-email-captured")
    if (!hasEmailCapture) {
      router.push("/")
      return
    }
    setHasAccess(true)
  }, [router])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resources/tier2-incentives-guide.pdf"
    link.download = "Tier2-Incentives-Guide.pdf"
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
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Tier 2 Incentives Guide</h1>
              <p className="text-slate-600">Complete guide to Early Adopter incentives and funding opportunities</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Funding Pool Depleting Fast</h3>
                <p className="text-red-700 text-sm">
                  The $150M incentive pool is expected to be exhausted by Q2 2026. Act now to secure your funding.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Guide Contents:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Incentive amounts by building type</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Application process and requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Anti-Displacement Agreement details</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Timeline and deadlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Funding calculation examples</span>
                </li>
              </ul>
            </div>
            <div>
              <Card className="p-6 bg-amber-50 border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-3">Download Your Guide</h3>
                <p className="text-amber-700 text-sm mb-4">
                  Get the complete incentive guide and learn how to secure up to $1.85/sq ft in funding for your Tier 2
                  building.
                </p>
                <Button onClick={handleDownload} className="w-full bg-amber-600 hover:bg-amber-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Incentives Guide
                </Button>
              </Card>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Ready to Apply for Incentives?</h2>
            <p className="text-slate-600 mb-6">
              Don't miss out on these limited incentives. Our team can help you navigate the application process and
              maximize your funding.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-slate-800 hover:bg-slate-900">
                <Link href="/pricing">View Incentive Application Services</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={getBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule Incentive Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
