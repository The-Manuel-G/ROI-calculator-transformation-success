"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { ProjectInfo } from "@/components/project-info"
import { BudgetAndDuration } from "@/components/budget-and-durations"
import { EmployeeFactors } from "@/components/employe-factors"
import { FinancialFactors } from "@/components/financial-factors"
import { Results } from "@/components/results"

const TABS = ["project-info", "budget-duration", "employee-factors", "financial-factors", "results"]

export default function CalculatorProduction() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [formData, setFormData] = useState({
    project_info: "",
    budget: "",
    duration_months: "",
    employees: "",
    management_resources: "",
    training_costs: "",
    communication_costs: "",
    adoption_speed_months: "",
    employee_competence_percent: "",
    utilization_percent: "",
    financial_risks: "",
    productivity_savings: "",
    risk_reduction: "",
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

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
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
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI ROI Calculator</h1>
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
                  {tab === "project-info" && "Project Information"}
                  {tab === "budget-duration" && "Budget & Duration"}
                  {tab === "employee-factors" && "Employee Factors"}
                  {tab === "financial-factors" && "Financial Factors"}
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
          {activeTab === "project-info" && <ProjectInfo data={formData} updateData={updateFormData} />}
          {activeTab === "budget-duration" && <BudgetAndDuration data={formData} updateData={updateFormData} />}
          {activeTab === "employee-factors" && <EmployeeFactors data={formData} updateData={updateFormData} />}
          {activeTab === "financial-factors" && <FinancialFactors data={formData} updateData={updateFormData} />}
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

