import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Colorado BPS",
  description:
    "Privacy Policy for Colorado Building Performance Standard resource website operated by Vert Energy Group.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              <strong>Effective Date:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h2>
              <p className="text-slate-700 mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4">
                <li>Fill out contact forms or request assessments</li>
                <li>Download resources or guides</li>
                <li>Sign up for webinars or consultations</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="text-slate-700">
                This may include your name, email address, phone number, company name, building information, and other
                details you choose to provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Provide CBPS compliance guidance and resources</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you relevant updates about CBPS requirements</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Information Sharing</h2>
              <p className="text-slate-700">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Data Security</h2>
              <p className="text-slate-700">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Your Rights</h2>
              <p className="text-slate-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about how we use your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Contact Us</h2>
              <p className="text-slate-700">If you have questions about this Privacy Policy, please contact us at:</p>
              <div className="bg-slate-100 p-4 rounded-lg mt-4">
                <p className="text-slate-700">
                  <strong>Vert Energy Group</strong>
                  <br />
                  123 Energy Way
                  <br />
                  Seattle, WA 98101
                  <br />
                  Email: privacy@vertenergy.com
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
