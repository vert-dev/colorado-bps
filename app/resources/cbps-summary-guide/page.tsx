import type { Metadata } from "next"
import CBPSSummaryGuideClientPage from "./CBPSSummaryGuideClientPage"

export const metadata: Metadata = {
  title: "CBPS Summary Guide - Access Required",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CBPSSummaryGuidePage() {
  return <CBPSSummaryGuideClientPage />
}
