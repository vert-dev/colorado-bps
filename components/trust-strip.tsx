import { Button } from "@/components/ui/button"
import { Shield, Phone, MessageCircle } from "lucide-react"

export default function TrustStrip() {
  return (
    <section className="py-12 bg-slate-100 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left: Company info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-900">Operated by Vert Energy Group</span>
              </div>
              <p className="text-sm text-slate-600">Independent resource</p>
            </div>

            {/* Center: Verified sources */}
            <div className="text-center">
              <h3 className="font-medium text-slate-900 mb-3">Verified sources</h3>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="bg-white px-2 py-1 rounded border text-slate-600">WA Dept. Commerce</span>
                <span className="bg-white px-2 py-1 rounded border text-slate-600">Official FAQs</span>
                <span className="bg-white px-2 py-1 rounded border text-slate-600">EUIt Tables</span>
                <span className="bg-white px-2 py-1 rounded border text-slate-600">Office Hours</span>
              </div>
            </div>

            {/* Right: Contact */}
            <div className="text-center md:text-right">
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Hotline
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask a question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
