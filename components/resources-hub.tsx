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
              Complete overview of Tier 1 & Tier 2 requirements, EUI/EUIt targets, deadlines, and compliance pathways.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() =>
                handleDownload(
                  "Colorado BPS Summary Guide",
                  "Complete overview of Tier 1 & Tier 2 requirements, EUI/EUIt targets, deadlines, and compliance pathways",
                  "oregon-bps-summary-guide.pdf",
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
              Live webinar explaining Colorado BPS compliance requirements, EUI/EUIt targets, and ECAPP/BERI incentives.
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
            <h3 className="font-semibold text-slate-800 mb-3">EUI Compliance Checklist</h3>
            <p className="text-sm text-slate-600 mb-4">
              Step-by-step checklist for benchmarking, audits, and implementing energy improvements to meet EUIt targets.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() =>
                handleDownload(
                  "EUI Compliance Checklist",
                  "Step-by-step checklist for benchmarking, audits, and implementing energy improvements to meet EUIt targets",
                  "eui-compliance-checklist.pdf",
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
            <h3 className="font-semibold text-slate-800 mb-3">ECAPP & BERI Incentives Guide</h3>
            <p className="text-sm text-slate-600 mb-4">
              Complete guide to Oregon ECAPP ($2M) and BERI ($12M) incentives including eligibility and application process.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() =>
                handleDownload(
                  "ECAPP & BERI Incentives Guide",
                  "Complete guide to Oregon ECAPP ($2M) and BERI ($12M) incentives including eligibility and application process",
                  "ecapp-beri-incentives-guide.pdf",
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
                    href="https://www.oregon.gov/energy/energy-oregon/Pages/Building-Performance-Standards.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    Colorado Energy Office BPS Program Page
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
                    href="https://olis.oregonlegislature.gov/liz/2021R1/Measures/Overview/HB3409"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    HB 21-1286 (2021) - Colorado BPS Law
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://secure.sos.state.or.us/oard/displayDivisionRules.action?selectedDivision=6874"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    OAR 330-140 - BPS Administrative Rules
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://www.oregon.gov/deq/Pages/index.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    Oregon Department of Environmental Quality
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <a
                    href="https://www.oregon.gov/energy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 underline"
                  >
                    Colorado Energy Office
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
