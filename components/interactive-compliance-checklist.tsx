"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, FileText, Settings, Upload, Trophy, Clock, AlertTriangle, Target, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ComplianceStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  phase: "annual" | "preparation" | "interim" | "final"
  timeframe: string
  completed: boolean
  urgent?: boolean
}

const complianceSteps: ComplianceStep[] = [
  {
    id: "portfolio-manager",
    title: "Set Up Energy Star Portfolio Manager",
    description: "Create account and connect your building to track energy usage data year-round",
    icon: <Settings className="w-6 h-6 text-blue-600" />,
    phase: "annual",
    timeframe: "Immediate - needed for all reporting",
    completed: false,
    urgent: true,
  },
  {
    id: "beam-portal",
    title: "Register with BEAM Portal",
    description: "Create account on Colorado's Building Owner Portal (https://co.beam-portal.org/) for submissions",
    icon: <Upload className="w-6 h-6 text-colorado-blue-600" />,
    phase: "annual",
    timeframe: "Immediate",
    completed: false,
    urgent: true,
  },
  {
    id: "annual-benchmark",
    title: "Submit Annual Benchmarking Report",
    description: "Submit energy usage data via Portfolio Manager to BEAM Portal and pay $100 annual fee",
    icon: <FileText className="w-6 h-6 text-orange-600" />,
    phase: "annual",
    timeframe: "August 1 each year",
    completed: false,
    urgent: true,
  },
  {
    id: "energy-audit",
    title: "Complete Energy Audit",
    description: "Hire qualified professional to conduct comprehensive energy audit of your building",
    icon: <CheckCircle className="w-6 h-6 text-colorado-gold-600" />,
    phase: "preparation",
    timeframe: "By December 31, 2025",
    completed: false,
    urgent: true,
  },
  {
    id: "pathway-selection",
    title: "Select Compliance Pathway",
    description: "Choose one of three pathways: Energy Efficiency, GHG Reduction, or Standard % Reduction",
    icon: <Target className="w-6 h-6 text-purple-600" />,
    phase: "preparation",
    timeframe: "By December 31, 2025",
    completed: false,
    urgent: true,
  },
  {
    id: "compliance-plan",
    title: "File Compliance Plan",
    description: "Submit formal compliance plan to Colorado Energy Office documenting chosen pathway and strategy",
    icon: <FileText className="w-6 h-6 text-amber-600" />,
    phase: "preparation",
    timeframe: "By December 31, 2025",
    completed: false,
    urgent: true,
  },
  {
    id: "interim-target",
    title: "Meet Interim Performance Target",
    description: "Achieve 7% reduction from 2021 baseline (EUI or GHG depending on pathway)",
    icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
    phase: "interim",
    timeframe: "By December 31, 2026",
    completed: false,
  },
  {
    id: "interim-report",
    title: "Submit Interim Compliance Report",
    description: "Document achievement of 7% interim target via BEAM Portal",
    icon: <Upload className="w-6 h-6 text-slate-600" />,
    phase: "interim",
    timeframe: "By December 31, 2026",
    completed: false,
  },
  {
    id: "final-target",
    title: "Meet Final Performance Target",
    description: "Achieve 20% reduction from 2021 baseline (EUI or GHG depending on pathway)",
    icon: <Trophy className="w-6 h-6 text-colorado-blue-600" />,
    phase: "final",
    timeframe: "By December 31, 2030",
    completed: false,
  },
  {
    id: "final-report",
    title: "Submit Final Compliance Report",
    description: "Document achievement of 20% final target via BEAM Portal",
    icon: <Upload className="w-6 h-6 text-colorado-gold-600" />,
    phase: "final",
    timeframe: "By December 31, 2030",
    completed: false,
  },
]

