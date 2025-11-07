"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "newsletter_signup", {
        event_category: "engagement",
        event_label: "footer_newsletter",
      })
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("email", email)
      formDataToSend.append("form_type", "newsletter_signup")
      formDataToSend.append("timestamp", new Date().toISOString())
      formDataToSend.append("page_url", window.location.href)

      const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uswl7yn/", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setIsLoading(false)
        toast({
          title: "Successfully subscribed!",
          description: "You'll receive CBPS updates and compliance tips.",
        })
        setEmail("")
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting newsletter signup:", error)
      setIsLoading(false)
      toast({
        title: "Subscription failed",
        description: "Please try again or call (206) 593-4243.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="p-6 bg-slate-50 border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Mail className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Stay Updated</h3>
          <p className="text-sm text-slate-600">Get CBPS compliance tips & deadline reminders</p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="flex items-center gap-2 text-colorado-gold-600">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Thanks for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? "..." : "Subscribe"}
          </Button>
        </form>
      )}
    </Card>
  )
}
