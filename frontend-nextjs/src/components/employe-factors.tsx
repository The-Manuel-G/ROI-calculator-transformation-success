"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface EmployeeFactorsProps {
  data: any
  updateData: (data: any) => void
}

export function EmployeeFactors({ data, updateData }: EmployeeFactorsProps) {
  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee and Change Management Factors</CardTitle>
        <CardDescription>Enter details about employee-related costs and factors that affect adoption.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="management_resources">Management Resources</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="management_resources"
                type="number"
                placeholder="0"
                className="pl-8"
                value={data.management_resources}
                onChange={(e) => handleChange("management_resources", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Cost of management resources dedicated to the project</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="training_costs">Training Costs</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="training_costs"
                type="number"
                placeholder="0"
                className="pl-8"
                value={data.training_costs}
                onChange={(e) => handleChange("training_costs", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Total cost for training employees on the new system</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="communication_costs">Communication Costs</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="communication_costs"
                type="number"
                placeholder="0"
                className="pl-8"
                value={data.communication_costs}
                onChange={(e) => handleChange("communication_costs", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Costs for communication and change management activities</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="adoption_speed_months">Adoption Speed (Months)</Label>
            <Input
              id="adoption_speed_months"
              type="number"
              placeholder="0"
              value={data.adoption_speed_months}
              onChange={(e) => handleChange("adoption_speed_months", e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">Estimated time until full adoption of the AI system</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="employee_competence_percent">Employee Competence (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="employee_competence_percent"
                min={0}
                max={100}
                step={0.1}
                value={[Number.parseFloat(data.employee_competence_percent) || 0]}
                onValueChange={(value) => handleChange("employee_competence_percent", value[0].toString())}
                className="flex-1"
              />
              <span className="w-16 text-center">{Number.parseFloat(data.employee_competence_percent) || 0}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expected level of employee competence with the new system
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="utilization_percent">System Utilization (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="utilization_percent"
                min={0}
                max={100}
                step={0.1}
                value={[Number.parseFloat(data.utilization_percent) || 0]}
                onValueChange={(value) => handleChange("utilization_percent", value[0].toString())}
                className="flex-1"
              />
              <span className="w-16 text-center">{Number.parseFloat(data.utilization_percent) || 0}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Expected utilization rate of the AI system</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