export default function InteractiveComplianceChecklist() {
  const [steps, setSteps] = useState(complianceSteps)
  const [selectedPhase, setSelectedPhase] = useState<"annual" | "preparation" | "interim" | "final" | "all">("all")
  const { toast } = useToast()

  const filteredSteps = selectedPhase === "all" ? steps : steps.filter((step) => step.phase === selectedPhase)
  const completedSteps = filteredSteps.filter((step) => step.completed).length
  const progressPercentage = filteredSteps.length > 0 ? (completedSteps / filteredSteps.length) * 100 : 0

  const handleStepToggle = (stepId: string, completed: boolean) => {
    setSteps((prev) => prev.map((step) => (step.id === stepId ? { ...step, completed } : step)))

    const step = steps.find((s) => s.id === stepId)
    if (step && completed) {
      toast({
        title: "Step Completed! 🎉",
        description: `Great progress on "${step.title}". Keep going!`,
      })
    }
  }

  useEffect(() => {
    if (progressPercentage === 50) {
      toast({
        title: "Halfway There! 🚀",
        description: "You've completed 50% of your compliance steps. Excellent progress!",
      })
    } else if (progressPercentage === 100) {
      toast({
        title: "Compliance Complete! 🏆",
        description: "Congratulations! You've completed all required compliance steps.",
      })
    }
  }, [progressPercentage, toast])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Interactive Compliance Tracker</h2>
          <p className="text-lg text-slate-700 mb-6">Track your progress through the Colorado BPS compliance process</p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button
              variant={selectedPhase === "all" ? "default" : "outline"}
              onClick={() => setSelectedPhase("all")}
              size="sm"
            >
              All Steps
            </Button>
            <Button
              variant={selectedPhase === "annual" ? "default" : "outline"}
              onClick={() => setSelectedPhase("annual")}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
            >
              Annual (Ongoing)
            </Button>
            <Button
              variant={selectedPhase === "preparation" ? "default" : "outline"}
              onClick={() => setSelectedPhase("preparation")}
              size="sm"
              className="bg-red-600 hover:bg-red-700"
            >
              2025 Prep
            </Button>
            <Button
              variant={selectedPhase === "interim" ? "default" : "outline"}
              onClick={() => setSelectedPhase("interim")}
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              2026 Interim
            </Button>
            <Button
              variant={selectedPhase === "final" ? "default" : "outline"}
              onClick={() => setSelectedPhase("final")}
              size="sm"
              className="bg-colorado-blue-600 hover:bg-colorado-blue-700"
            >
              2030 Final
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Progress</span>
              <Badge variant={progressPercentage === 100 ? "default" : "secondary"}>
                {completedSteps}/{filteredSteps.length} Complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="mb-4" />
            <p className="text-sm text-slate-600 text-center">
              {progressPercentage === 100
                ? "🎉 All compliance steps completed!"
                : `${Math.round(progressPercentage)}% complete - ${filteredSteps.length - completedSteps} steps remaining`}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-8">
          {filteredSteps.map((step) => (
            <Card
              key={step.id}
              className={`transition-all ${
                step.completed
                  ? "bg-colorado-blue-50 border-colorado-gold-200"
                  : step.urgent
                    ? "bg-red-50 border-red-200"
                    : "bg-white"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={step.completed}
                    onCheckedChange={(checked) => handleStepToggle(step.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {step.icon}
                      <h3
                        className={`font-semibold ${step.completed ? "line-through text-slate-500" : "text-slate-800"}`}
                      >
                        {step.title}
                      </h3>
                      {step.urgent && !step.completed && (
                        <Badge variant="destructive" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Critical
                        </Badge>
                      )}
                      {step.completed && (
                        <Badge variant="default" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Done
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {step.phase === "annual"
                          ? "Annual"
                          : step.phase === "preparation"
                            ? "2025 Prep"
                            : step.phase === "interim"
                              ? "2026 Interim"
                              : "2030 Final"}
                      </Badge>
                    </div>
                    <p className={`text-sm mb-2 ${step.completed ? "text-slate-400" : "text-slate-600"}`}>
                      {step.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>Deadline:</strong> {step.timeframe}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {progressPercentage < 100 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Next Steps</AlertTitle>
            <AlertDescription>
              Focus on completing the December 31, 2025 preparation items (energy audit, pathway selection, compliance
              plan) to avoid missing the critical first deadline. Need help getting started? Our compliance experts can
              guide you through each step.
            </AlertDescription>
          </Alert>
        )}

        {progressPercentage === 100 && (
          <Alert className="border-colorado-gold-200 bg-colorado-blue-50">
            <Trophy className="h-4 w-4 text-colorado-blue-500" />
            <AlertTitle className="text-colorado-blue-700">Compliance Complete!</AlertTitle>
            <AlertDescription className="text-colorado-blue-600">
              Congratulations! You've completed all required compliance steps. Don't forget to continue annual
              benchmarking and maintain your performance targets through 2050.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center mt-8">
          <Button
            size="lg"
            className="bg-colorado-blue-600 hover:bg-colorado-blue-700 text-white px-8"
            onClick={() => document.getElementById("compliance-help")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Expert Compliance Help
          </Button>
        </div>
      </div>
    </section>
  )
}
