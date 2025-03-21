"use client";

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, PieChart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/loader";

interface ResultsProps {
  formData: any;
}

export function Results({ formData }: ResultsProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [calculatedROI, setCalculatedROI] = useState({
    roi: 0,
    paybackPeriod: 0,
    npv: 0,
    totalCosts: 0,
    totalBenefits: 0,
    successProbability: 0,
    recommendation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Construir el cuerpo de la solicitud basado en formData
        const requestBody = {
          budget: Number(formData.budget),
          duration_months: Number(formData.duration_months),
          employees: Number(formData.employees),
          management_resources: Number(formData.management_resources),
          training_costs: Number(formData.training_costs),
          communication_costs: Number(formData.communication_costs),
          adoption_speed_months: Number(formData.adoption_speed_months),
          employee_competence_percent: Number(
            formData.employee_competence_percent
          ),
          utilization_percent: Number(formData.utilization_percent),
          financial_risks: Number(formData.financial_risks),
          productivity_savings: Number(formData.productivity_savings),
          risk_reduction: Number(formData.risk_reduction),
          project_info: formData.project_info,
        };

        console.log("Request Body:", requestBody); // Para depuración

        const response = await fetch(
          "https://roi-calculator-ezdxh2cjgvg9fvaz.eastus-01.azurewebsites.net/data",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          console.error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        console.log("API Response:", responseData);

        // Actualizar el estado con los datos procesados
        setCalculatedROI({
          roi: responseData.processed_data.roi_percent || 0,
          paybackPeriod: formData.duration_months || 0, // Puedes calcularlo si es necesario
          npv: responseData.processed_data.employee_demotion_percent || 0,
          totalCosts:
            Number(formData.budget) +
            Number(formData.management_resources) +
            Number(formData.training_costs) +
            Number(formData.communication_costs),
          totalBenefits:
            Number(formData.productivity_savings) +
            Number(formData.risk_reduction),
          successProbability:
            responseData.processed_data.success_probability_percent || 0,
          recommendation:
            responseData.processed_data.recommendation ||
            "No recommendations available.",
        });
      } catch (error) {
        console.error(
          "Error fetching data:",
          error instanceof Error ? error.message : String(error)
        );
        toast({
          variant: "destructive",
          title: "Error",
          description: `Could not fetch data from API. ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Analysis Results</CardTitle>
        <CardDescription>
          Review the results from the API response.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
          <Card>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                <Card className="flex flex-col h-full bg-gradient-to-bl from-white via-gray-100 to-white dark:from-blue-600 dark:via-zinc-950 dark:to-black shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Return of Investment
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="text-3xl font-bold">
                    {calculatedROI.roi.toFixed(2)}%
                  </div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col h-full bg-gradient-to-bl from-white via-gray-100 to-white dark:from-blue-600 dark:via-zinc-950 dark:to-black shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Success Probability
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="text-3xl font-bold">
                    {calculatedROI.successProbability.toFixed(2)}%
                  </div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col h-full bg-gradient-to-bl from-white via-gray-100 to-white dark:from-blue-600 dark:via-zinc-950 dark:to-black shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Employee Demotion Risk
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="text-3xl font-bold">
                    {(calculatedROI.npv * 100).toFixed(2)}%
                  </div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col h-full bg-gradient-to-bl from-white via-gray-100 to-white dark:from-blue-600 dark:via-zinc-950 dark:to-black shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Total Costs
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="text-3xl font-bold">
                    ${calculatedROI.totalCosts.toLocaleString()}
                  </div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col h-full bg-gradient-to-bl from-white via-gray-100 to-white dark:from-blue-600 dark:via-zinc-950 dark:to-black shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Total Benefits
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="text-3xl font-bold">
                    ${calculatedROI.totalBenefits.toLocaleString()}
                  </div>
                  </CardContent>
                </Card>
                </div>

              <Tabs
                defaultValue="recommendation"
                className="w-full text-center"
              >
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="recommendation">
                    AI Recommendation
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="recommendation" className="space-y-6 pt-4">
                  <div className="p-4 border rounded-md bg-muted">
                    <h3 className="text-lg font-medium">Recommendations</h3>
                    <div className="prose max-w-none text-justify">
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold mt-6 border-b pb-2"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-2xl font-semibold mt-4"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-2xl font-semibold mt-4"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mt-2 leading-relaxed" {...props} />
                          ),
                        }}
                      >
                        {calculatedROI.recommendation ||
                          "No recommendations available."}
                      </ReactMarkdown>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
