import NewsletterSignup from "./newsletter-signup"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <NewsletterSignup />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-white mb-4">Vert Energy Group</h3>
              <address className="text-sm not-italic">
                123 Energy Way
                <br />
                Seattle, WA 98101
                <br />
                (555) 123-4567
              </address>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-service" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/accessibility" className="hover:text-white transition-colors">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div>
              <h3 className="font-semibold text-white mb-4">Independence Disclosure</h3>
              <p className="text-sm">
                This website is operated independently by Vert Energy Group and is not affiliated with or endorsed by
                the Oregon Department of Commerce or any government agency.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-sm">
              © 2024 Vert Energy Group. All rights reserved. Independent resource — not a government website.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
