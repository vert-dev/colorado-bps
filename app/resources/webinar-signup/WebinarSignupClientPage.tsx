"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video, CheckCircle, ArrowLeft, Calendar, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function WebinarSignupClientPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    buildingType: "",
  })

  useEffect(() => {
    const hasEmailCapture = sessionStorage.getItem("cbps-email-captured")
    if (!hasEmailCapture) {
      router.push("/")
      return
    }
    setHasAccess(true)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        form_name: "webinar_registration",
        form_location: "resource_page",
      })
    }

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append("form_type", "webinar_registration")
      formDataToSend.append("timestamp", new Date().toISOString())

      const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uhzbn5c/", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission_success",
            form_name: "webinar_registration",
          })
        }
        setIsRegistered(true)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting webinar registration:", error)
      alert("There was an error with your registration. Please try again or call (206) 593-4243.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">You're Registered!</h1>
            <p className="text-slate-600 mb-6">
              We've sent you a calendar invite and webinar link. The session will cover everything you need to know
              about Tier 2 compliance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-slate-800 hover:bg-slate-900">
                <Link href="/pricing">View Compliance Packages</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Homepage</Link>
              </Button>
            </div>
          </div>
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
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Tier 2 Requirements Webinar</h1>
              <p className="text-slate-600">Live expert session on Tier 2 compliance and early adopter incentives</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Webinar Details:</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Next Session: January 15, 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Duration: 45 minutes + Q&A</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">Limited to 50 participants</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">What You'll Learn:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Tier 2 compliance requirements breakdown</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Early adopter incentive application process</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Timeline and critical deadlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">Common pitfalls and how to avoid them</span>
                </li>
              </ul>
            </div>

            <div>
              <Card className="p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Register for Webinar</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      placeholder="John Smith"
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
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="ABC Property Management"
                    />
                  </div>

                  <div>
                    <Label htmlFor="buildingType">Building Type</Label>
                    <select
                      id="buildingType"
                      value={formData.buildingType}
                      onChange={(e) => handleInputChange("buildingType", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select building type</option>
                      <option value="commercial">Commercial</option>
                      <option value="multifamily">Multifamily</option>
                      <option value="mixed-use">Mixed Use</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Register for Webinar
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
