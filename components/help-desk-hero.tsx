"use client"

import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { ContactFormModal } from "./contact-form-modal"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

export default function HelpDeskHero() {
  const [showContactModal, setShowContactModal] = useState(false)
  const { getBookingUrl } = useHubSpotBooking()

  return (
    <>
      <section className="relative bg-gradient-to-b from-colorado-blue-800 to-colorado-blue-700 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/seattle-skyline.png"
            alt="Seattle Skyline"
            fill
            className="object-cover object-bottom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-colorado-blue-800/70 via-colorado-blue-700/60 to-colorado-blue-800/80" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-8 flex justify-start">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
              Early Adopter Incentives Open July 1st, 2025
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side content */}
            <div className="font-medium">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                  Colorado BPS Compliance — Fast, Simple, Guaranteed
                </h1>
                <p className="text-lg text-yellow-200 font-medium">(CBPS) Help Desk</p>
              </div>

              <p className="text-xl text-colorado-blue-50 leading-relaxed mb-8">
                Resources and guidance for building owners to comply with{" "}
                <strong className="text-yellow-300">Colorado Building Performance Standard (HB 21-1286)</strong>.
                Critical deadline: <strong className="text-yellow-300">December 31, 2025</strong> to complete your
                energy audit and select your compliance pathway. Choose from 3 pathways to meet your 2026 interim
                (7% reduction) and 2030 final (20% reduction) targets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-colorado-blue-800 px-8 py-4 text-lg font-bold shadow-lg border-2 border-yellow-300"
                  onClick={() => setShowContactModal(true)}
                >
                  Secure Incentives Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-colorado-gold-200 text-white hover:bg-white hover:text-colorado-blue-800 px-8 py-4 text-lg bg-colorado-blue-600/50 backdrop-blur-sm transition-all"
                  asChild
                >
                  <a
                    href={getBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Call
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/inc5000-medallion.png"
                    alt="Inc 5000"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className="text-sm text-colorado-blue-100 font-medium">Inc 5000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/energy-star-partner.png"
                    alt="Energy Star Partner"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className="text-sm text-colorado-blue-100 font-medium">Energy Star Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/platform-award-trophy.png"
                    alt="Platform Award 2024"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className="text-sm text-colorado-blue-100 font-medium">Platform of the Year 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-yellow-300" />
                  <span className="text-sm text-colorado-blue-100 font-medium">10,000+ properties supported</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/colorado-bps-logo.png"
                alt="Colorado BPS Official Emblem"
                width={300}
                height={300}
                className="w-72 h-72 lg:w-80 lg:h-80 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        packageName="CBPS Compliance Package"
      />
    </>
  )
}
