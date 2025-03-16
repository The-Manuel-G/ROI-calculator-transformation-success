"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

interface ExpectedGainsProps {
  data: any
  updateData: (data: any) => void
}

export function ExpectedGains({ data, updateData }: ExpectedGainsProps) {
  const [formValues, setFormValues] = useState({
    efficiencyIncrease: data.efficiencyIncrease || 20,
    costReduction: data.costReduction || "",
    revenueIncrease: data.revenueIncrease || "",
    errorReduction: data.errorReduction || 50,
    customerSatisfaction: data.customerSatisfaction || 15,
    additionalBenefits: data.additionalBenefits || "",
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
        <CardTitle>Expected Gains from AI Implementation</CardTitle>
        <CardDescription>
          Estimate the benefits you expect to achieve from implementing AI in your organization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="efficiencyIncrease">Projected Increase in Efficiency (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="efficiencyIncrease"
                min={0}
                max={100}
                step={1}
                value={[formValues.efficiencyIncrease]}
                onValueChange={(value) => handleChange("efficiencyIncrease", value[0])}
                className="flex-1"
              />
              <span className="w-12 text-center">{formValues.efficiencyIncrease}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Estimate how much more efficient your processes will be after AI implementation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="costReduction">Anticipated Cost Reduction (Annual)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="costReduction"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.costReduction}
                onChange={(e) => handleChange("costReduction", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Expected annual savings in operational costs</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenueIncrease">Potential Revenue Increase (Annual)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="revenueIncrease"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formValues.revenueIncrease}
                onChange={(e) => handleChange("revenueIncrease", e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Projected additional revenue from new opportunities or increased sales
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="errorReduction">Estimated Error Reduction (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="errorReduction"
                  min={0}
                  max={100}
                  step={1}
                  value={[formValues.errorReduction]}
                  onValueChange={(value) => handleChange("errorReduction", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formValues.errorReduction}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Expected reduction in errors or improvement in quality
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="customerSatisfaction">Expected Customer Satisfaction Increase (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="customerSatisfaction"
                  min={0}
                  max={100}
                  step={1}
                  value={[formValues.customerSatisfaction]}
                  onValueChange={(value) => handleChange("customerSatisfaction", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formValues.customerSatisfaction}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Projected improvement in customer satisfaction metrics
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalBenefits">Additional Benefits</Label>
          <Textarea
            id="additionalBenefits"
            placeholder="Describe any other benefits you expect from implementing AI"
            rows={3}
            value={formValues.additionalBenefits}
            onChange={(e) => handleChange("additionalBenefits", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Include any other qualitative or quantitative benefits not covered above
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

