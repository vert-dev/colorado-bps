"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar, Clock, AlertTriangle, Building, Users, TrendingUp } from "lucide-react"

interface TimelineEvent {
  date: string
  dateObj: Date
  title: string
  description: string
  tier: "Tier 1" | "Tier 2"
  sizeCategory?: string
  type: "preparation" | "filing" | "incentive"
  status: "completed" | "upcoming" | "future"
  urgent?: boolean
  conditionalDeadline?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "July 1, 2025",
    dateObj: new Date("2025-07-01"),
    title: "Tier 2 Early Compliance Window Opens",
    description: "$150M incentive pool available (first-come, first-served)",
    tier: "Tier 2",
    type: "incentive",
    status: "completed",
  },
  {
    date: "June 1, 2025",
    dateObj: new Date("2025-06-01"),
    title: "Large Buildings O&M Implementation",
    description: "12-month O&M program must be active (preparation for 2026 deadline)",
    tier: "Tier 1",
    sizeCategory: ">220k sq ft",
    type: "preparation",
    status: "completed",
  },
  {
    date: "December 1, 2025",
    dateObj: new Date("2025-12-01"),
    title: "Conditional Compliance Applications Due",
    description: "≥180 days before June 1, 2026 deadline",
    tier: "Tier 1",
    sizeCategory: ">220k sq ft",
    type: "filing",
    status: "upcoming",
    urgent: true,
  },
  {
    date: "June 1, 2026",
    dateObj: new Date("2026-06-01"),
    title: "Large Buildings Compliance Due",
    description: "Forms A, B, C required. Performance targets must be met.",
    tier: "Tier 1",
    sizeCategory: ">220k sq ft",
    type: "filing",
    status: "upcoming",
  },
  {
    date: "June 1, 2026",
    dateObj: new Date("2026-06-01"),
    title: "Medium Buildings O&M Implementation",
    description: "12-month O&M program must be active (preparation for 2027 deadline)",
    tier: "Tier 1",
    sizeCategory: "90-220k sq ft",
    type: "preparation",
    status: "upcoming",
  },
  {
    date: "December 1, 2026",
    dateObj: new Date("2026-12-01"),
    title: "Conditional Compliance Applications Due",
    description: "≥180 days before June 1, 2027 deadline",
    tier: "Tier 1",
    sizeCategory: "90-220k sq ft",
    type: "filing",
    status: "future",
  },
  {
    date: "June 1, 2027",
    dateObj: new Date("2027-06-01"),
    title: "Medium Buildings Compliance Due",
    description: "Forms A, B, C required. Performance targets must be met.",
    tier: "Tier 1",
    sizeCategory: "90-220k sq ft",
    type: "filing",
    status: "future",
  },
  {
    date: "July 1, 2027",
    dateObj: new Date("2027-07-01"),
    title: "Tier 2 Buildings Compliance Due",
    description: "Forms A, B, C (Tier 2). EMP & O&M must be active by this date.",
    tier: "Tier 2",
    type: "filing",
    status: "future",
  },
  {
    date: "June 1, 2027",
    dateObj: new Date("2027-06-01"),
    title: "Small Buildings O&M Implementation",
    description: "12-month O&M program must be active (preparation for 2028 deadline)",
    tier: "Tier 1",
    sizeCategory: "50-90k sq ft",
    type: "preparation",
    status: "future",
  },
  {
    date: "December 1, 2027",
    dateObj: new Date("2027-12-01"),
    title: "Conditional Compliance Applications Due",
    description: "≥180 days before June 1, 2028 deadline",
    tier: "Tier 1",
    sizeCategory: "50-90k sq ft",
    type: "filing",
    status: "future",
  },
  {
    date: "June 1, 2028",
    dateObj: new Date("2028-06-01"),
    title: "Small Buildings Compliance Due",
    description: "Forms A, B, C required. Performance targets must be met.",
    tier: "Tier 1",
    sizeCategory: "50-90k sq ft",
    type: "filing",
    status: "future",
  },
]

