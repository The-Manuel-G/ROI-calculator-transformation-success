"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectIdentificationProps {
  data: any
  updateData: (data: any) => void
}

export function ProjectIdentification({ data, updateData }: ProjectIdentificationProps) {
  const [formValues, setFormValues] = useState(() => ({
    projectName: data?.projectName || "",
    projectDescription: data?.projectDescription || "",
    department: data?.department || "",
  }))

  const handleChange = (field: string, value: string) => {
    const newValues = {
      ...formValues,
      [field]: value,
    }
    setFormValues(newValues)
    updateData(newValues)
  }

  const departments = [
    "Retail Banking",
    "Commercial Banking",
    "Investment Banking",
    "Wealth Management",
    "Risk Management",
    "Compliance",
    "Operations",
    "Customer Service",
    "IT",
    "Other",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Identification</CardTitle>
        <CardDescription>
          Provide basic information about your AI project to begin the ROI calculation process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="Enter the name of your AI project"
            value={formValues.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectDescription">Project Description</Label>
          <Textarea
            id="projectDescription"
            placeholder="Briefly describe the objectives and goals of your AI project"
            rows={4}
            value={formValues.projectDescription}
            onChange={(e) => handleChange("projectDescription", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department or Business Unit</Label>
          <Select value={formValues.department} onValueChange={(value) => handleChange("department", value)}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

