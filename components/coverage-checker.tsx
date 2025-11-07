"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, XCircle, Building2, AlertTriangle, Info } from "lucide-react"

export default function CoverageChecker() {
  const [squareFootage, setSquareFootage] = useState("")
  const [buildingType, setBuildingType] = useState("")
  const [hasLongVacancy, setHasLongVacancy] = useState(false)
  const [isMixedUse, setIsMixedUse] = useState(false)
  const [result, setResult] = useState<{
    status: "covered" | "not-covered" | "exempt" | "complex"
    details?: string
    nextSteps?: string[]
  } | null>(null)

  const checkCoverage = () => {
    const sqft = Number.parseInt(squareFootage)

    if (hasLongVacancy) {
      setResult({
        status: "exempt",
        details:
          "Buildings with extended vacancy (>50% vacant for 12+ months) may qualify for exemptions. Consult with Colorado Energy Office for specific determination.",
        nextSteps: [
          "Contact Colorado Energy Office for vacancy exemption determination",
          "Document vacancy periods and occupancy rates",
        ],
      })
      return
    }

    if (
      buildingType === "industrial" ||
      buildingType === "manufacturing" ||
      buildingType === "agricultural" ||
      buildingType === "warehouse"
    ) {
      setResult({
        status: "exempt",
        details: `${buildingType.charAt(0).toUpperCase() + buildingType.slice(1)} buildings are generally exempt from Colorado BPS requirements, but some exceptions may apply.`,
        nextSteps: [
          "Verify exemption status with qualified professional",
          "Consider voluntary compliance for potential future requirements",
        ],
      })
      return
    }

    if (sqft < 50000) {
      setResult({
        status: "not-covered",
        details: "Buildings under 50,000 sq ft are not covered by Colorado BPS.",
      })
      return
    }

    if (isMixedUse) {
      setResult({
        status: "complex",
        details:
          "Mixed-use buildings require individual assessment based on predominant use and square footage allocation. Coverage depends on the primary building function.",
        nextSteps: [
          "Determine predominant use (>50% of floor area)",
          "Calculate square footage by use type",
          "Consult with qualified professional for classification",
          "Consider each use type's compliance requirements",
        ],
      })
      return
    }

    // All covered buildings ≥50,000 sq ft have same requirements
    if (sqft >= 50000) {
      setResult({
        status: "covered",
        details:
          `Your building is covered by Colorado BPS - all buildings ≥50,000 sq ft must comply with the same requirements.`,
        nextSteps: [
          "Set up Energy Star Portfolio Manager account (immediate)",
          "Register with Colorado BEAM Portal at https://co.beam-portal.org/ (immediate)",
          "Submit annual benchmarking report by August 1 each year (with $100 fee)",
          "Complete energy audit by December 31, 2025",
          "Select compliance pathway (Energy Efficiency, GHG Reduction, or Standard %) by December 31, 2025",
          "File compliance plan with Colorado Energy Office by December 31, 2025",
          "Meet interim target (7% reduction) by December 31, 2026",
          "Meet final target (20% reduction) by December 31, 2030",
        ],
      })
      return
    }

    setResult({
      status: "not-covered",
      details: "Your building does not appear to be covered based on the information provided.",
    })
  }

  return (
    <section id="coverage-checker" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Is Your Building Covered?</h2>
          <p className="text-lg text-slate-700">
            Use our comprehensive checker to determine if your building must comply with Colorado BPS requirements.
          </p>
        </div>

        <Card className="p-8 border-slate-200">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="square-footage" className="text-slate-700 font-medium">
                Building Square Footage
              </Label>
              <Input
                id="square-footage"
                type="number"
                placeholder="e.g., 75000"
                value={squareFootage}
                onChange={(e) => setSquareFootage(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="building-type" className="text-slate-700 font-medium">
                Primary Building Type
              </Label>
              <Select value={buildingType} onValueChange={setBuildingType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial Office</SelectItem>
                  <SelectItem value="multifamily">Multifamily Residential</SelectItem>
                  <SelectItem value="hotel">Hotel/Motel</SelectItem>
                  <SelectItem value="public">Public/Institutional Building</SelectItem>
                  <SelectItem value="warehouse">Warehouse/Distribution</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="mixed-use" checked={isMixedUse} onCheckedChange={setIsMixedUse} />
              <Label htmlFor="mixed-use" className="text-slate-700">
                This is a mixed-use building (multiple building types)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="long-vacancy" checked={hasLongVacancy} onCheckedChange={setHasLongVacancy} />
              <Label htmlFor="long-vacancy" className="text-slate-700">
                Building has extended vacancy (&gt;50% vacant for 12+ months)
              </Label>
            </div>
          </div>

          <Button
            onClick={checkCoverage}
            disabled={!squareFootage || !buildingType}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Check Coverage
          </Button>

          {result && (
            <div className="mt-6 p-4 rounded-lg border">
              {result.status === "covered" ? (
                <div className="flex items-start gap-3 text-colorado-blue-700">
                  <CheckCircle className="w-6 h-6 mt-1" />
                  <div className="w-full">
                    <p className="font-semibold">
                      Your building is covered by Colorado BPS
                    </p>
                    <p className="text-sm mt-1">{result.details}</p>

                    <div className="mt-3 space-y-2">
                      <div className="text-xs bg-red-50 text-red-700 p-3 rounded">
                        <strong>Critical First Deadline: December 31, 2025</strong>
                        <p className="mt-1">Complete energy audit, select compliance pathway (Energy Efficiency, GHG Reduction, or Standard % Reduction), and file compliance plan.</p>
                      </div>
                      <div className="text-xs bg-orange-50 text-orange-700 p-3 rounded">
                        <strong>Annual Benchmarking: August 1 each year</strong>
                        <p className="mt-1">Submit energy data via Portfolio Manager to BEAM Portal with $100 fee. Penalties: $500 (first failure), $2,000 (subsequent).</p>
                      </div>
                      <div className="text-xs bg-yellow-50 text-yellow-700 p-3 rounded">
                        <strong>Interim Target: December 31, 2026</strong>
                        <p className="mt-1">Achieve 7% reduction from 2021 baseline. Monthly penalties begin June 1, 2027 if non-compliant.</p>
                      </div>
                      <div className="text-xs bg-colorado-blue-50 text-colorado-blue-700 p-3 rounded">
                        <strong>Final Target: December 31, 2030</strong>
                        <p className="mt-1">Achieve 20% reduction from 2021 baseline. Monthly penalties begin June 1, 2031 if non-compliant.</p>
                      </div>
                    </div>

                    {result.nextSteps && (
                      <div className="mt-3">
                        <p className="text-sm font-medium">Complete Compliance Roadmap:</p>
                        <ul className="text-xs mt-1 space-y-1">
                          {result.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <div className="w-1 h-1 bg-colorado-blue-600 rounded-full mt-1.5"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : result.status === "complex" ? (
                <div className="flex items-start gap-3 text-amber-700">
                  <Info className="w-6 h-6 mt-1" />
                  <div className="w-full">
                    <p className="font-semibold">Complex Building - Professional Assessment Required</p>
                    <p className="text-sm mt-1">{result.details}</p>
                    {result.nextSteps && (
                      <div className="mt-3">
                        <p className="text-sm font-medium">Recommended Actions:</p>
                        <ul className="text-xs mt-1 space-y-1">
                          {result.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <div className="w-1 h-1 bg-amber-600 rounded-full mt-1.5"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : result.status === "exempt" ? (
                <div className="flex items-start gap-3 text-amber-700">
                  <AlertTriangle className="w-6 h-6 mt-1" />
                  <div className="w-full">
                    <p className="font-semibold">Your building may be exempt from Colorado BPS</p>
                    <p className="text-sm mt-1">{result.details}</p>
                    {result.nextSteps && (
                      <div className="mt-3">
                        <p className="text-sm font-medium">Recommended Actions:</p>
                        <ul className="text-xs mt-1 space-y-1">
                          {result.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <div className="w-1 h-1 bg-amber-600 rounded-full mt-1.5"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-slate-600">
                  <XCircle className="w-6 h-6 mt-1" />
                  <div>
                    <p className="font-semibold">Your building is not covered by Colorado BPS</p>
                    <p className="text-sm mt-1">{result.details}</p>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="bg-gradient-to-r from-colorado-gold-50 to-colorado-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 bg-colorado-blue-500 rounded-full mt-2"></div>
                    <div className="text-sm">
                      <p className="font-semibold text-slate-800 mb-1">Early Compliance Success:</p>
                      <p className="text-slate-700">
                        Building owners who start early have time to evaluate all three compliance pathways, secure the best energy auditors, and plan capital improvements strategically. Those who wait until late 2025 face rushed decisions, limited contractor availability, and higher costs.
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-100 border border-red-300 p-3 rounded text-sm">
                    <p className="font-semibold text-red-800 mb-1">⚠️ Critical: December 31, 2025 Deadline</p>
                    <p className="text-red-700">
                      Missing the December 31, 2025 audit and pathway selection deadline may result in penalties or forced pathway assignment. Start your energy audit in early 2025 to ensure timely completion.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-3">
                    Get a personalized compliance assessment and pathway recommendation for your building
                  </p>
                  <Button
                    className="bg-colorado-blue-600 hover:bg-colorado-blue-700 text-white px-6 py-2 mb-2"
                    onClick={() => {
                      const helpSection = document.getElementById("compliance-help")
                      if (helpSection) {
                        helpSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Get Your Free Assessment & Pathway Analysis
                  </Button>
                  <p className="text-xs text-slate-500">Free consultation • No obligation • Expert guidance</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Coverage info */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">Colorado BPS Coverage Summary:</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-colorado-blue-50 p-4 rounded-lg border border-colorado-gold-200">
              <h4 className="font-semibold text-colorado-blue-700 mb-2">Covered Buildings</h4>
              <ul className="text-colorado-blue-600 space-y-1 text-left">
                <li>• All buildings ≥50,000 sq ft</li>
                <li>• Commercial, residential, institutional</li>
                <li>• Single performance standard (no tiers)</li>
                <li>• Choose 1 of 3 compliance pathways</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Key Deadlines</h4>
              <ul className="text-red-700 space-y-1 text-left">
                <li>• Aug 1 annually: Benchmarking ($100 fee)</li>
                <li>• Dec 31, 2025: Audit + pathway selection</li>
                <li>• Dec 31, 2026: Interim target (7%)</li>
                <li>• Dec 31, 2030: Final target (20%)</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Exemptions may apply for certain building types (industrial, manufacturing, agricultural, warehouse). Consult Colorado Energy Office for specific exemption determination.
          </p>
        </div>
      </div>
    </section>
  )
}
