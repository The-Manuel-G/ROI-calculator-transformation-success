"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ProjectInfoProps {
  data: any
  updateData: (data: any) => void
}

export function ProjectInfo({ data, updateData }: ProjectInfoProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
        <CardDescription>
          Provide basic information about your AI project to begin the ROI calculation process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project_info">Project Description</Label>
          <Textarea
            id="project_info"
            placeholder="Describe your AI project, its objectives, and expected outcomes"
            rows={5}
            value={data.project_info}
            onChange={(e) => handleChange("project_info", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Provide a comprehensive description of your project to help with ROI analysis
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Number of Employees Affected</Label>
          <Input
            id="employees"
            type="number"
            placeholder="0"
            value={data.employees}
            onChange={(e) => handleChange("employees", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Enter the total number of employees who will be affected by this AI implementation
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

