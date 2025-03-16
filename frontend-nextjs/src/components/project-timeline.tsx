"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectTimelineProps {
  data: any
  updateData: (data: any) => void
}

export function ProjectTimeline({ data, updateData }: ProjectTimelineProps) {
  const [formValues, setFormValues] = useState({
    implementationDuration: data.implementationDuration || "",
    implementationUnit: data.implementationUnit || "months",
    roiEvaluationPeriod: data.roiEvaluationPeriod || "",
    roiEvaluationUnit: data.roiEvaluationUnit || "years",
    startDate: data.startDate || "",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>
          Define the timeline for your AI implementation project and ROI evaluation period.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Expected Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formValues.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="implementationDuration">Implementation Duration</Label>
            <div className="flex gap-4">
              <Input
                id="implementationDuration"
                type="number"
                placeholder="Duration"
                className="flex-1"
                value={formValues.implementationDuration}
                onChange={(e) => handleChange("implementationDuration", e.target.value)}
              />
              <Select
                value={formValues.implementationUnit}
                onValueChange={(value) => handleChange("implementationUnit", value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">How long will it take to implement the AI solution?</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roiEvaluationPeriod">ROI Evaluation Period</Label>
            <div className="flex gap-4">
              <Input
                id="roiEvaluationPeriod"
                type="number"
                placeholder="Period"
                className="flex-1"
                value={formValues.roiEvaluationPeriod}
                onChange={(e) => handleChange("roiEvaluationPeriod", e.target.value)}
              />
              <Select
                value={formValues.roiEvaluationUnit}
                onValueChange={(value) => handleChange("roiEvaluationUnit", value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">Over what period will you measure the ROI?</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-2">Timeline Considerations</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>A longer ROI evaluation period may capture more benefits but introduces more uncertainty</li>
            <li>Implementation duration affects when benefits begin to materialize</li>
            <li>Consider phased implementation to realize benefits earlier</li>
            <li>Account for potential delays in your timeline estimates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

