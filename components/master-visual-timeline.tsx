"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

interface TimelineEvent {
  date: string
  dateObj: Date
  title: string
  description: string
  type: "benchmarking" | "planning" | "target" | "penalty"
  status: "completed" | "upcoming" | "future"
  urgent?: boolean
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "June 1, 2024",
    dateObj: new Date("2024-06-01"),
    title: "Annual Benchmarking Due (2023 data)",
    description: "First enforced benchmarking deadline. Penalties: $500 first miss, $2,000 subsequent.",
    type: "benchmarking",
    status: "completed",
  },
  {
    date: "June 1, 2025",
    dateObj: new Date("2025-06-01"),
    title: "Annual Benchmarking Due (2024 data)",
    description: "Submit prior-year energy data via ENERGY STAR Portfolio Manager → BEAM Portal. $100/building fee.",
    type: "benchmarking",
    status: "completed",
  },
  {
    date: "December 31, 2025",
    dateObj: new Date("2025-12-31"),
    title: "Energy Audit + Compliance Plan + Pathway Selection Due",
    description:
      "Submit ASHRAE Level 2 audit, compliance plan, and choose one of three pathways: Targeted EUI, GHG Reduction, or Standard % Reduction.",
    type: "planning",
    status: "upcoming",
    urgent: true,
  },
  {
    date: "June 1, 2026",
    dateObj: new Date("2026-06-01"),
    title: "Annual Benchmarking Due (2025 data)",
    description: "Continued annual benchmarking obligation via BEAM Portal.",
    type: "benchmarking",
    status: "upcoming",
  },
  {
    date: "December 31, 2026",
    dateObj: new Date("2026-12-31"),
    title: "Interim Performance Target Due",
    description:
      "Statewide goal: 7% GHG reduction vs 2021 baseline. Standard % pathway: 13% site EUI reduction.",
    type: "target",
    status: "upcoming",
  },
  {
    date: "June 1, 2027",
    dateObj: new Date("2027-06-01"),
    title: "Interim-Target Performance Penalties Begin",
    description:
      "Monthly penalties begin for buildings that miss the 2026 interim target. Amount set by CDPHE based on degree of non-compliance.",
    type: "penalty",
    status: "future",
  },
  {
    date: "December 31, 2030",
    dateObj: new Date("2030-12-31"),
    title: "Final Performance Target Due",
    description:
      "Statewide goal: 20% GHG reduction vs 2021 baseline. Standard % pathway: 29% site EUI reduction.",
    type: "target",
    status: "future",
  },
  {
    date: "June 1, 2031",
    dateObj: new Date("2031-06-01"),
    title: "Final-Target Performance Penalties Begin",
    description: "Monthly penalties begin for buildings that miss the 2030 final target.",
    type: "penalty",
    status: "future",
  },
]

export default function MasterVisualTimeline() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000 * 60)
    return () => clearInterval(timer)
  }, [])

  const getNextCriticalDeadline = () => {
    const upcomingEvents = timelineEvents
      .filter((event) => event.dateObj > currentDate)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

    if (upcomingEvents.length === 0) return null

    const nextEvent = upcomingEvents[0]
    const daysUntil = Math.ceil((nextEvent.dateObj.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

    return { event: nextEvent, daysUntil }
  }

  const nextDeadline = getNextCriticalDeadline()

  const trackBadge = (type: TimelineEvent["type"]) => {
    if (type === "planning") return "Audit + Plan"
    if (type === "target") return "Performance Target"
    if (type === "penalty") return "Penalty Start"
    return "Benchmarking"
  }

  const trackStyle = (type: TimelineEvent["type"]) => {
    if (type === "planning") return "border-l-amber-500 bg-amber-50"
    if (type === "target") return "border-l-blue-500 bg-blue-50"
    if (type === "penalty") return "border-l-red-500 bg-red-50"
    return "border-l-colorado-blue-500 bg-colorado-blue-50"
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Colorado BPS Compliance Timeline</h2>
          <p className="text-lg text-slate-700 mb-6">
            Key dates for buildings ≥50,000 sq ft under HB 21-1286 and CDPHE Regulation 28
          </p>

          {nextDeadline && (
            <Alert
              className="max-w-2xl mx-auto mb-6"
              variant={nextDeadline.daysUntil <= 90 ? "destructive" : "default"}
            >
              <Clock className="h-4 w-4" />
              <AlertTitle>Next Critical Deadline</AlertTitle>
              <AlertDescription>
                <strong>{nextDeadline.event.title}</strong> in {nextDeadline.daysUntil} days ({nextDeadline.event.date})
                {nextDeadline.daysUntil <= 90 && " — URGENT ACTION REQUIRED"}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Single Statewide Track — No Tier Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${trackStyle(event.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{event.title}</h4>
                    <div className="text-right">
                      <div className="text-sm font-medium">{event.date}</div>
                      <Badge
                        variant={
                          event.status === "completed" ? "default" : event.urgent ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {trackBadge(event.type)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{event.description}</p>
                  {event.urgent && <p className="text-xs text-red-600 font-semibold mt-1">URGENT</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Penalty Structure</AlertTitle>
          <AlertDescription>
            Benchmarking misses are $500 on first occurrence and $2,000 each subsequent occurrence. Performance-target
            penalties begin June 1, 2027 (interim) and June 1, 2031 (final) and are assessed monthly until compliant.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
