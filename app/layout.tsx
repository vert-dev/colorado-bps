import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import AnalyticsTracker from "@/components/analytics-tracker";
import CBPSChatbot from "@/components/cbps-chatbot"; // Added import for CBPSChatbot
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Colorado BPS Compliance Help | Building Performance Standard Expert Services",
  description:
    "Expert Colorado Building Performance Standard (HB 21-1286) compliance services for buildings ≥50,000 sq ft. 3 compliance pathways, energy audits, December 2025 deadline. Serving Colorado statewide.",
  keywords: [
    "Colorado BPS",
    "Building Performance Standard Colorado",
    "Colorado compliance",
    "HB 21-1286",
    "HB21-1286",
    "Colorado Energy Office",
    "BEAM Portal",
    "December 2025 deadline",
    "building compliance Colorado",
    "BPS requirements",
    "energy benchmarking Colorado",
    "commercial building compliance",
    "50000 sq ft compliance",
    "Colorado energy law",
    "compliance pathway",
    "energy audit Colorado",
  ],
  authors: [{ name: "Vert Energy Group" }],
  creator: "Vert Energy Group",
  publisher: "Vert Energy Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://co-bps.com",
    siteName: "Colorado BPS Help Desk",
    title:
      "Colorado BPS Compliance Help | Building Performance Standard",
    description:
      "Expert Colorado Building Performance Standard (HB 21-1286) compliance services. December 2025 audit/pathway deadline. 3 compliance pathways for buildings ≥50k sq ft.",
    images: [
      {
        url: "/images/colorado-bps-og.png",
        width: 1200,
        height: 630,
        alt: "Colorado BPS Compliance Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Colorado BPS Compliance Help | Building Performance Standard",
    description:
      "Expert Colorado Building Performance Standard (HB 21-1286) compliance services. December 2025 audit/pathway deadline. Buildings ≥50k sq ft.",
    images: ["/images/colorado-bps-og.png"],
  },
  alternates: {
    canonical: "https://co-bps.com",
  },
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/colorado-bps-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/colorado-bps-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/colorado-bps-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Colorado BPS Help Desk",
              description:
                "Expert Colorado Building Performance Standard (HB 21-1286) compliance services",
              url: "https://co-bps.com",
              telephone: "(206) 309-3936",
              areaServed: {
                "@type": "State",
                name: "Colorado",
              },
              serviceType: [
                "Building Performance Standard Compliance",
                "Energy Audits",
                "Compliance Pathway Selection",
                "Building Energy Compliance",
                "HB 21-1286 Compliance",
                "BEAM Portal Assistance",
              ],
              provider: {
                "@type": "Organization",
                name: "Vert Energy Group",
                url: "https://vertenergy.com",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MH3X9NDQ');`,
          }}
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          async
          defer
          src="https://tools.luckyorange.com/core/lo.js?site-id=2f09066c"
        ></script>
        <script
          src="https://cdn.lgrckt-in.com/LogRocket.min.js"
          crossOrigin="anonymous"
        ></script>
        <script>
          window.LogRocket && window.LogRocket.init('abou83/wa-microsite');
        </script>
        <script src="//s.ksrndkehqnwntyxlhgto.com/107092.js"></script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MH3X9NDQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Suspense fallback={<div>Loading...</div>}>
          <AnalyticsTracker />
          {children}
          <CBPSChatbot /> {/* Added CBPS chatbot widget to all pages */}
        </Suspense>
      </body>
    </html>
  );
}
