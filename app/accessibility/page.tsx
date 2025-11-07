import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Statement | Colorado BPS",
  description: "Accessibility statement for Colorado Building Performance Standard resource website.",
}

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Accessibility Statement</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our Commitment</h2>
              <p className="text-slate-700">
                Vert Energy Group is committed to ensuring digital accessibility for people with disabilities. We are
                continually improving the user experience for everyone and applying the relevant accessibility
                standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Conformance Status</h2>
              <p className="text-slate-700 mb-4">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Our
                website includes the following accessibility features:
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Semantic HTML structure for screen readers</li>
                <li>Keyboard navigation support</li>
                <li>Alt text for images</li>
                <li>Sufficient color contrast ratios</li>
                <li>Responsive design for various devices</li>
                <li>Clear heading hierarchy</li>
                <li>Focus indicators for interactive elements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Known Issues</h2>
              <p className="text-slate-700">
                We are aware of some accessibility limitations and are working to address them:
              </p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Some PDF documents may not be fully accessible</li>
                <li>Third-party embedded content may have accessibility limitations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Feedback and Contact</h2>
              <p className="text-slate-700 mb-4">
                We welcome your feedback on the accessibility of this website. If you encounter any accessibility
                barriers, please contact us:
              </p>
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-slate-700">
                  <strong>Accessibility Coordinator</strong>
                  <br />
                  Vert Energy Group
                  <br />
                  123 Energy Way
                  <br />
                  Seattle, WA 98101
                  <br />
                  Email: accessibility@vertenergy.com
                  <br />
                  Phone: (555) 123-4567
                </p>
              </div>
              <p className="text-slate-700 mt-4">We aim to respond to accessibility feedback within 5 business days.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Technical Specifications</h2>
              <p className="text-slate-700 mb-4">This website relies on the following technologies:</p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                <li>React/Next.js framework</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Assessment Methods</h2>
              <p className="text-slate-700">We assess the accessibility of this website through:</p>
              <ul className="list-disc pl-6 text-slate-700">
                <li>Automated accessibility testing tools</li>
                <li>Manual testing with keyboard navigation</li>
                <li>Screen reader testing</li>
                <li>Color contrast analysis</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
