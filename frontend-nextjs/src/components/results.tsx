"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText, PieChart, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ResultsProps {
  formData: any
}

export function Results({ formData }: ResultsProps) {
  const { toast } = useToast()
  const [calculatedROI, setCalculatedROI] = useState({
    roi: 0,
    paybackPeriod: 0,
    npv: 0,
    totalCosts: 0,
    totalBenefits: 0,
  })

  useEffect(() => {
    // Calculate ROI based on the simplified form data
    const budget = Number.parseFloat(formData.budget) || 0
    const productivitySavings = Number.parseFloat(formData.productivity_savings) || 0
    const riskReduction = Number.parseFloat(formData.risk_reduction) || 0

    // Additional costs
    const managementResources = Number.parseFloat(formData.management_resources) || 0
    const trainingCosts = Number.parseFloat(formData.training_costs) || 0
    const communicationCosts = Number.parseFloat(formData.communication_costs) || 0
    const financialRisks = Number.parseFloat(formData.financial_risks) || 0

    // Total costs and benefits
    const totalCosts = budget + managementResources + trainingCosts + communicationCosts
    const totalBenefits = productivitySavings + riskReduction

    // Calculate ROI
    const roi = totalCosts > 0 ? ((totalBenefits - totalCosts) / totalCosts) * 100 : 0

    // Calculate payback period (in years)
    const paybackPeriod = totalBenefits > 0 ? totalCosts / totalBenefits : 0

    // Calculate NPV (simplified)
    const discountRate = 0.1 // 10%
    const evaluationPeriod = 3 // Default to 3 years

    const calculateNPV = (benefits: number, costs: number, years: number, rate: number) => {
      let npv = -costs // Initial investment
      for (let i = 1; i <= years; i++) {
        npv += benefits / Math.pow(1 + rate, i)
      }
      return npv
    }

    const npv = calculateNPV(totalBenefits, totalCosts, evaluationPeriod, discountRate)

    setCalculatedROI({
      roi,
      paybackPeriod,
      npv,
      totalCosts,
      totalBenefits,
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
    toast({
      title: "Export Report",
      description: "Report export functionality would be implemented here",
    })
  }

  const handleSubmitData = async () => {
    try {
      // Prepare data for submission - only include fields with values
      const dataToSubmit: Record<string, any> = {}

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          // Convert string numbers to actual numbers
          if (!isNaN(Number(value)) && typeof value === "string") {
            dataToSubmit[key] = Number(value)
          } else {
            dataToSubmit[key] = value
          }
        }
      })

      // Log the data that would be sent
      console.log("Data to submit:", dataToSubmit)

      // In a real application, you would send this data to an API
      const response = await fetch('https://roi-calculator-ezdxh2cjgvg9fvaz.eastus-01.azurewebsites.net/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        throw new Error('Failed to submit data')
      }

      // Show success message
      toast({
        title: "Data Submitted Successfully",
        description: "Your ROI calculation data has been sent.",
      })
    } catch (error) {
      console.error("Error submitting data:", error)
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your data. Please try again.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Analysis Results</CardTitle>
        <CardDescription>Review the calculated return on investment for your AI project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatPercent(calculatedROI.roi)}</div>
              <p className="text-sm text-muted-foreground mt-1">Return on Investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Payback Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatYears(calculatedROI.paybackPeriod)}</div>
              <p className="text-sm text-muted-foreground mt-1">Time to recover investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Net Present Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(calculatedROI.npv)}</div>
              <p className="text-sm text-muted-foreground mt-1">Value of future cash flows</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Project Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Description:</span>
                    <span className="font-medium">
                      {formData.project_info ? formData.project_info.substring(0, 50) + "..." : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employees Affected:</span>
                    <span className="font-medium">{formData.employees || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Duration:</span>
                    <span className="font-medium">{formData.duration_months || "N/A"} months</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Costs:</span>
                    <span className="font-medium">{formatCurrency(calculatedROI.totalCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Benefits:</span>
                    <span className="font-medium">{formatCurrency(calculatedROI.totalBenefits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Benefit:</span>
                    <span className="font-medium">
                      {formatCurrency(calculatedROI.totalBenefits - calculatedROI.totalCosts)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="space-y-6 pt-4">
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
          <Button variant="default" className="gap-2 ml-auto" onClick={handleSubmitData}>
            <Send className="h-4 w-4" />
            Submit Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

