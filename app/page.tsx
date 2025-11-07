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
  title: "Colorado BPS Help Desk | Building Performance Standard Compliance 2028-2030",
  description:
    "Expert Colorado Building Performance Standard (BPS) compliance services. Tier 1 commercial ≥35k sqft (June 2028-2030), Tier 2 institutional reporting (July 2028). EUI/EUIt audits, ECAPP/BERI grants, compliance packages.",
  keywords: [
    "Colorado BPS",
    "Building Performance Standard Oregon",
    "HB 21-1286",
    "Energy Use Intensity",
    "EUI compliance",
    "EUIt targets",
    "Colorado Energy Office compliance",
    "June 2028 deadline",
    "ASHRAE Level 2 audit",
    "ECAPP grants",
    "BERI funding",
    "Oregon building compliance",
    "commercial building energy",
    "institutional building reporting",
    "Colorado Energy Office",
    "building energy benchmarking Oregon",
  ],
  openGraph: {
    title: "Colorado BPS Help Desk | Building Performance Standard Compliance",
    description:
      "Expert Colorado BPS compliance help. Tier 1 deadlines June 2028-2030. EUI/EUIt performance targets, ECAPP/BERI incentives, ASHRAE audits for commercial buildings ≥35k sqft.",
    url: "https://co-bps.com",
    images: [
      {
        url: "/images/oregon-bps-og.png",
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
              "Resources and guidance for building owners to comply with Oregon's Building Performance Standard law.",
            serviceType: "Building Compliance Information",
            areaServed: {
              "@type": "State",
              name: "Oregon",
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
                  text: "The Colorado Energy Office (CEO) and Oregon Department of Environmental Quality (DEQ) enforce the Building Performance Standard.",
                },
              },
              {
                "@type": "Question",
                name: "What are the penalties for non-compliance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tier 1 buildings face $5,000 base fine plus $1.00 per sq ft annually until compliant. Tier 2 buildings have NO penalties - reporting only.",
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
