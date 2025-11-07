import type { Metadata } from "next"
import Tier2IncentivesGuideClientPage from "./Tier2IncentivesGuideClientPage"

export const metadata: Metadata = {
  title: "Tier 2 Incentives Guide - Access Required",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Tier2IncentivesGuidePage() {
  return <Tier2IncentivesGuideClientPage />
}
