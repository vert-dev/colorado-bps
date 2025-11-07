import type { Metadata } from "next"
import Header from "@/components/header"
import HelpDeskHero from "@/components/help-desk-hero"
import TabbedContent from "@/components/tabbed-content"
import WhatIsOregonBPS from "@/components/what-is-oregon-bps"
import KeyDeadlines from "@/components/key-deadlines"
import CoverageChecker from "@/components/coverage-checker"
import HowToComply from "@/components/how-to-comply"
import ResourcesHub from "@/components/resources-hub"
import FAQ from "@/components/faq"
import PenaltiesContent from "@/components/penalties-content"
import EarlyAdopterIncentives from "@/components/early-adopter-incentives"

export const metadata: Metadata = {
  title: "Colorado BPS Help Desk | Building Performance Standard Compliance December 2025",
  description:
    "Expert Colorado Building Performance Standard (HB 21-1286) compliance services for buildings ≥50,000 sq ft. Critical December 31, 2025 deadline for energy audit + pathway selection. 3 compliance pathways.",
  keywords: [
    "Colorado BPS",
    "Building Performance Standard Colorado",
    "HB 21-1286",
    "HB21-1286",
    "December 2025 deadline",
    "compliance pathway",
    "energy audit Colorado",
    "Colorado Energy Office",
    "December 2026 interim target",
    "December 2030 final target",
    "BEAM Portal",
    "Colorado building compliance",
    "50000 sq ft threshold",
    "energy benchmarking Colorado",
    "monthly penalties",
  ],
  openGraph: {
    title: "Colorado BPS Help Desk | Building Performance Standard Compliance",
    description:
      "Expert Colorado BPS (HB 21-1286) compliance help. December 31, 2025 critical deadline for energy audit + pathway selection. Buildings ≥50k sqft. 3 compliance pathways available.",
    url: "https://co-bps.com",
    images: [
      {
        url: "/images/colorado-bps-og.png",
        width: 1200,
        height: 630,
        alt: "Colorado BPS Help Desk - Building Performance Standard Compliance",
      },
    ],
  },
  alternates: {
    canonical: "https://co-bps.com",
  },
}

export default function HomePage() {
  const tabs = [
    {
      id: "what-is-oregon-bps",
      label: "What is Colorado BPS?",
      content: <WhatIsOregonBPS />,
    },
    {
      id: "coverage",
      label: "Am I Covered?",
      content: <CoverageChecker />,
    },
    {
      id: "deadlines",
      label: "Key Deadlines",
      content: <KeyDeadlines />,
    },
    {
      id: "penalties",
      label: "Penalties",
      content: <PenaltiesContent />,
    },
    {
      id: "incentives",
      label: "Early Adopter Incentives",
      content: <EarlyAdopterIncentives />,
    },
    {
      id: "how-to-comply",
      label: "How to Comply",
      content: <HowToComply />,
    },
    {
      id: "resources",
      label: "Resources",
      content: <ResourcesHub />,
    },
    {
      id: "faq",
      label: "FAQ",
      content: <FAQ />,
    },
  ]

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <HelpDeskHero />

        <TabbedContent tabs={tabs} />
      </main>

      {/* JSON-LD Schema for Government Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentService",
            name: "Colorado Building Performance Standard Help Desk",
            description:
              "Resources and guidance for building owners to comply with Colorado's Building Performance Standard law (HB 21-1286).",
            serviceType: "Building Compliance Information",
            areaServed: {
              "@type": "State",
              name: "Colorado",
            },
            provider: {
              "@type": "Organization",
              name: "co-bps.com",
            },
          }),
        }}
      />

      {/* JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who enforces the Colorado BPS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Colorado Energy Office (CEO) enforces the Building Performance Standard (HB 21-1286) for all buildings ≥50,000 sq ft.",
                },
              },
              {
                "@type": "Question",
                name: "What are the penalties for non-compliance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Colorado BPS has two penalty tracks: benchmarking penalties ($500 first offense, $2,000 subsequent) and monthly performance penalties starting June 2027 (interim target) and June 2031 (final target). Penalty amounts are based on degree of non-compliance.",
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
