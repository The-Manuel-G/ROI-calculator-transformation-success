"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText, PieChart, BarChart, LineChart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResultsProps {
  formData: any
}

export function Results({ formData }: ResultsProps) {
  const [scenario, setScenario] = useState("realistic")
  const [calculatedROI, setCalculatedROI] = useState({
    realistic: {
      roi: 0,
      paybackPeriod: 0,
      npv: 0,
      totalCosts: 0,
      totalBenefits: 0,
    },
    optimistic: {
      roi: 0,
      paybackPeriod: 0,
      npv: 0,
      totalCosts: 0,
      totalBenefits: 0,
    },
    pessimistic: {
      roi: 0,
      paybackPeriod: 0,
      npv: 0,
      totalCosts: 0,
      totalBenefits: 0,
    },
  })

  useEffect(() => {
    // This would be a more complex calculation in a real application
    // For demonstration purposes, we'll use simplified calculations

    // Extract values from formData
    const implementationCosts =
      Number.parseFloat(formData.implementationCosts?.softwareCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.hardwareCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.dataCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.developmentCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.consultingCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.infrastructureCosts || 0)

    const recurringCosts =
      Number.parseFloat(formData.implementationCosts?.maintenanceCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.licensingCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.securityCosts || 0) +
      Number.parseFloat(formData.implementationCosts?.otherCosts || 0)

    const changeManagementCosts =
      Number.parseFloat(formData.changeManagement?.communicationCosts || 0) +
      Number.parseFloat(formData.changeManagement?.trainingCosts || 0) +
      Number.parseFloat(formData.changeManagement?.restructuringCosts || 0)

    const costReduction = Number.parseFloat(formData.expectedGains?.costReduction || 0)
    const revenueIncrease = Number.parseFloat(formData.expectedGains?.revenueIncrease || 0)
    const monetizedIntangibles = Number.parseFloat(formData.optionalFactors?.monetizedIntangibles || 0)

    // Calculate total costs and benefits
    const totalCosts = implementationCosts + recurringCosts + changeManagementCosts
    const totalBenefits = costReduction + revenueIncrease + monetizedIntangibles

    // Calculate ROI for different scenarios
    const realisticROI = totalCosts > 0 ? ((totalBenefits - totalCosts) / totalCosts) * 100 : 0
    const optimisticROI = totalCosts > 0 ? ((totalBenefits * 1.2 - totalCosts * 0.9) / totalCosts) * 100 : 0
    const pessimisticROI = totalCosts > 0 ? ((totalBenefits * 0.8 - totalCosts * 1.1) / totalCosts) * 100 : 0

    // Calculate payback period (in years)
    const realisticPayback = totalBenefits > 0 ? totalCosts / totalBenefits : 0
    const optimisticPayback = totalBenefits > 0 ? (totalCosts * 0.9) / (totalBenefits * 1.2) : 0
    const pessimisticPayback = totalBenefits > 0 ? (totalCosts * 1.1) / (totalBenefits * 0.8) : 0

    // Calculate NPV (simplified)
    const discountRate = 0.1 // 10%
    const evaluationPeriod = Number.parseInt(formData.timeline?.roiEvaluationPeriod || "3")

    const calculateNPV = (benefits: number, costs: number, years: number, rate: number) => {
      let npv = -costs // Initial investment
      for (let i = 1; i <= years; i++) {
        npv += benefits / Math.pow(1 + rate, i)
      }
      return npv
    }

    const realisticNPV = calculateNPV(totalBenefits, totalCosts, evaluationPeriod, discountRate)
    const optimisticNPV = calculateNPV(totalBenefits * 1.2, totalCosts * 0.9, evaluationPeriod, discountRate)
    const pessimisticNPV = calculateNPV(totalBenefits * 0.8, totalCosts * 1.1, evaluationPeriod, discountRate)

    setCalculatedROI({
      realistic: {
        roi: realisticROI,
        paybackPeriod: realisticPayback,
        npv: realisticNPV,
        totalCosts: totalCosts,
        totalBenefits: totalBenefits,
      },
      optimistic: {
        roi: optimisticROI,
        paybackPeriod: optimisticPayback,
        npv: optimisticNPV,
        totalCosts: totalCosts * 0.9,
        totalBenefits: totalBenefits * 1.2,
      },
      pessimistic: {
        roi: pessimisticROI,
        paybackPeriod: pessimisticPayback,
        npv: pessimisticNPV,
        totalCosts: totalCosts * 1.1,
        totalBenefits: totalBenefits * 0.8,
      },
    })
  }, [formData])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const formatYears = (value: number) => {
    return `${value.toFixed(2)} years`
  }

  const handleExportReport = () => {
    // In a real application, this would generate a PDF or Excel report
    alert("Report export functionality would be implemented here")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Analysis Results</CardTitle>
        <CardDescription>Review the calculated return on investment for your AI project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Scenario Analysis</h3>
            <p className="text-sm text-muted-foreground">Compare different scenarios based on varying assumptions</p>
          </div>
          <Select value={scenario} onValueChange={setScenario}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="optimistic">Optimistic</SelectItem>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="pessimistic">Pessimistic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatPercent(calculatedROI[scenario as keyof typeof calculatedROI].roi)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Return on Investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Payback Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatYears(calculatedROI[scenario as keyof typeof calculatedROI].paybackPeriod)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Time to recover investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Net Present Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(calculatedROI[scenario as keyof typeof calculatedROI].npv)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Value of future cash flows</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="costs-benefits">Costs & Benefits</TabsTrigger>
            <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Project Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Name:</span>
                    <span className="font-medium">{formData.project?.projectName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">{formData.project?.department || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Evaluation Period:</span>
                    <span className="font-medium">
                      {formData.timeline?.roiEvaluationPeriod || "N/A"} {formData.timeline?.roiEvaluationUnit || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Costs:</span>
                    <span className="font-medium">
                      {formatCurrency(calculatedROI[scenario as keyof typeof calculatedROI].totalCosts)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Benefits:</span>
                    <span className="font-medium">
                      {formatCurrency(calculatedROI[scenario as keyof typeof calculatedROI].totalBenefits)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Benefit:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        calculatedROI[scenario as keyof typeof calculatedROI].totalBenefits -
                          calculatedROI[scenario as keyof typeof calculatedROI].totalCosts,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">ROI Breakdown Chart</p>
                <p className="text-xs text-muted-foreground">
                  (Visualization would be rendered here in a real application)
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costs-benefits" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cost Breakdown</h3>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">(Cost breakdown chart would be displayed here)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Implementation Costs:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        Number.parseFloat(formData.implementationCosts?.softwareCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.hardwareCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.dataCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.developmentCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.consultingCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.infrastructureCosts || 0),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recurring Costs:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        Number.parseFloat(formData.implementationCosts?.maintenanceCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.licensingCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.securityCosts || 0) +
                          Number.parseFloat(formData.implementationCosts?.otherCosts || 0),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Change Management:</span>
                    <span className="font-medium">
                      {formatCurrency(
                        Number.parseFloat(formData.changeManagement?.communicationCosts || 0) +
                          Number.parseFloat(formData.changeManagement?.trainingCosts || 0) +
                          Number.parseFloat(formData.changeManagement?.restructuringCosts || 0),
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Benefit Breakdown</h3>
                <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">(Benefit breakdown chart would be displayed here)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Reduction:</span>
                    <span className="font-medium">
                      {formatCurrency(Number.parseFloat(formData.expectedGains?.costReduction || 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue Increase:</span>
                    <span className="font-medium">
                      {formatCurrency(Number.parseFloat(formData.expectedGains?.revenueIncrease || 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Intangible Benefits:</span>
                    <span className="font-medium">
                      {formatCurrency(Number.parseFloat(formData.optionalFactors?.monetizedIntangibles || 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sensitivity" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sensitivity Analysis</h3>
              <p className="text-sm text-muted-foreground">
                This analysis shows how changes in key variables affect the ROI of your AI project.
              </p>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Sensitivity Analysis Chart</p>
                  <p className="text-xs text-muted-foreground">
                    (Visualization would be rendered here in a real application)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Factors Affecting ROI</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-sm">Adoption Rate: High impact on benefits realization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Implementation Timeline: Affects when benefits begin to materialize</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Efficiency Gains: Direct impact on cost reduction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Change Management: Influences adoption and productivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Regulatory Compliance: Can significantly impact costs</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Based on your inputs and our analysis, here are recommendations to maximize your AI ROI:
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Focus on Change Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Your adoption rate significantly impacts ROI. Invest in comprehensive change management to ensure
                    successful adoption.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Consider Phased Implementation</h4>
                  <p className="text-sm text-muted-foreground">
                    A phased approach can help realize benefits earlier and reduce implementation risks.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Monitor Regulatory Developments</h4>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about regulatory changes that could impact your AI implementation and compliance
                    costs.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Measure and Track Intangible Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    Develop metrics to track intangible benefits, which can significantly contribute to overall ROI.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button className="gap-2" onClick={handleExportReport}>
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Save Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

