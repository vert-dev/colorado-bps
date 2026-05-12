"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Shield, ArrowRight } from "lucide-react"
import ContactFormModal from "./contact-form-modal"
import SchedulingModal from "./scheduling-modal"
import EmailCaptureModal from "./email-capture-modal"
import { trackButtonClick } from "./analytics-tracker"

export default function ComplianceHelp() {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [schedulingModalOpen, setSchedulingModalOpen] = useState(false)
  const [emailCaptureModalOpen, setEmailCaptureModalOpen] = useState(false)

  const handleCustomAssessment = () => {
    trackButtonClick("custom_assessment", "compliance_help")
    setContactModalOpen(true)
  }

  const handleScheduleAssessment = () => {
    trackButtonClick("schedule_assessment", "compliance_help")
    setSchedulingModalOpen(true)
  }

  const handleDownloadRoadmap = () => {
    trackButtonClick("download_roadmap", "compliance_help")
    setEmailCaptureModalOpen(true)
  }

  return (
    <section id="compliance-help" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Need Help Getting Compliant?</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Vert Energy Group supports <strong>10,000+ properties nationwide</strong> with compliance reporting and
            energy management. We provide fixed-price, guaranteed compliance packages so you can meet Colorado BPS
            requirements without stress.
          </p>
          <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-800 font-semibold text-sm">
              ⏰ Time-Sensitive: Energy audits, compliance plans, and pathway selection are due December 31, 2025
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Recent Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-colorado-blue-50 border border-colorado-gold-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-colorado-blue-500 rounded-full"></div>
                <span className="font-semibold text-colorado-blue-700">Multifamily Portfolio — Denver</span>
              </div>
              <p className="text-sm text-colorado-blue-600 mb-2">
                "We selected the GHG Reduction pathway, stacked Xcel rebates with the federal 45L credit, and filed our
                compliance plan well ahead of the December 2025 deadline."
              </p>
              <p className="text-xs text-colorado-blue-500">— Property Manager, 90,000 total sq ft</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-semibold text-blue-800">Commercial Office — Boulder</span>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                "Avoided benchmarking penalties and achieved 18% energy savings on track for the 2026 interim target.
                The ROI was clear from day one."
              </p>
              <p className="text-xs text-blue-600">— Building Owner, 100,000 sq ft</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Trust indicators */}
          <Card className="p-6 text-center border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">10,000+</div>
            <div className="text-slate-600">Properties Supported</div>
          </Card>

          <Card className="p-6 text-center border-slate-200">
            <div className="w-12 h-12 bg-colorado-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-colorado-gold-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">100%</div>
            <div className="text-slate-600">Compliance Guarantee</div>
          </Card>

          <Card className="p-6 text-center border-slate-200">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">Fixed</div>
            <div className="text-slate-600">Price Packages</div>
          </Card>
        </div>

        {/* Service highlight */}
        <Card className="p-8 border-colorado-blue-200 bg-colorado-blue-50 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <Badge className="bg-colorado-blue-100 text-colorado-blue-800 mb-4">Colorado BPS Specialist</Badge>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Colorado BPS Compliance Package for Buildings ≥50,000 sq ft
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-600" />
                  <span>ASHRAE Level 2 energy audit and compliance plan</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-600" />
                  <span>Pathway selection (Targeted EUI, GHG, or Standard % Reduction)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-600" />
                  <span>ENERGY STAR Portfolio Manager + BEAM Portal benchmarking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-colorado-gold-600" />
                  <span>IRA 179D / 45L and utility incentive application support</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                <strong>Deadline:</strong> Energy audit, compliance plan, and pathway selection due December 31, 2025.
                Interim target due December 31, 2026; final target December 31, 2030.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <Button
                size="lg"
                className="bg-colorado-blue-600 hover:bg-colorado-blue-700 text-white px-8"
                onClick={handleCustomAssessment}
              >
                Get Your Custom Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-sm text-slate-600 mt-2">Free consultation • Immediate next steps</p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-slate-600 mb-4">Ready to secure your incentives and avoid penalties?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-slate-700 hover:bg-slate-800 text-white" onClick={handleScheduleAssessment}>
              Schedule Free Building Assessment
            </Button>
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700 bg-transparent"
              onClick={handleDownloadRoadmap}
            >
              Download Compliance Roadmap
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Assessment includes: Coverage determination • Penalty calculation • Incentive eligibility • Custom action
            plan
          </p>
        </div>
      </div>

      <ContactFormModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Get Your Custom Colorado BPS Assessment"
        description="Tell us about your building and we'll provide a detailed compliance analysis within 24 hours."
      />

      <SchedulingModal isOpen={schedulingModalOpen} onClose={() => setSchedulingModalOpen(false)} />

      <EmailCaptureModal
        isOpen={emailCaptureModalOpen}
        onClose={() => setEmailCaptureModalOpen(false)}
        resourceTitle="Colorado BPS Compliance Roadmap"
        resourceDescription="Step-by-step guide to Colorado BPS compliance with timelines and checklists"
        downloadUrl="/resources/colorado-bps-compliance-roadmap.pdf"
      />
    </section>
  )
}
