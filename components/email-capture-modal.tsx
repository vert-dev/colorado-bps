"use client"
import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, CheckCircle } from "lucide-react"

interface EmailCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  resourceTitle: string
  resourceDescription: string
  downloadUrl: string
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  resourceTitle,
  resourceDescription,
  downloadUrl,
}: EmailCaptureModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        form_name: "email_capture",
        form_location: "modal",
        resource_title: resourceTitle,
      })
    }

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append("form_type", "email_capture")
      formDataToSend.append("resource_title", resourceTitle)
      formDataToSend.append("resource_url", downloadUrl)
      formDataToSend.append("timestamp", new Date().toISOString())

      const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uswjibw/", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission_success",
            form_name: "email_capture",
            resource_title: resourceTitle,
          })
        }

        sessionStorage.setItem("cbps-email-captured", "true")
        sessionStorage.setItem("cbps-user-email", formData.email)
        sessionStorage.setItem("cbps-user-name", formData.name)

        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: "", email: "", company: "" })
          onClose()

          if (downloadUrl.includes("cbps-summary-guide")) {
            router.push("/resources/cbps-summary-guide")
          } else if (downloadUrl.includes("emp-om-checklist")) {
            router.push("/resources/emp-om-checklist")
          } else if (downloadUrl.includes("tier2-incentives-guide")) {
            router.push("/resources/tier2-incentives-guide")
          }
        }, 2000)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting email capture:", error)
      alert("There was an error accessing the resource. Please try again or call (206) 593-4243.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-colorado-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Access Granted!</h3>
            <p className="text-slate-600 mb-4">
              Redirecting you to your exclusive resource page with download access and additional tools.
            </p>
            <p className="text-sm text-slate-500">You'll receive updates on CBPS changes and compliance tips.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold text-slate-800">Download Resource</DialogTitle>
          </div>
        </DialogHeader>

        <div className="mb-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Download className="w-8 h-8 text-slate-600" />
            <div>
              <h4 className="font-semibold text-slate-800">{resourceTitle}</h4>
              <p className="text-sm text-slate-600">{resourceDescription}</p>
            </div>
          </div>
        </div>

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

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              By downloading, you'll receive occasional updates on CBPS compliance changes and energy efficiency tips.
              Unsubscribe anytime.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 bg-colorado-blue-600 hover:bg-colorado-blue-700">
              Download Now
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
