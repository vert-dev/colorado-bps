import type { Metadata } from "next"
import PricingPageClient from "./PricingPageClient"

export const metadata: Metadata = {
  title: "Colorado BPS Compliance Packages | Energy Audits & Pathway Selection",
  description:
    "Colorado BPS (HB 21-1286) compliance packages for buildings ≥50,000 sq ft. Energy audits, pathway selection, compliance planning. Annual benchmarking due November 1. Expert guidance for 3 compliance pathways.",
  keywords: [
    "Colorado BPS pricing",
    "Colorado BPS compliance packages",
    "HB 21-1286 compliance cost",
    "Colorado building compliance",
    "energy audit cost Colorado",
    "pathway selection",
    "Colorado BPS flat fee pricing",
    "November 1 benchmarking deadline",
    "commercial building compliance cost",
    "December 2026 interim target",
    "Colorado Energy Office compliance",
    "BEAM Portal assistance",
  ],
  openGraph: {
    title: "Colorado BPS Compliance Packages | Energy Audits & Pathway Selection",
    description:
      "Colorado BPS (HB 21-1286) compliance packages for buildings ≥50k sq ft. Energy audits, 3 pathway options. Annual benchmarking due November 1.",
    url: "https://co-bps.com/pricing",
    images: [
      {
        url: "/images/colorado-bps-logo.png",
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
