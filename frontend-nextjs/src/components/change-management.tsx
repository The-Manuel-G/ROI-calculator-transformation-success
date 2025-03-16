"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

interface ChangeManagementProps {
  data: any
  updateData: (data: any) => void
}

export function ChangeManagement({ data, updateData }: ChangeManagementProps) {
  const [formValues, setFormValues] = useState({
    communicationCosts: data.communicationCosts || "",
    trainingCosts: data.trainingCosts || "",
    restructuringCosts: data.restructuringCosts || "",
    adoptionRate: data.adoptionRate || 70,
    resistanceLevel: data.resistanceLevel || 30,
    changeStrategy: data.changeStrategy || "",
  })

  useEffect(() => {
    updateData(formValues)
  }, [formValues, updateData])

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateTotalCost = () => {
    const communication = Number.parseFloat(formValues.communicationCosts) || 0
    const training = Number.parseFloat(formValues.trainingCosts) || 0
    const restructuring = Number.parseFloat(formValues.restructuringCosts) || 0

    const total = communication + training + restructuring
    return total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Management Costs</CardTitle>
        <CardDescription>
          Estimate the costs associated with managing the organizational change required for AI implementation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="communicationCosts">Communication & Stakeholder Engagement</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="communicationCosts"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.communicationCosts}
                onChange={(e) => handleChange("communicationCosts", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Costs for communicating changes and engaging stakeholders</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainingCosts">Training & Development</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="trainingCosts"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.trainingCosts}
                onChange={(e) => handleChange("trainingCosts", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Costs for training employees on the new AI system</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="restructuringCosts">Organizational Restructuring</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="restructuringCosts"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.restructuringCosts}
                onChange={(e) => handleChange("restructuringCosts", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Costs for any organizational or process redesign required</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Total Change Management Costs</h3>
            <div className="text-xl font-bold">${calculateTotalCost()}</div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Change management is a critical investment for successful AI implementation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="adoptionRate">Expected Adoption Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="adoptionRate"
                  min={0}
                  max={100}
                  step={1}
                  value={[formValues.adoptionRate]}
                  onValueChange={(value) => handleChange("adoptionRate", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formValues.adoptionRate}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Estimate the percentage of employees who will adopt the AI system
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="resistanceLevel">Anticipated Resistance Level (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="resistanceLevel"
                  min={0}
                  max={100}
                  step={1}
                  value={[formValues.resistanceLevel]}
                  onValueChange={(value) => handleChange("resistanceLevel", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formValues.resistanceLevel}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Estimate the level of resistance to change you expect
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="changeStrategy">Change Management Strategy</Label>
          <Textarea
            id="changeStrategy"
            placeholder="Describe your approach to managing the change process"
            rows={3}
            value={formValues.changeStrategy}
            onChange={(e) => handleChange("changeStrategy", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Outline your strategy for ensuring successful adoption of the AI system
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

