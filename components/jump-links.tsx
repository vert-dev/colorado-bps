import { Button } from "@/components/ui/button"
import { Building, FileText, Calendar, AlertTriangle, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function JumpLinks() {
  const links = [
    { label: "Am I Covered?", href: "#coverage", icon: Building },
    { label: "What's Required", href: "#requirements", icon: FileText },
    { label: "Deadlines", href: "#deadlines", icon: Calendar },
    { label: "Penalties", href: "/penalties", icon: AlertTriangle }, // Updated to link to penalties page instead of broken anchor
    { label: "Templates", href: "#templates", icon: Download },
    { label: "Official Resources", href: "#resources", icon: ExternalLink },
  ]

  return (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Button
                key={link.href}
                variant="outline"
                size="sm"
                asChild
                className="flex items-center space-x-2 bg-transparent"
              >
                {link.href.startsWith("#") ? (
                  <a href={link.href}>
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </a>
                ) : (
                  <Link href={link.href}>
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
