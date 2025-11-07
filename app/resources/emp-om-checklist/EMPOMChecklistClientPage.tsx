"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, CheckSquare, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EMPOMChecklistClientPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)

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
    link.href = "/resources/emp-om-checklist.pdf"
    link.download = "EMP-OM-Checklist.pdf"
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
              <CheckSquare className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">EMP + O&M Checklist</h1>
              <p className="text-slate-600">Step-by-step checklist for compliant Energy Management and O&M plans</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Checklist Includes:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Energy Management Plan requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Operations & Maintenance protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Documentation requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Implementation timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Compliance verification steps</span>
                </li>
              </ul>
            </div>
            <div>
              <Card className="p-6 bg-emerald-50 border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-3">Download Your Checklist</h3>
                <p className="text-emerald-700 text-sm mb-4">
                  This comprehensive checklist ensures you don't miss any critical requirements for your EMP and O&M
                  programs.
                </p>
                <Button onClick={handleDownload} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Checklist
                </Button>
              </Card>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Need Professional EMP + O&M Development?</h2>
            <p className="text-slate-600 mb-6">
              Creating compliant EMP and O&M programs requires expertise. Our team can develop these programs for you,
              ensuring full compliance and optimal building performance.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-slate-800 hover:bg-slate-900">
                <Link href="/pricing">View EMP + O&M Packages</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/#masterclass">Get Expert Help</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
