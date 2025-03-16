"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ImplementationCostsProps {
  data: any
  updateData: (data: any) => void
}

export function ImplementationCosts({ data, updateData }: ImplementationCostsProps) {
  const [formValues, setFormValues] = useState({
    softwareCosts: data.softwareCosts || "",
    hardwareCosts: data.hardwareCosts || "",
    dataCosts: data.dataCosts || "",
    developmentCosts: data.developmentCosts || "",
    maintenanceCosts: data.maintenanceCosts || "",
    consultingCosts: data.consultingCosts || "",
    infrastructureCosts: data.infrastructureCosts || "",
    licensingCosts: data.licensingCosts || "",
    securityCosts: data.securityCosts || "",
    otherCosts: data.otherCosts || "",
  })

  useEffect(() => {
    updateData(formValues)
  }, [formValues, updateData])

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateTotalCost = () => {
    let total = 0
    Object.values(formValues).forEach((value) => {
      const numValue = Number.parseFloat(value as string)
      if (!isNaN(numValue)) {
        total += numValue
      }
    })
    return total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Implementation Costs</CardTitle>
        <CardDescription>Enter all costs associated with implementing your AI solution.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="one-time" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-Time Costs</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Costs</TabsTrigger>
          </TabsList>
          <TabsContent value="one-time" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="softwareCosts">Software & Platform Costs</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="softwareCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.softwareCosts}
                    onChange={(e) => handleChange("softwareCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Cost of acquiring or subscribing to AI software and platforms
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hardwareCosts">Hardware Costs (if applicable)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="hardwareCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.hardwareCosts}
                    onChange={(e) => handleChange("hardwareCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Cost of any new hardware required for AI implementation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dataCosts">Data Acquisition & Preparation Costs</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="dataCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.dataCosts}
                    onChange={(e) => handleChange("dataCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Costs related to obtaining, cleaning, and structuring data
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="developmentCosts">Development & Integration Costs</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="developmentCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.developmentCosts}
                    onChange={(e) => handleChange("developmentCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Cost of developing custom AI models and integrating with existing systems
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="consultingCosts">Consulting & Professional Services</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="consultingCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.consultingCosts}
                    onChange={(e) => handleChange("consultingCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Costs for external expertise and implementation support</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="infrastructureCosts">Infrastructure Setup Costs</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="infrastructureCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.infrastructureCosts}
                    onChange={(e) => handleChange("infrastructureCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Costs for cloud infrastructure or on-premises setup</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recurring" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maintenanceCosts">Maintenance & Support Costs (Annual)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="maintenanceCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.maintenanceCosts}
                    onChange={(e) => handleChange("maintenanceCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Ongoing costs for maintenance, updates, and technical support
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensingCosts">Licensing & Subscription Costs (Annual)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="licensingCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.licensingCosts}
                    onChange={(e) => handleChange("licensingCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Recurring costs for software licenses and subscriptions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="securityCosts">Security & Compliance Costs (Annual)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="securityCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.securityCosts}
                    onChange={(e) => handleChange("securityCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Costs for ensuring security and regulatory compliance</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherCosts">Other Recurring Costs</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="otherCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.otherCosts}
                    onChange={(e) => handleChange("otherCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Any other recurring costs not covered above</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Total Implementation Costs</h3>
            <div className="text-xl font-bold">${calculateTotalCost()}</div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            This total includes both one-time and recurring costs. Recurring costs are calculated for one year.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

