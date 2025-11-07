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
  const [mixedUseDetails, setMixedUseDetails] = useState("")
  const [result, setResult] = useState<{
    status: "covered" | "not-covered" | "exempt" | "complex"
    tier?: "tier1" | "tier2"
    details?: string
    nextSteps?: string[]
    forms?: string[]
  } | null>(null)

  const checkCoverage = () => {
    const sqft = Number.parseInt(squareFootage)

    if (hasLongVacancy) {
      setResult({
        status: "exempt",
        details:
          "Buildings with extended vacancy (&gt;50% vacant for 12+ months) may qualify for exemptions. Consult with Commerce for specific determination.",
        nextSteps: [
          "Contact WA Department of Commerce for vacancy exemption determination",
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
          "Consider voluntary compliance for incentives",
        ],
      })
      return
    }

    if (sqft < 20000) {
      setResult({
        status: "not-covered",
        details: "Buildings under 20,000 sq ft are not covered by Colorado BPS.",
      })
      return
    }

    if (isMixedUse) {
      setResult({
        status: "complex",
        details:
          "Mixed-use buildings require individual assessment based on predominant use and square footage allocation. Coverage depends on the primary building function.",
        nextSteps: [
          "Determine predominant use (&gt;50% of floor area)",
          "Calculate square footage by use type",
          "Consult with qualified professional for classification",
          "Consider each use type's compliance requirements",
        ],
      })
      return
    }

    // Tier 1: Commercial buildings 35k+ sq ft (performance-based)
    if (buildingType === "commercial" && sqft >= 35000) {
      const deadline =
        sqft >= 100000 ? "June 2028" : sqft >= 50000 ? "June 2029" : "June 2030"
      setResult({
        status: "covered",
        tier: "tier1",
        details:
          `Your commercial building is Tier 1 - must meet EUI performance targets by ${deadline}. Penalties apply for non-compliance.`,
        nextSteps: [
          "Complete energy benchmarking in ENERGY STAR Portfolio Manager",
          "Determine your building's EUI (Energy Use Intensity)",
          "Compare EUI to your building-type EUIt (target)",
          "Complete ASHRAE Level 2 energy audit if EUI exceeds EUIt",
          "Implement energy efficiency improvements to achieve EUIt",
          "Apply for ECAPP/BERI incentives for early compliance",
        ],
        forms: [],
      })
      return
    }

    if (buildingType === "hotel" && sqft >= 35000) {
      const deadline =
        sqft >= 100000 ? "June 2028" : sqft >= 50000 ? "June 2029" : "June 2030"
      setResult({
        status: "covered",
        tier: "tier1",
        details:
          `Your hotel is Tier 1 - must meet EUI performance targets by ${deadline}. Penalties apply for non-compliance.`,
        nextSteps: [
          "Complete energy benchmarking using hotel-specific metrics",
          "Determine your building's EUI",
          "Compare EUI to hotel building-type EUIt target",
          "Complete energy audit if needed",
          "Implement improvements to achieve compliance",
        ],
        forms: [],
      })
      return
    }

    // Tier 2: Commercial 20k-35k sq ft OR ALL institutional 35k+ sq ft (reporting only)
    if (
      (buildingType === "commercial" && sqft >= 20000 && sqft < 35000) ||
      (buildingType === "hotel" && sqft >= 20000 && sqft < 35000)
    ) {
      setResult({
        status: "covered",
        tier: "tier2",
        details:
          "Your building is Tier 2 - reporting-only requirements (NO performance targets, NO penalties). Just benchmark and report energy data.",
        nextSteps: [
          "Complete energy benchmarking in ENERGY STAR Portfolio Manager",
          "Submit annual energy data to Colorado Energy Office by July 2028",
          "Continue annual reporting - no performance targets required",
        ],
        forms: [],
      })
      return
    }

    // Institutional buildings (schools, hospitals, government) - ALL 35k+ go to Tier 2
    if (buildingType === "public" && sqft >= 35000) {
      setResult({
        status: "covered",
        tier: "tier2",
        details:
          "Your institutional building is Tier 2 - reporting-only (NO performance targets, NO penalties). Colorado BPS treats all institutional buildings 35k+ sqft as Tier 2.",
        nextSteps: [
          "Complete energy benchmarking in ENERGY STAR Portfolio Manager",
          "Submit annual energy data to Colorado Energy Office by July 2028",
          "Continue annual reporting - no performance targets or penalties",
        ],
        forms: [],
      })
      return
    }

    if (buildingType === "public" && sqft >= 20000 && sqft < 35000) {
      setResult({
        status: "covered",
        tier: "tier2",
        details:
          "Your institutional building is Tier 2 - reporting-only requirements (NO penalties).",
        nextSteps: [
          "Complete energy benchmarking in ENERGY STAR Portfolio Manager",
          "Submit annual energy data to Colorado Energy Office by July 2028",
        ],
        forms: [],
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
                placeholder="e.g., 25000"
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
                  <SelectItem value="public">Public Building</SelectItem>
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
                      Your building is covered by Colorado BPS - {result.tier === "tier1" ? "Tier 1" : "Tier 2"}
                    </p>
                    <p className="text-sm mt-1">{result.details}</p>

                    {result.tier === "tier1" && (
                      <div className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded">
                        <strong>Penalty if non-compliant:</strong> $5,000 + $1.00/sq ft annually until compliant.
                        For {squareFootage} sq ft: ${(5000 + Number.parseInt(squareFootage)).toLocaleString()}/year.
                      </div>
                    )}
                    {result.tier === "tier2" && (
                      <div className="mt-2 text-xs bg-colorado-blue-50 text-colorado-blue-700 p-2 rounded">
                        <strong>Good News:</strong> Tier 2 has NO PENALTIES in Colorado BPS. Reporting-only requirement.
                      </div>
                    )}

                    {result.forms && (
                      <div className="mt-3">
                        <p className="text-sm font-medium">Required Forms:</p>
                        <ul className="text-xs mt-1 space-y-1">
                          {result.forms.map((form, index) => (
                            <li key={index} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-colorado-blue-600 rounded-full"></div>
                              {form}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.nextSteps && (
                      <div className="mt-3">
                        <p className="text-sm font-medium">Next Steps:</p>
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
                        "Northwest Commercial Properties secured ECAPP grant funding for their 85,000 sq ft office building's
                        ASHRAE Level 2 audit and BERI implementation grants for HVAC modernization. Achieving compliance 18
                        months early avoided $105,000/year in penalties and reduced operating costs by 23%."
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-100 border border-yellow-300 p-3 rounded text-sm">
                    <p className="font-semibold text-yellow-800 mb-1">⚠️ Limited Time: ECAPP/BERI Funding</p>
                    <p className="text-yellow-700">
                      ECAPP ($2M state) and BERI ($12M federal) funds are competitive and limited. Early applicants have
                      the best chance of securing grants. ECAPP available through 2027 - apply early to maximize your
                      chances.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-3">
                    Get a personalized compliance assessment and action plan for your building
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
                    Get Your Free Assessment & Action Plan
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
              <h4 className="font-semibold text-colorado-blue-700 mb-2">Tier 1 Buildings</h4>
              <ul className="text-colorado-blue-600 space-y-1 text-left">
                <li>• Commercial buildings ≥35,000 sq ft</li>
                <li>• Must meet EUI performance targets (EUIt)</li>
                <li>• Compliance deadlines: June 2028-2030 (by size)</li>
                <li>• Penalties: $5,000 + $1/sq ft annually if non-compliant</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Tier 2 Buildings</h4>
              <ul className="text-blue-700 space-y-1 text-left">
                <li>• Commercial buildings 20,000-34,999 sq ft</li>
                <li>• ALL institutional buildings ≥35,000 sq ft</li>
                <li>• Reporting deadline: July 2028</li>
                <li>• Reporting-only (NO performance targets, NO penalties)</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Exemptions may apply for certain building types (check OAR 330-140 for complete exemption list).
            Portland buildings may have additional local benchmarking requirements.
          </p>
        </div>
      </div>
    </section>
  )
}
