"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectIdentification } from "@/components/project-identification"
import { InitialState } from "@/components/initial-state"
import { ImplementationCosts } from "@/components/implementation-costs"
import { ExpectedGains } from "@/components/expected-gains"
import { ChangeManagement } from "@/components/change-management"
import { ProjectTimeline } from "@/components/project-timeline"
import { OptionalFactors } from "@/components/optional-factors"
import { Results } from "@/components/results"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const TABS = [
  "project",
  "initial-state",
  "implementation-costs",
  "expected-gains",
  "change-management",
  "timeline",
  "optional-factors",
  "results",
]

export default function Calculator() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [formData, setFormData] = useState({
    project: {},
    initialState: {},
    implementationCosts: {},
    expectedGains: {},
    changeManagement: {},
    timeline: {},
    optionalFactors: {},
  })
  const { toast } = useToast()

  const currentTabIndex = TABS.indexOf(activeTab)
  const progress = ((currentTabIndex + 1) / TABS.length) * 100

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleNext = () => {
    const nextIndex = currentTabIndex + 1
    if (nextIndex < TABS.length) {
      setActiveTab(TABS[nextIndex])
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentTabIndex - 1
    if (prevIndex >= 0) {
      setActiveTab(TABS[prevIndex])
    }
  }

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => {
      // Only update if the data has actually changed
      const currentData = prev[section as keyof typeof prev]
      if (JSON.stringify(currentData) === JSON.stringify(data)) {
        return prev
      }

      return {
        ...prev,
        [section]: data,
      }
    })
  }

  const handleSave = () => {
    toast({
      title: "Progress saved",
      description: "Your calculator data has been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 max-w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Input Form Data</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Step {currentTabIndex + 1} of {TABS.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <Card className="h-fit lg:sticky lg:top-8">
          <CardContent className="p-4">
            <div className="flex flex-col w-full h-auto gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={cn(
                    "flex items-center justify-start w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {tab === "project" && "Project Identification"}
                  {tab === "initial-state" && "Initial State"}
                  {tab === "implementation-costs" && "Implementation Costs"}
                  {tab === "expected-gains" && "Expected Gains"}
                  {tab === "change-management" && "Change Management"}
                  {tab === "timeline" && "Project Timeline"}
                  {tab === "optional-factors" && "Optional Factors"}
                  {tab === "results" && "Results"}
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Progress
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1">
          {activeTab === "project" && (
            <ProjectIdentification data={formData.project} updateData={(data) => updateFormData("project", data)} />
          )}
          {activeTab === "initial-state" && (
            <InitialState data={formData.initialState} updateData={(data) => updateFormData("initialState", data)} />
          )}
          {activeTab === "implementation-costs" && (
            <ImplementationCosts
              data={formData.implementationCosts}
              updateData={(data) => updateFormData("implementationCosts", data)}
            />
          )}
          {activeTab === "expected-gains" && (
            <ExpectedGains data={formData.expectedGains} updateData={(data) => updateFormData("expectedGains", data)} />
          )}
          {activeTab === "change-management" && (
            <ChangeManagement
              data={formData.changeManagement}
              updateData={(data) => updateFormData("changeManagement", data)}
            />
          )}
          {activeTab === "timeline" && (
            <ProjectTimeline data={formData.timeline} updateData={(data) => updateFormData("timeline", data)} />
          )}
          {activeTab === "optional-factors" && (
            <OptionalFactors
              data={formData.optionalFactors}
              updateData={(data) => updateFormData("optionalFactors", data)}
            />
          )}
          {activeTab === "results" && <Results formData={formData} />}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={currentTabIndex === 0} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext} disabled={currentTabIndex === TABS.length - 1} className="gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

