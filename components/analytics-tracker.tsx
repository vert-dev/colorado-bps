"use client"
import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "user_interaction",
      ...parameters,
    })
  }
}

export function trackDownload(resourceName: string) {
  trackEvent("file_download", {
    event_category: "resource_download",
    event_label: resourceName,
  })
}

export function trackFormSubmission(formType: string) {
  trackEvent("form_submit", {
    event_category: "lead_generation",
    event_label: formType,
  })
}

export function trackButtonClick(buttonName: string, location: string) {
  trackEvent("button_click", {
    event_category: "engagement",
    event_label: `${location}_${buttonName}`,
  })
}

export default function AnalyticsTracker() {
  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag("js", new Date())
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_title: "Colorado BPS Help Desk",
        page_location: window.location.href,
      })
    }
  }, [])

  return null
}
