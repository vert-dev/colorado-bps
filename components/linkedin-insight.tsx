"use client"

import { useEffect } from "react"
import { installLinkedInInsight } from "@/lib/ad-account-tags"

export default function LinkedInInsight() {
  useEffect(() => {
    try { installLinkedInInsight() } catch { /* Optional measurement must not block the page. */ }
  }, [])
  return null
}
