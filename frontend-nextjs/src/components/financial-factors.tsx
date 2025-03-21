"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FinancialFactorsProps {
  data: any
  updateData: (data: any) => void
}

export function FinancialFactors({ data, updateData }: FinancialFactorsProps) {
  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Factors</CardTitle>
        <CardDescription>Enter financial risks and expected benefits from your AI implementation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="financial_risks">Financial Risks</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="financial_risks"
              type="number"
              placeholder="0"
              className="pl-8"
              value={data.financial_risks}
              onChange={(e) => handleChange("financial_risks", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">Estimated financial risks associated with the project</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="productivity_savings">Productivity Savings</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="productivity_savings"
              type="number"
              placeholder="0"
              className="pl-8"
              value={data.productivity_savings}
              onChange={(e) => handleChange("productivity_savings", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">Expected annual savings from increased productivity</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="risk_reduction">Risk Reduction</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="risk_reduction"
              type="number"
              placeholder="0"
              className="pl-8"
              value={data.risk_reduction}
              onChange={(e) => handleChange("risk_reduction", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">Expected annual savings from reduced risks and errors</p>
        </div>
      </CardContent>
    </Card>
  )
}

