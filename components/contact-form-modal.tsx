"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getStoredUTMParams } from "@/lib/utm-utils"

declare global {
  interface Window {
    dataLayer: any[]
  }
}

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage?: string
}

interface ZapierPayload {
  // Form Data
  name: string
  email: string
  phone: string
  company: string
  buildingType: string
  squareFootage: string
  numberOfBuildings: string
  message: string
  selectedPackage?: string

  // UTM Parameters
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string

  // Metadata
  timestamp: string
  page_url: string
  referrer: string
  user_agent: string
  ip_address?: string
  location?: {
    city?: string
    region?: string
    country?: string
    timezone?: string
  }

  // Session Data
  session_id: string
  page_views: number
  time_on_site: number

  // Device Info
  device_type: string
  browser: string
  os: string
  screen_resolution: string

  // Additional Fields
  is_repeat_submission: boolean
  form_source: string
  submission_count: string
}

function ContactFormModal({ isOpen, onClose, selectedPackage }: ContactFormModalProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    buildingType: "",
    squareFootage: "",
    numberOfBuildings: "",
    message: "",
  })

  const [metadata, setMetadata] = useState<Partial<ZapierPayload>>({})
  const [isRepeatSubmission, setIsRepeatSubmission] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUserData = localStorage.getItem("cbps_user_data")
      if (savedUserData) {
        try {
          const userData = JSON.parse(savedUserData)
          setFormData((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            company: userData.company || "",
            buildingType: userData.buildingType || "",
            squareFootage: userData.squareFootage || "",
          }))
          setIsRepeatSubmission(true)
        } catch (error) {
          console.log("[v0] Error parsing saved user data:", error)
        }
      }

      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
      }

      let sessionId = sessionStorage.getItem("cbps_session_id")
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem("cbps_session_id", sessionId)
        sessionStorage.setItem("cbps_session_start", Date.now().toString())
        sessionStorage.setItem("cbps_page_views", "1")
      } else {
        const currentViews = Number.parseInt(sessionStorage.getItem("cbps_page_views") || "1")
        sessionStorage.setItem("cbps_page_views", (currentViews + 1).toString())
      }

      const sessionStart = Number.parseInt(sessionStorage.getItem("cbps_session_start") || Date.now().toString())
      const timeOnSite = Math.floor((Date.now() - sessionStart) / 1000)

      const userAgent = navigator.userAgent
      const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent)
        ? "mobile"
        : /Tablet|iPad/.test(userAgent)
          ? "tablet"
          : "desktop"

      const browser = userAgent.includes("Chrome")
        ? "Chrome"
        : userAgent.includes("Firefox")
          ? "Firefox"
          : userAgent.includes("Safari")
            ? "Safari"
            : userAgent.includes("Edge")
              ? "Edge"
              : "Other"

      const os = userAgent.includes("Windows")
        ? "Windows"
        : userAgent.includes("Mac")
          ? "macOS"
          : userAgent.includes("Linux")
            ? "Linux"
            : userAgent.includes("Android")
              ? "Android"
              : userAgent.includes("iOS")
                ? "iOS"
                : "Other"

      setMetadata({
        ...utmData,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        referrer: document.referrer || "direct",
        user_agent: userAgent,
        session_id: sessionId,
        page_views: Number.parseInt(sessionStorage.getItem("cbps_page_views") || "1"),
        time_on_site: timeOnSite,
        device_type: deviceType,
        browser: browser,
        os: os,
        screen_resolution: `${screen.width}x${screen.height}`,
      })
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== "undefined") {
      const userDataToSave = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        buildingType: formData.buildingType,
        squareFootage: formData.squareFootage,
        lastSubmission: new Date().toISOString(),
      }
      localStorage.setItem("cbps_user_data", JSON.stringify(userDataToSave))
    }

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        form_name: "contact_form",
        form_id: "cbps_contact_form",
        selected_package: selectedPackage || "general_inquiry",
        building_type: formData.buildingType,
        square_footage: formData.squareFootage,
        form_location: "modal",
        is_repeat_submission: isRepeatSubmission,
      })
      console.log("[v0] GTM form_submit event fired")
    }

    const zapierPayload: ZapierPayload = {
      ...formData,
      selectedPackage,
      ...metadata,
      timestamp: new Date().toISOString(),
      is_repeat_submission: isRepeatSubmission,
      form_source: window.location.pathname,
      submission_count: isRepeatSubmission ? "repeat" : "first_time",
    } as ZapierPayload

    console.log("[v0] Zapier Payload:", JSON.stringify(zapierPayload, null, 2))

    try {
      const formDataToSend = new FormData()

      Object.entries(zapierPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "object") {
            formDataToSend.append(key, JSON.stringify(value))
          } else {
            formDataToSend.append(key, String(value))
          }
        }
      })

      const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uswjibw/", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        console.log("[v0] Successfully sent to Zapier")

        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission_success",
            form_name: "contact_form",
            conversion_type: "lead_generation",
            selected_package: selectedPackage || "general_inquiry",
            value: selectedPackage ? 1 : 0.5,
            is_repeat_submission: isRepeatSubmission,
            number_of_buildings: formData.numberOfBuildings,
          })
          console.log("[v0] GTM conversion event fired")
        }

        // Build calendar URL with routing based on numberOfBuildings
        const buildingCount = parseInt(formData.numberOfBuildings, 10);
        const CALENDAR_URLS = {
          dylan: 'https://meetings.hubspot.com/dheppner/co-state-compliance-review',
          kevin: 'https://meetings.hubspot.com/kevin-sullivan2/colorado-bps-compliance-review',
        };
        const baseUrl = buildingCount >= 3 ? CALENDAR_URLS.kevin : CALENDAR_URLS.dylan;
        const calendarUrl = new URL(baseUrl);

        // Add contact info
        const [firstName, ...lastNameParts] = formData.name.split(" ");
        calendarUrl.searchParams.append("firstName", firstName || "");
        calendarUrl.searchParams.append("lastName", lastNameParts.join(" ") || "");
        calendarUrl.searchParams.append("email", formData.email);
        calendarUrl.searchParams.append("phone", formData.phone);

        // Add building context
        if (formData.numberOfBuildings) {
          calendarUrl.searchParams.append("portfolio_size", formData.numberOfBuildings);
        }
        if (formData.buildingType) {
          calendarUrl.searchParams.append("building_type", formData.buildingType);
        }
        if (formData.squareFootage) {
          calendarUrl.searchParams.append("building_sqft_range", formData.squareFootage);
        }
        if (formData.company) {
          calendarUrl.searchParams.append("company", formData.company);
        }

        // Add source tracking
        calendarUrl.searchParams.append("qualification_source", "contact_form");
        calendarUrl.searchParams.append("submission_timestamp", new Date().toISOString());

        // Add UTM params
        const utmParams = getStoredUTMParams();
        Object.entries(utmParams).forEach(([key, value]) => {
          if (value) calendarUrl.searchParams.append(key, value);
        });

        // Track calendar redirect
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "calendar_redirect_shown",
            form_name: "contact_form",
            number_of_buildings: formData.numberOfBuildings,
            routed_to: buildingCount >= 3 ? "kevin" : "dylan",
          })
        }

        onClose()

        // Redirect to calendar
        window.location.href = calendarUrl.toString();
      } else {
        console.error("[v0] Failed to send to Zapier:", response.status, await response.text())

        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission_error",
            form_name: "contact_form",
            error_type: "zapier_error",
            error_code: response.status,
          })
        }

        alert("There was an error submitting your request. Please try again or call (206) 593-4243.")
      }
    } catch (error) {
      console.error("[v0] Error sending to Zapier:", error)

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submission_error",
          form_name: "contact_form",
          error_type: "network_error",
          error_message: error instanceof Error ? error.message : "Unknown error",
        })
      }

      alert("There was an error submitting your request. Please try again or call (206) 593-4243.")
    }

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">Get Your CBPS Compliance Package</DialogTitle>
          <p className="text-slate-600">
            {selectedPackage
              ? `Interest in: ${selectedPackage}`
              : "Get a custom assessment for your building's CBPS compliance needs."}
          </p>
        </DialogHeader>

        <form id="wc_form_tracking" onSubmit={handleSubmit} className="space-y-4">
          {isRepeatSubmission && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                ✓ We've prefilled your information from your previous inquiry. Update as needed.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="John Smith"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="john@company.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="ABC Property Management"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buildingType">Primary Building Type</Label>
              <Select
                value={formData.buildingType}
                onValueChange={(value) => handleInputChange("buildingType", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Commercial Office</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="multifamily">Multifamily Residential</SelectItem>
                  <SelectItem value="hotel">Hotel/Lodging</SelectItem>
                  <SelectItem value="warehouse">Warehouse/Distribution</SelectItem>
                  <SelectItem value="mixed">Mixed-Use</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="squareFootage">Building Square Footage</Label>
              <Select
                value={formData.squareFootage}
                onValueChange={(value) => handleInputChange("squareFootage", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20k-50k">20,000 - 50,000 sq ft (Tier 2)</SelectItem>
                  <SelectItem value="50k-90k">50,000 - 90,000 sq ft (Tier 1)</SelectItem>
                  <SelectItem value="90k-220k">90,000 - 220,000 sq ft (Tier 1)</SelectItem>
                  <SelectItem value="220k+">220,000+ sq ft (Tier 1)</SelectItem>
                  <SelectItem value="multiple">Multiple Buildings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="numberOfBuildings">Number of Buildings *</Label>
            <Input
              id="numberOfBuildings"
              type="number"
              min="1"
              step="1"
              placeholder="e.g., 3"
              value={formData.numberOfBuildings}
              onChange={(e) => handleInputChange("numberOfBuildings", e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Hidden inputs for building type and square footage values */}
          <input type="hidden" name="selectedBuildingType" value={formData.buildingType} />
          <input type="hidden" name="selectedSquareFootage" value={formData.squareFootage} />

          <div>
            <Label htmlFor="message">List Your Properties (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Please list your properties with addresses, square footage, and building types. Example: 123 Main St, Seattle - 45,000 sq ft Office Building..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">What You'll Receive:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Custom CBPS compliance assessment within 24 hours</li>
              <li>• Penalty risk calculation for your specific building</li>
              <li>• Early adopter incentive eligibility review</li>
              <li>• Step-by-step compliance roadmap</li>
              <li>• Fixed-price service options (no obligation)</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-colorado-blue-600 hover:bg-colorado-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get Help Now"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { ContactFormModal }
export default ContactFormModal
