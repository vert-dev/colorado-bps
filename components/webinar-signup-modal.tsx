"use client"
import { useState } from "react"
import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users } from "lucide-react"

interface WebinarSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WebinarSignupModal({ isOpen, onClose }: WebinarSignupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    buildingSize: "",
    questions: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        form_name: "webinar_signup",
        form_location: "modal",
      })
    }

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append("form_type", "webinar_signup")
      formDataToSend.append("timestamp", new Date().toISOString())

      const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uswl7yn/", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "form_submission_success",
            form_name: "webinar_signup",
          })
        }
        onClose()
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting webinar signup:", error)
      alert("There was an error with your registration. Please try again or call (206) 593-4243.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Register for Tier 2 Requirements Webinar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>Next Session: January 15, 2025</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock className="w-4 h-4" />
            <span>Duration: 45 minutes + Q&A</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Users className="w-4 h-4" />
            <span>Limited to 100 participants</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="company">Company/Organization</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="buildingSize">Building Size (sq ft)</Label>
            <Input
              id="buildingSize"
              value={formData.buildingSize}
              onChange={(e) => setFormData({ ...formData, buildingSize: e.target.value })}
              placeholder="e.g., 25,000"
            />
          </div>

          <div>
            <Label htmlFor="questions">Questions for the webinar (optional)</Label>
            <Textarea
              id="questions"
              value={formData.questions}
              onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
              placeholder="Any specific questions about Tier 2 compliance?"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Register Now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
