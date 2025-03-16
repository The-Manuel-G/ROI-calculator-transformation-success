"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OptionalFactorsProps {
  data: any
  updateData: (data: any) => void
}

export function OptionalFactors({ data, updateData }: OptionalFactorsProps) {
  const [formValues, setFormValues] = useState({
    employeeEngagementData: data.employeeEngagementData || "",
    riskFactors: data.riskFactors || [],
    mitigationCosts: data.mitigationCosts || "",
    complianceCosts: data.complianceCosts || "",
    complianceSavings: data.complianceSavings || "",
    intangibleBenefits: data.intangibleBenefits || "",
    monetizedIntangibles: data.monetizedIntangibles || "",
  })

  const regulatoryChallenges = [
    { id: "change-management", label: "Gestión del Cambio" },
    { id: "credit-risk", label: "Riesgo de Crédito y Cambio de LIBOR" },
    { id: "climate-esg", label: "Clima y ESG" },
    { id: "risk-management", label: "Gestión del Riesgo Central" },
    { id: "cybersecurity", label: "Resiliencia Operacional y Ciberseguridad" },
    { id: "compliance", label: "Riesgo de Cumplimiento" },
    { id: "fraud", label: "Fraude y Delitos Financieros" },
    { id: "consumer-protection", label: "Protección al Consumidor/Inversor" },
    { id: "payments", label: "Pagos" },
    { id: "regulatory-authority", label: "Expansión de la Autoridad Regulatoria" },
  ]

  useEffect(() => {
    updateData(formValues)
  }, [formValues, updateData])

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRiskFactorChange = (id: string, checked: boolean) => {
    if (checked) {
      handleChange("riskFactors", [...formValues.riskFactors, id])
    } else {
      handleChange(
        "riskFactors",
        formValues.riskFactors.filter((item: string) => item !== id),
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optional Factors</CardTitle>
        <CardDescription>Include additional factors that may impact your AI ROI calculation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="employee-engagement" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="employee-engagement">Employee Engagement</TabsTrigger>
            <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="regulatory-compliance">Regulatory Compliance</TabsTrigger>
            <TabsTrigger value="intangible-benefits">Intangible Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="employee-engagement" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="employeeEngagementData">Employee Engagement Metrics</Label>
              <Textarea
                id="employeeEngagementData"
                placeholder="Enter any employee engagement data, such as eNPS scores, satisfaction levels, or feedback related to the change"
                rows={4}
                value={formValues.employeeEngagementData}
                onChange={(e) => handleChange("employeeEngagementData", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Employee engagement is a key factor that can influence the success of AI implementation
              </p>
            </div>
          </TabsContent>

          <TabsContent value="risk-factors" className="space-y-6 pt-4">
            <div className="space-y-4">
              <Label>Regulatory Challenges Relevant to Your Project</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regulatoryChallenges.map((challenge) => (
                  <div key={challenge.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={challenge.id}
                      checked={formValues.riskFactors.includes(challenge.id)}
                      onCheckedChange={(checked) => handleRiskFactorChange(challenge.id, checked as boolean)}
                    />
                    <Label
                      htmlFor={challenge.id}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {challenge.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mitigationCosts">Risk Mitigation Costs</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="mitigationCosts"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={formValues.mitigationCosts}
                  onChange={(e) => handleChange("mitigationCosts", e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Estimated costs for mitigating identified risks</p>
            </div>
          </TabsContent>

          <TabsContent value="regulatory-compliance" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="complianceCosts">Regulatory Compliance Costs</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="complianceCosts"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.complianceCosts}
                    onChange={(e) => handleChange("complianceCosts", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Costs associated with ensuring regulatory compliance of the AI system
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complianceSavings">Compliance-Related Savings</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="complianceSavings"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={formValues.complianceSavings}
                    onChange={(e) => handleChange("complianceSavings", e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Potential savings from improved compliance through AI</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="intangible-benefits" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="intangibleBenefits">Intangible Benefits</Label>
              <Textarea
                id="intangibleBenefits"
                placeholder="Describe qualitative benefits such as improved customer satisfaction, better decision-making, increased innovation, etc."
                rows={4}
                value={formValues.intangibleBenefits}
                onChange={(e) => handleChange("intangibleBenefits", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Intangible benefits can significantly contribute to the overall value of an AI project
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monetizedIntangibles">Monetized Value of Intangible Benefits</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="monetizedIntangibles"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={formValues.monetizedIntangibles}
                  onChange={(e) => handleChange("monetizedIntangibles", e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Estimated monetary value of the intangible benefits (if possible to quantify)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

