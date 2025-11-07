import type { Metadata } from "next"
import PricingPageClient from "./PricingPageClient"

export const metadata: Metadata = {
  title: "Colorado BPS Compliance Packages | Energy Audits & Pathway Selection",
  description:
    "Colorado BPS (HB 21-1286) compliance packages for buildings ≥50,000 sq ft. Energy audits, pathway selection, compliance planning. December 31, 2025 critical deadline. Expert guidance for 3 compliance pathways.",
  keywords: [
    "Colorado BPS pricing",
    "Colorado BPS compliance packages",
    "HB 21-1286 compliance cost",
    "Colorado building compliance",
    "energy audit cost Colorado",
    "pathway selection",
    "Colorado BPS flat fee pricing",
    "December 2025 deadline",
    "commercial building compliance cost",
    "December 2026 interim target",
    "Colorado Energy Office compliance",
    "BEAM Portal assistance",
  ],
  openGraph: {
    title: "Colorado BPS Compliance Packages | Energy Audits & Pathway Selection",
    description:
      "Colorado BPS (HB 21-1286) compliance packages for buildings ≥50k sq ft. Energy audits, 3 pathway options. December 31, 2025 critical deadline.",
    url: "https://co-bps.com/pricing",
    images: [
      {
        url: "/images/colorado-bps-og.png",
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
