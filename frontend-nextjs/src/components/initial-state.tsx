"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

interface InitialStateProps {
  data: any
  updateData: (data: any) => void
}

export function InitialState({ data, updateData }: InitialStateProps) {
  // Initialize state from props but don't update when props change
  const [formValues, setFormValues] = useState(() => ({
    operationalCosts: data?.operationalCosts || "",
    processingTime: data?.processingTime || "",
    errorRate: data?.errorRate || 5,
    revenue: data?.revenue || "",
    employeeEngagement: data?.employeeEngagement || 50,
    currentProcessDescription: data?.currentProcessDescription || "",
  }))

  const handleChange = (field: string, value: any) => {
    const newValues = {
      ...formValues,
      [field]: value,
    }
    setFormValues(newValues)
    // Update parent immediately with the new values
    updateData(newValues)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initial State (Pre-Implementation)</CardTitle>
        <CardDescription>
          Provide metrics about your current process before AI implementation to establish a baseline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentProcessDescription">Current Process Description</Label>
          <Textarea
            id="currentProcessDescription"
            placeholder="Describe the current process that will be enhanced or replaced by AI"
            rows={3}
            value={formValues.currentProcessDescription}
            onChange={(e) => handleChange("currentProcessDescription", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="operationalCosts">Current Operational Costs (Annual)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="operationalCosts"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.operationalCosts}
                onChange={(e) => handleChange("operationalCosts", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue">Current Revenue Generated (if applicable)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="revenue"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.revenue}
                onChange={(e) => handleChange("revenue", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="processingTime">Average Processing Time (minutes)</Label>
            <Input
              id="processingTime"
              type="number"
              placeholder="0"
              value={formValues.processingTime}
              onChange={(e) => handleChange("processingTime", e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="errorRate">Current Error Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="errorRate"
                  min={0}
                  max={100}
                  step={1}
                  value={[formValues.errorRate]}
                  onValueChange={(value) => handleChange("errorRate", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formValues.errorRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="employeeEngagement">Employee Engagement Level</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="employeeEngagement"
                min={0}
                max={100}
                step={1}
                value={[formValues.employeeEngagement]}
                onValueChange={(value) => handleChange("employeeEngagement", value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{formValues.employeeEngagement}%</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Estimate the current level of employee engagement with the existing process.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

