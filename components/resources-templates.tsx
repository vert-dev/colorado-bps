import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, FileText, Mail } from "lucide-react"

export default function ResourcesTemplates() {
  return (
    <section id="templates" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Templates & Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-6 h-6 text-blue-600" />
                  <span>Downloads</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  EMP Template (Doc)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  O&M Checklist (PDF)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Utility Data Request (Email text)
                </Button>
              </CardContent>
            </Card>

            <Card id="resources" className="bg-white border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="w-6 h-6 text-colorado-blue-500" />
                  <span>Official Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Washington Dept. of Commerce CBPS hub
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Official FAQs
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  EUIt tables
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Office hours schedule
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              We are not affiliated with the Oregon Dept. of Commerce; links are provided for convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
