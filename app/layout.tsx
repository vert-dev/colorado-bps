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
    "Expert Colorado Building Performance Standard (BPS) compliance services. Tier 1 commercial ≥35k sqft, Tier 2 institutional buildings. Energy Use Intensity (EUI) audits, ECAPP/BERI incentives, compliance packages. Serving Oregon statewide.",
  keywords: [
    "Colorado BPS",
    "Building Performance Standard Oregon",
    "Oregon compliance",
    "HB 21-1286",
    "Energy Use Intensity",
    "EUI compliance",
    "EUIt targets",
    "June 2028 deadline",
    "building compliance Oregon",
    "BPS requirements",
    "energy benchmarking Oregon",
    "commercial building compliance",
    "institutional building compliance",
    "Oregon energy law",
    "ECAPP incentives",
    "BERI grants",
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
      "Expert Colorado Building Performance Standard compliance services. June/July 2028 deadlines. Energy Use Intensity audits, ECAPP/BERI incentives. Tier 1 & 2 compliance packages.",
    images: [
      {
        url: "/images/oregon-bps-og.png",
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
      "Expert Colorado Building Performance Standard compliance services. June/July 2028 deadlines. EUI audits, ECAPP/BERI incentives.",
    images: ["/images/oregon-bps-og.png"],
  },
  alternates: {
    canonical: "https://co-bps.com",
  },
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/oregon-bps-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/oregon-bps-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/oregon-bps-logo.png",
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
                "Expert Colorado Building Performance Standard compliance services",
              url: "https://co-bps.com",
              telephone: "(206) 593-4243",
              areaServed: {
                "@type": "State",
                name: "Oregon",
              },
              serviceType: [
                "Building Performance Standard Compliance",
                "Energy Use Intensity Audits",
                "EUI/EUIt Compliance Analysis",
                "Building Energy Compliance",
                "ECAPP Incentive Applications",
                "BERI Grant Support",
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
