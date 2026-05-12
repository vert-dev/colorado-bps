"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, CheckSquare, DollarSign, Download, ExternalLink } from "lucide-react"
import WebinarSignupModal from "./webinar-signup-modal"
import EmailCaptureModal from "./email-capture-modal"
import { trackButtonClick, trackDownload } from "./analytics-tracker"

export default function ResourcesHub() {
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false)
  const [emailCaptureModalOpen, setEmailCaptureModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState({
    title: "",
    description: "",
    downloadUrl: "",
  })

  const handleDownload = (title: string, description: string, filename: string) => {
    trackDownload(title)
    trackButtonClick("download_resource", "resources_hub")

    setSelectedResource({
      title,
      description,
      downloadUrl: `/resources/${filename}`,
    })
    setEmailCaptureModalOpen(true)
  }

  const handleWebinarSignup = () => {
    trackButtonClick("webinar_signup", "resources_hub")
    setIsWebinarModalOpen(true)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Resources & Tools</h2>
          <p className="text-lg text-slate-700">
            Essential documents, guides, and tools to help you understand and comply with Colorado BPS requirements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* PDF Guide */}
          <Card className="p-6 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Colorado BPS Summary Guide</h3>
            <p className="text-sm text-slate-600 mb-4">
              Complete overview of HB 21-1286 requirements, the three compliance pathways, deadlines, and 2021
              baseline rules for buildings ≥50,000 sq ft.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() =>
                handleDownload(
                  "Colorado BPS Summary Guide",
                  "Complete overview of HB 21-1286 requirements, the three compliance pathways, deadlines, and 2021 baseline rules for buildings ≥50,000 sq ft",
                  "colorado-bps-summary-guide.pdf",
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </Card>

          {/* Webinar */}
          <Card className="p-6 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Colorado BPS Requirements Webinar</h3>
            <p className="text-sm text-slate-600 mb-4">
              Live webinar explaining Colorado BPS compliance requirements, the three pathways, and federal IRA + utility
              incentive stacking.
            </p>
            <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleWebinarSignup}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </Card>

          {/* Checklist */}
          <Card className="p-6 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 bg-colorado-blue-100 rounded-lg flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6 text-colorado-gold-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Audit + Pathway Selection Checklist</h3>
            <p className="text-sm text-slate-600 mb-4">
              Step-by-step checklist for benchmarking, ASHRAE Level 2 audits, choosing the right pathway, and filing
              your compliance plan by December 31, 2025.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() =>
                handleDownload(
                  "Audit + Pathway Selection Checklist",
                  "Step-by-step checklist for benchmarking, ASHRAE Level 2 audits, choosing the right pathway, and filing your compliance plan by December 31, 2025",
                  "audit-pathway-checklist.pdf",
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </Card>

          {/* Funding Guide */}
          <Card className="p-6 border-slate-200 hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-3">Colorado Incentives & Tax Credits Guide</h3>
            <p className="text-sm text-slate-600 mb-4">
              Federal IRA 179D (up to $5/sqft) and 45L credits, plus utility rebates from Xcel Energy, Black Hills,
              and municipal providers.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() =>
                handleDownload(
                  "Colorado Incentives & Tax Credits Guide",
                  "Federal IRA 179D and 45L credits plus utility rebates from Xcel Energy, Black Hills, and municipal providers",
                  "colorado-incentives-guide.pdf",
                )
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-4">Additional Resources</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://energyoffice.colorado.gov/building-performance-standards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    Colorado Energy Office — BPS Program
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://www.energystar.gov/buildings/benchmark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    ENERGY STAR Portfolio Manager
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://leg.colorado.gov/bills/hb21-1286"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    HB 21-1286 (2021) — Energy Performance for Buildings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://cdphe.colorado.gov/air-pollution/building-performance-standard-rule"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    CDPHE Regulation 28 (5 CCR 1001-32)
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://co.beam-portal.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    BEAM Portal — Building Owner Reporting
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://energyoffice.colorado.gov/bpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    Building Performance Colorado
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <WebinarSignupModal isOpen={isWebinarModalOpen} onClose={() => setIsWebinarModalOpen(false)} />
      <EmailCaptureModal
        isOpen={emailCaptureModalOpen}
        onClose={() => setEmailCaptureModalOpen(false)}
        resourceTitle={selectedResource.title}
        resourceDescription={selectedResource.description}
        downloadUrl={selectedResource.downloadUrl}
      />
    </section>
  )
}
