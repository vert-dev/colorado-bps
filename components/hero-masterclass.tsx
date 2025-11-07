"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Scale, Clock, DollarSign, Calendar, Users } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Script from "next/script"

export default function HeroMasterclass() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2027-07-01T00:00:00-07:00").getTime() // Pacific Time

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer() // Initial call
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="masterclass" className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="bg-red-600 text-white p-4 rounded-lg mb-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-lg">URGENT: Tier 2 Multifamily Buildings</h3>
                <p className="text-sm">
                  EMP & O&M must be complete and implemented by July 1, 2027 (compliance deadline)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs">MINS</div>
              </div>
              <div className="bg-white text-red-600 px-3 py-2 rounded font-bold text-sm">
                $150M Limited Funding Available
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="w-8 h-8 text-slate-700" />
              <span className="text-sm font-medium text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                RCW 19.27A.210 - Building Performance Standard
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Colorado Building Performance Standard (CBPS)
              <span className="block text-2xl lg:text-3xl text-slate-700 mt-2">
                Compliance Requirements & Deadlines
              </span>
            </h1>

            <div className="flex items-center space-x-4">
              <Image
                src="/images/oregon-bps-logo.png"
                alt="CBPS Washington - Building Performance Standard"
                width={120}
                height={72}
                className="h-16 w-auto"
                priority
                style={{ background: "transparent" }}
              />
              <div className="bg-slate-100 border-l-4 border-slate-600 p-4 rounded-r flex-1">
                <p className="text-sm font-medium text-slate-800 mb-2">Official Law Text (RCW 19.27A.210):</p>
                <p className="text-sm text-slate-700 italic">
                  "The owner of a covered commercial building shall meet energy performance standards... and complete
                  benchmarking and energy management planning requirements..."
                </p>
              </div>
            </div>

            <div className="bg-colorado-blue-50 border-2 border-colorado-gold-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <DollarSign className="w-6 h-6 text-colorado-blue-500 mt-1" />
                <div>
                  <h3 className="font-bold text-colorado-blue-800 mb-2">Early Adopter Incentives Available</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-colorado-blue-700">Tier 2 Base: $0.30 per sq ft</p>
                    </div>
                    <div>
                      <p className="font-semibold text-colorado-blue-700">Multifamily Enhanced: $0.75 per sq ft</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-lg border-2 border-red-200">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-8 h-8 text-red-600" />
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-red-900">Free CBPS Masterclass</h2>
                <p className="text-sm text-slate-700">
                  Join our compliance workshop to avoid penalties and maximize incentives
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 text-lg flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Reserve Your Seat NOW</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>CBPS Compliance Masterclass - Reserve Your Seat</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <div
                        className="meetings-iframe-container min-h-[500px]"
                        data-src="https://meetings.hubspot.com/aolivas?embed=true"
                      ></div>
                      <Script
                        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
                        strategy="afterInteractive"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="text-xs text-slate-600 space-y-1">
                  <p>✓ Learn compliance requirements</p>
                  <p>✓ Avoid costly penalties</p>
                  <p>✓ Maximize available incentives</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
