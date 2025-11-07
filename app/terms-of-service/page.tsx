import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Colorado BPS",
  description:
    "Terms of Service for Colorado Building Performance Standard resource website operated by Vert Energy Group.",
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              <strong>Effective Date:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-700">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Website Purpose</h2>
              <p className="text-slate-700 mb-4">
                This website provides educational information about Oregon's Clean Buildings Performance
                Standard (CBPS). The information is provided for general guidance only and should not be considered as:
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Legal advice or official government guidance</li>
                <li>Professional engineering or architectural advice</li>
                <li>A substitute for consulting with qualified professionals</li>
                <li>Official interpretation of CBPS regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Independence Disclosure</h2>
              <p className="text-slate-700">
                This website is operated independently by Vert Energy Group and is not affiliated with, endorsed by, or
                connected to the Oregon Department of Commerce or any government agency. All official CBPS
                information should be verified through official government sources.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Accuracy of Information</h2>
              <p className="text-slate-700">
                While we strive to provide accurate and up-to-date information, CBPS regulations may change. Users are
                responsible for verifying all information with official sources before making compliance decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-slate-700">
                Vert Energy Group shall not be liable for any damages arising from the use of this website or reliance
                on the information provided. Users assume full responsibility for compliance with CBPS requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Intellectual Property</h2>
              <p className="text-slate-700">
                The content on this website is owned by Vert Energy Group and is protected by copyright laws. You may
                not reproduce, distribute, or create derivative works without written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Contact Information</h2>
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-slate-700">
                  <strong>Vert Energy Group</strong>
                  <br />
                  123 Energy Way
                  <br />
                  Seattle, WA 98101
                  <br />
                  Email: legal@vertenergy.com
                  <br />
                  Phone: (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