export default function MasterVisualTimeline() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000 * 60) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const getNextCriticalDeadline = () => {
    const upcomingEvents = timelineEvents
      .filter((event) => event.dateObj > currentDate && (event.urgent || event.type === "filing"))
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

    if (upcomingEvents.length === 0) return null

    const nextEvent = upcomingEvents[0]
    const daysUntil = Math.ceil((nextEvent.dateObj.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

    return { event: nextEvent, daysUntil }
  }

  const nextDeadline = getNextCriticalDeadline()

  const getFilteredEvents = () => {
    if (!selectedBuilding) return timelineEvents

    return timelineEvents.filter((event) => {
      if (selectedBuilding === "tier2") return event.tier === "Tier 2"
      if (selectedBuilding === "large") return event.tier === "Tier 1" && event.sizeCategory === ">220k sq ft"
      if (selectedBuilding === "medium") return event.tier === "Tier 1" && event.sizeCategory === "90-220k sq ft"
      if (selectedBuilding === "small") return event.tier === "Tier 1" && event.sizeCategory === "50-90k sq ft"
      return true
    })
  }

  const filteredEvents = getFilteredEvents()

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Master CBPS Compliance Timeline</h2>
          <p className="text-lg text-slate-700 mb-6">
            Interactive timeline showing preparation deadlines vs. filing deadlines for all building tiers
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
                {nextDeadline.daysUntil <= 90 && " - URGENT ACTION REQUIRED"}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Filter by Your Building Type</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedBuilding === null ? "default" : "outline"}
              onClick={() => setSelectedBuilding(null)}
              size="sm"
            >
              All Buildings
            </Button>
            <Button
              variant={selectedBuilding === "tier2" ? "default" : "outline"}
              onClick={() => setSelectedBuilding("tier2")}
              size="sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Tier 2 (20-50k sq ft + Multifamily)
            </Button>
            <Button
              variant={selectedBuilding === "large" ? "default" : "outline"}
              onClick={() => setSelectedBuilding("large")}
              size="sm"
            >
              <Building className="w-4 h-4 mr-2" />
              Large (220k+ sq ft)
            </Button>
            <Button
              variant={selectedBuilding === "medium" ? "default" : "outline"}
              onClick={() => setSelectedBuilding("medium")}
              size="sm"
            >
              <Building className="w-4 h-4 mr-2" />
              Medium (90-220k sq ft)
            </Button>
            <Button
              variant={selectedBuilding === "small" ? "default" : "outline"}
              onClick={() => setSelectedBuilding("small")}
              size="sm"
            >
              <Building className="w-4 h-4 mr-2" />
              Small (50-90k sq ft)
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Dual-Track Timeline: Preparation vs. Filing Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline background */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 transform -translate-y-1/2"></div>

              {/* Current date indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                style={{
                  left: `${Math.min(95, Math.max(5, ((currentDate.getTime() - new Date("2025-01-01").getTime()) / (new Date("2028-12-31").getTime() - new Date("2025-01-01").getTime())) * 100))}%`,
                }}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  You are here
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
                {/* Tier 1 Track */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-blue-800 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Tier 1 Buildings (≥50,000 sq ft)
                  </h3>
                  <div className="space-y-4">
                    {filteredEvents
                      .filter((event) => event.tier === "Tier 1")
                      .map((event, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            event.type === "preparation"
                              ? "border-l-amber-500 bg-amber-50"
                              : event.type === "filing"
                                ? "border-l-blue-500 bg-blue-50"
                                : "border-l-green-500 bg-colorado-blue-50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-slate-800">{event.title}</h4>
                              {event.sizeCategory && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {event.sizeCategory}
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{event.date}</div>
                              <Badge
                                variant={
                                  event.status === "completed" ? "default" : event.urgent ? "destructive" : "secondary"
                                }
                                className="text-xs"
                              >
                                {event.type === "preparation"
                                  ? "Prep"
                                  : event.type === "filing"
                                    ? "Filing"
                                    : "Incentive"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{event.description}</p>
                          {event.urgent && <p className="text-xs text-red-600 font-semibold mt-1">⚠️ URGENT</p>}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Tier 2 Track */}
                <div>
                  <h3 className="text-lg font-semibold mb-6 text-colorado-blue-800 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Tier 2 Buildings (20-50k sq ft + Multifamily)
                  </h3>
                  <div className="space-y-4">
                    {filteredEvents
                      .filter((event) => event.tier === "Tier 2")
                      .map((event, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            event.type === "preparation"
                              ? "border-l-amber-500 bg-amber-50"
                              : event.type === "filing"
                                ? "border-l-colorado-blue-500 bg-colorado-blue-50"
                                : "border-l-green-500 bg-colorado-blue-50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-slate-800">{event.title}</h4>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{event.date}</div>
                              <Badge
                                variant={
                                  event.status === "completed" ? "default" : event.urgent ? "destructive" : "secondary"
                                }
                                className="text-xs"
                              >
                                {event.type === "preparation"
                                  ? "Prep"
                                  : event.type === "filing"
                                    ? "Filing"
                                    : "Incentive"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{event.description}</p>
                          {event.urgent && <p className="text-xs text-red-600 font-semibold mt-1">⚠️ URGENT</p>}
                        </div>
                      ))}

                    {/* Tier 2 Key Difference Callout */}
                    <div className="p-4 bg-colorado-blue-100 border border-colorado-blue-300 rounded-lg">
                      <h4 className="font-semibold text-colorado-blue-800 mb-2">Tier 2 Advantage</h4>
                      <p className="text-sm text-colorado-blue-700">
                        <strong>No 12-month rule:</strong> EMP & O&M just need to be active by July 1, 2027 deadline.
                        Documentation-only compliance (no performance targets in first cycle).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Alert variant="destructive">
            <TrendingUp className="h-4 w-4" />
            <AlertTitle>Tier 2 Funding Alert - $150M Pool</AlertTitle>
            <AlertDescription>
              Early adopter incentives launched July 1, 2025. At current application rates, funding may be exhausted by
              Q2 2026.
              <strong>Base: $0.30/sq ft | Enhanced: $0.75/sq ft (multifamily with Anti-Displacement Agreement)</strong>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Tier 1 Funding - $75M Pool</AlertTitle>
            <AlertDescription>
              $2.00/sq ft base incentive + energy savings bonuses available for early compliance. Must meet 15 EUI
              reduction target and implement cost-effective measures.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  )
}
