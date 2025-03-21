"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BudgetAndDurationProps {
  data: any
  updateData: (data: any) => void
}

export function BudgetAndDuration({ data, updateData }: BudgetAndDurationProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget and Duration</CardTitle>
        <CardDescription>
          Enter the total budget and expected duration of your AI implementation project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Total Project Budget</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="budget"
              type="number"
              placeholder="0"
              className="pl-8"
              value={data.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Include all costs related to implementation, software, hardware, and services
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration_months">Project Duration (Months)</Label>
          <Input
            id="duration_months"
            type="number"
            placeholder="0"
            value={data.duration_months}
            onChange={(e) => handleChange("duration_months", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Enter the expected duration of the implementation in months</p>
        </div>
      </CardContent>
    </Card>
  )
}

