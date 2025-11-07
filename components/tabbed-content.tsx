"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, CheckCircle, ClipboardList, Download, HelpCircle } from "lucide-react"

interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  content: React.ReactNode
}

interface TabbedContentProps {
  tabs: TabItem[]
  defaultTab?: string
}

export default function TabbedContent({ tabs = [], defaultTab }: TabbedContentProps) {
  console.log("[v0] TabbedContent received tabs:", tabs)

  const initialTab = defaultTab || (tabs.length > 0 ? tabs[0].id : "")
  const [activeTab, setActiveTab] = useState(initialTab)

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)

  if (!tabs || tabs.length === 0) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">No tabs available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CBPS Information</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left h-auto py-3 px-4",
                      activeTab === tab.id
                        ? "bg-colorado-blue-500 text-white hover:bg-colorado-blue-600"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                    )}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3 flex-shrink-0">{tab.icon}</span>
                    <span className="text-sm font-medium">{tab.label}</span>
                  </Button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border">
              {activeTabContent?.content || <div className="p-8 text-center text-gray-500">Content not found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export individual tab icons for reuse
export const TabIcons = {
  Building2,
  Calendar,
  CheckCircle,
  ClipboardList,
  Download,
  HelpCircle,
}
