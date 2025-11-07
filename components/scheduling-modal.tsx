"use client"
import { useState } from "react"
import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, CheckCircle } from "lucide-react"

interface SchedulingModalProps {
  isOpen: boolean
  onClose: () => void
}

const SchedulingModal = ({ isOpen, onClose }: SchedulingModalProps) => {
  const [isScheduled, setIsScheduled] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    buildingAddress: "",
    urgency: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        form_name: "scheduling_assessment",
        form_location: "modal",
      })
    }

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append("form_type", "scheduling_assessment")
      formDataToSend.append("timestamp", new Date().toISOString())

      const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uswl7yn/", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission_success",
            form_name: "scheduling_assessment",
          })
        }
        setIsScheduled(true)
        setTimeout(() => {
          setIsScheduled(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            preferredDate: "",
            preferredTime: "",
            buildingAddress: "",
            urgency: "",
          })
          onClose()
        }, 3000)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting scheduling form:", error)
      alert("There was an error scheduling your assessment. Please try again or call (206) 593-4243.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isScheduled) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-colorado-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Assessment Scheduled!</h3>
            <p className="text-slate-600 mb-4">
              We'll contact you within 2 hours to confirm your building assessment appointment.
            </p>
            <p className="text-sm text-slate-500">
              You'll receive a calendar invite and preparation checklist via email.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-800">Schedule Free Building Assessment</DialogTitle>
          </div>
          <p className="text-slate-600">
            Get an on-site or virtual assessment to determine your exact CBPS requirements and compliance strategy.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="buildingAddress">Building Address *</Label>
            <Input
              id="buildingAddress"
              value={formData.buildingAddress}
              onChange={(e) => handleInputChange("buildingAddress", e.target.value)}
              required
              placeholder="123 Main St, Seattle, WA 98101"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="preferredTime">Preferred Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) => handleInputChange("preferredTime", value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="urgency">Timeline Urgency</Label>
            <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="How urgent is your compliance need?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                <SelectItem value="soon">Soon (within 1 month)</SelectItem>
                <SelectItem value="planning">Planning ahead (2+ months)</SelectItem>
                <SelectItem value="exploring">Just exploring options</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-colorado-blue-50 border border-colorado-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-colorado-blue-800 mb-2">Assessment Includes:</h4>
            <ul className="text-sm text-colorado-blue-700 space-y-1">
              <li>• Building coverage determination and tier classification</li>
              <li>• Current energy performance evaluation</li>
              <li>• Compliance gap analysis and penalty risk assessment</li>
              <li>• Early adopter incentive eligibility review</li>
              <li>• Custom compliance roadmap with timeline</li>
              <li>• Fixed-price service proposal (no obligation)</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-slate-700 hover:bg-slate-800">
              Schedule My Assessment
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

export { SchedulingModal }
export default SchedulingModal
