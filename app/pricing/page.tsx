import type { Metadata } from "next"
import PricingPageClient from "./PricingPageClient"

export const metadata: Metadata = {
  title: "Colorado BPS Compliance Packages | Flat-Fee Pricing Covered by Incentives",
  description:
    "Colorado BPS compliance packages from $15,000 for Tier 2 buildings. Often $0 net cost with state incentives. Commercial & multifamily packages. Energy Management Plans, O&M Programs. July 2026 deadline approaching.",
  keywords: [
    "Colorado BPS pricing",
    "CBPS compliance packages",
    "Tier 2 compliance cost",
    "Washington building incentives",
    "Energy Management Plan cost",
    "O&M Program pricing",
    "CBPS flat fee pricing",
    "Washington energy incentives",
    "commercial building compliance cost",
    "multifamily building compliance",
    "July 2026 deadline",
    "CBPS package pricing",
  ],
  openGraph: {
    title: "Colorado BPS Compliance Packages | Flat-Fee Pricing",
    description:
      "CBPS compliance packages from $15k for Tier 2 buildings. Often $0 net cost with state incentives. July 2026 deadline.",
    url: "https://co-bps.com/pricing",
    images: [
      {
        url: "/images/oregon-bps-emblem-hero.png",
        width: 1200,
        height: 630,
        alt: "Colorado BPS Compliance Packages",
      },
    ],
  },
  alternates: {
    canonical: "https://co-bps.com/pricing",
  },
}

export default function PricingPage() {
  return <PricingPageClient />
}
