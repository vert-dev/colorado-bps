"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, FileText, Settings, Upload, Trophy, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ComplianceStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  tier: "both" | "tier1" | "tier2"
  timeframe: string
  completed: boolean
  urgent?: boolean
}

const complianceSteps: ComplianceStep[] = [
  {
    id: "benchmark",
    title: "Benchmark Your Building",
    description: "Use EPA's ENERGY STAR Portfolio Manager® to calculate your building's energy use intensity (EUI)",
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    tier: "both",
    timeframe: "Start immediately",
    completed: false,
  },
  {
    id: "emp",
    title: "Develop Energy Management Plan",
    description: "Create and implement a qualifying EMP (Tier 1: 12 months prior, Tier 2: by deadline)",
    icon: <FileText className="w-6 h-6 text-colorado-gold-600" />,
    tier: "both",
    timeframe: "12 months before deadline (Tier 1 only)",
    completed: false,
    urgent: true,
  },
  {
    id: "om",
    title: "Implement O&M Program",
    description: "Develop and implement Operations & Maintenance Plan (Tier 1: 12 months prior, Tier 2: by deadline)",
    icon: <Settings className="w-6 h-6 text-amber-600" />,
    tier: "both",
    timeframe: "12 months before deadline (Tier 1 only)",
    completed: false,
    urgent: true,
  },
  {
    id: "performance",
    title: "Meet Performance Targets",
    description: "Achieve energy use intensity target or implement investment criteria pathway",
    icon: <Trophy className="w-6 h-6 text-purple-600" />,
    tier: "tier1",
    timeframe: "By compliance deadline",
    completed: false,
  },
  {
    id: "submit",
    title: "Submit Documentation",
    description: "Submit Forms A, B, C (+ D/F if conditional) to WA Department of Commerce",
    icon: <Upload className="w-6 h-6 text-slate-600" />,
    tier: "both",
    timeframe: "By compliance deadline",
    completed: false,
  },
]

export default function InteractiveComplianceChecklist() {
  const [steps, setSteps] = useState(complianceSteps)
  const [selectedTier, setSelectedTier] = useState<"tier1" | "tier2" | "both">("both")
  const { toast } = useToast()

  const filteredSteps = steps.filter((step) => step.tier === "both" || step.tier === selectedTier)
  const completedSteps = filteredSteps.filter((step) => step.completed).length
  const progressPercentage = (completedSteps / filteredSteps.length) * 100

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
          <p className="text-lg text-slate-700 mb-6">Track your progress through the CBPS compliance process</p>

          <div className="flex justify-center gap-3 mb-6">
            <Button
              variant={selectedTier === "both" ? "default" : "outline"}
              onClick={() => setSelectedTier("both")}
              size="sm"
            >
              All Requirements
            </Button>
            <Button
              variant={selectedTier === "tier1" ? "default" : "outline"}
              onClick={() => setSelectedTier("tier1")}
              size="sm"
            >
              Tier 1 Buildings
            </Button>
            <Button
              variant={selectedTier === "tier2" ? "default" : "outline"}
              onClick={() => setSelectedTier("tier2")}
              size="sm"
            >
              Tier 2 Buildings
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
                step.completed ? "bg-colorado-blue-50 border-colorado-gold-200" : step.urgent ? "bg-red-50 border-red-200" : "bg-white"
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
                          Urgent
                        </Badge>
                      )}
                      {step.completed && (
                        <Badge variant="default" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Done
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${step.completed ? "text-slate-400" : "text-slate-600"}`}>
                      {step.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>Timeline:</strong> {step.timeframe}
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
              Focus on completing the urgent items first, especially EMP and O&M implementation for Tier 1 buildings.
              Need help getting started? Our compliance experts can guide you through each step.
            </AlertDescription>
          </Alert>
        )}

        {progressPercentage === 100 && (
          <Alert className="border-colorado-gold-200 bg-colorado-blue-50">
            <Trophy className="h-4 w-4 text-colorado-blue-500" />
            <AlertTitle className="text-colorado-blue-700">Compliance Complete!</AlertTitle>
            <AlertDescription className="text-colorado-blue-600">
              Congratulations! You've completed all required compliance steps. Don't forget to submit your documentation
              by your deadline.
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
