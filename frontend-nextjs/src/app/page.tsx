"use client"

import { useState, useEffect } from "react"
import Calculator from "./calculator/page"
import CalculatorProduction from "@/app/calculatorV2/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart,
  ChevronRight,
  DollarSign,
  LineChart,
  Loader2,
  Users,
  Calendar,
  Menu,
  Clock,
  Send,
  Bot,
  Sparkles,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Moon,
  Sun,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { useTheme } from "next-themes"

export default function ROICalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [messages, setMessages] = useState([
    { role: "system", content: "How can I help with your ROI analysis today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [activeTab, setActiveTab] = useState("calculator")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure theme toggle only renders client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCalculate = () => {
    setIsCalculating(true)
    // Simulate calculation time
    setTimeout(() => {
      setIsCalculating(false)
      setShowResults(true)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: inputMessage }])
    setInputMessage("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content:
            "Based on your current ROI analysis, I can see that your project has a strong potential return of 245%. Would you like me to suggest ways to further optimize your resource allocation or mitigate the identified technical complexity risks?",
        },
      ])
    }, 1000)
  }

  interface Message {
    role: "user" | "system";
    content: string;
  }

  const handleQuickPrompt = (prompt: string): void => {
    setMessages([...messages, { role: "user", content: prompt }])
    setActiveTab("assistant")

    // Simulate AI response after a short delay
    setTimeout(() => {
      let response: string = ""

      if (prompt.includes("optimize")) {
        response =
          "To optimize your ROI, consider reallocating 15% of your budget to employee training and implementing a phased rollout approach. This could increase your ROI by an additional 12-18% based on similar projects."
      } else if (prompt.includes("risks")) {
        response =
          "I've analyzed the technical complexity risks in your project. The main concerns are integration with legacy systems and potential timeline delays. I recommend increasing your contingency budget by 10% and scheduling additional technical review milestones."
      } else if (prompt.includes("timeline")) {
        response =
          "Your current timeline of 12 months appears optimistic given the scope. Based on comparable projects, I'd suggest planning for 14-16 months with specific buffer periods after major implementation phases."
      }

      setMessages((prev) => [...prev, { role: "system", content: response }])
    }, 1000)
  }

  return (
    <div className="flex bg-background max-h-max">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">ROI Analysis</h2>
            <p className="text-sm text-muted-foreground">Project insights & history</p>
          </div>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>

        <div className="p-4">
          <Command className="rounded-lg border shadow-sm">
            <CommandInput placeholder="Search history..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Recent Analyses">
                <CommandItem className="cursor-pointer">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Marketing Campaign ROI</span>
                </CommandItem>
                <CommandItem className="cursor-pointer">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>IT Infrastructure Upgrade</span>
                </CommandItem>
                <CommandItem className="cursor-pointer">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Employee Training Program</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-sm font-medium mb-2">Recent Conversations</h3>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Project Analysis #{i}</p>
                    <p className="text-xs text-muted-foreground">
                      {i === 1 ? "Just now" : i === 2 ? "2 hours ago" : `${i} days ago`}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4 z-10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">ROI Analysis</h2>
              <p className="text-sm text-muted-foreground">Project insights & history</p>
            </div>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
          </div>

          <div className="p-4">
            <Command className="rounded-lg border shadow-sm">
              <CommandInput placeholder="Search history..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Recent Analyses">
                  <CommandItem className="cursor-pointer">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Marketing Campaign ROI</span>
                  </CommandItem>
                  <CommandItem className="cursor-pointer">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>IT Infrastructure Upgrade</span>
                  </CommandItem>
                  <CommandItem className="cursor-pointer">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Employee Training Program</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] px-4">
            <h3 className="text-sm font-medium mb-2">Recent Conversations</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Project Analysis #{i}</p>
                    <p className="text-xs text-muted-foreground">
                      {i === 1 ? "Just now" : i === 2 ? "2 hours ago" : `${i} days ago`}
                    </p>
                  </div>
                </div>
              ))}

              <Separator className="my-2" />
              <h3 className="text-sm font-medium mb-2">Older Conversations</h3>

              {[6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Project Analysis #{i}</p>
                    <p className="text-xs text-muted-foreground">{`${i + 10} days ago`}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto py-8 px-4 max-w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">ROI Calculator</h1>
              <p className="text-muted-foreground">Calculate and analyze the return on investment for your project</p>
            </div>
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>

          {/* Main tabs for Calculator and Assistant */}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                ROI Calculator
              </TabsTrigger>
              <TabsTrigger value="assistant" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="form-ai" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Input Data
              </TabsTrigger>
              <TabsTrigger value="calculator-production" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                AI InputData
              </TabsTrigger>
            </TabsList>

              
            <TabsContent value="calculator" className="mt-0 space-y-6">
            <ScrollArea className="h-max w-full">  
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Enter the details of your project to calculate the ROI.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Project Budget</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="budget"
                          placeholder="Enter the total budget in USD"
                          type="number"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employees">Number of Employees Affected</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="employees"
                          placeholder="Number of employees impacted"
                          type="number"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Project Duration</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input id="duration" placeholder="Duration" type="number" className="pl-10" />
                        </div>
                        <Select defaultValue="months">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Potential Risks</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary risk" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financial">Financial Risk</SelectItem>
                          <SelectItem value="timeline">Timeline Delays</SelectItem>
                          <SelectItem value="resistance">Employee Resistance</SelectItem>
                          <SelectItem value="integration">Integration Issues</SelectItem>
                          <SelectItem value="technical">Technical Complexity</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Risk Factors</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="risk1" />
                        <Label htmlFor="risk1" className="text-sm font-normal">
                          Financial Uncertainty
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="risk2" />
                        <Label htmlFor="risk2" className="text-sm font-normal">
                          Resource Constraints
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="risk3" />
                        <Label htmlFor="risk3" className="text-sm font-normal">
                          Market Volatility
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="risk4" />
                        <Label htmlFor="risk4" className="text-sm font-normal">
                          Regulatory Changes
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="button" className="w-full" onClick={handleCalculate} disabled={isCalculating}>
                    {isCalculating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating ROI...
                      </>
                    ) : (
                      "Calculate ROI"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {showResults && (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5" />
                      ROI Analysis Results
                    </CardTitle>
                    <CardDescription>Based on your inputs, here's the projected return on investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <BarChart className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">ROI Chart Visualization</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-lg">ROI</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold text-primary">245%</p>
                          <p className="text-sm text-muted-foreground">Projected return</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-lg">Payback Period</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">
                            4.2 <span className="text-lg">months</span>
                          </p>
                          <p className="text-sm text-muted-foreground">Time to break even</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-lg">Net Benefit</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">$124,500</p>
                          <p className="text-sm text-muted-foreground">Total projected savings</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <Tabs defaultValue="insights">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="insights">Predictive Insights</TabsTrigger>
                      <TabsTrigger value="recommendations">Actionable Recommendations</TabsTrigger>
                      <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="insights">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            <LineChart className="inline-block mr-2 h-5 w-5" />
                            Predictive Insights
                          </CardTitle>
                          <CardDescription>AI-powered analysis of your project's potential outcomes</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                              <AccordionTrigger>Cost Reduction Potential</AccordionTrigger>
                              <AccordionContent>
                                <p className="mb-2">
                                  Based on your project parameters, we predict a 32% reduction in operational costs over
                                  the next 12 months.
                                </p>
                                <div className="h-8 w-full bg-primary/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary w-[32%] rounded-full"></div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                              <AccordionTrigger>Productivity Impact</AccordionTrigger>
                              <AccordionContent>
                                <p className="mb-2">
                                  Employee productivity is projected to increase by 28% within the first 6 months of
                                  implementation.
                                </p>
                                <div className="h-8 w-full bg-primary/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary w-[28%] rounded-full"></div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                              <AccordionTrigger>Risk Assessment</AccordionTrigger>
                              <AccordionContent>
                                <p>
                                  This project has a low risk profile with a 92% probability of meeting or exceeding ROI
                                  targets.
                                </p>
                                <ul className="mt-2 space-y-1">
                                  <li className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                                    Implementation complexity: Low
                                  </li>
                                  <li className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                                    Market volatility impact: Minimal
                                  </li>
                                  <li className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                                    Resource allocation risk: Low
                                  </li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="recommendations">
                      <Card>
                        <CardHeader>
                          <CardTitle>Actionable Recommendations</CardTitle>
                          <CardDescription>Strategic steps to maximize your project's ROI</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="rec-1">
                              <AccordionTrigger>Resource Optimization</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                    <div>
                                      <p className="font-medium">
                                        Reallocate 15% of project budget to employee training
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        This will accelerate adoption and reduce implementation time by an estimated 3
                                        weeks.
                                      </p>
                                    </div>
                                  </li>
                                  <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                    <div>
                                      <p className="font-medium">Implement phased rollout approach</p>
                                      <p className="text-sm text-muted-foreground">
                                        Starting with core teams will provide early feedback and allow for adjustments.
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="rec-2">
                              <AccordionTrigger>Process Improvements</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                    <div>
                                      <p className="font-medium">Automate 3 key workflow processes</p>
                                      <p className="text-sm text-muted-foreground">
                                        Automation of these processes will reduce manual work by 42% and improve
                                        accuracy.
                                      </p>
                                    </div>
                                  </li>
                                  <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                    <div>
                                      <p className="font-medium">Implement bi-weekly progress tracking</p>
                                      <p className="text-sm text-muted-foreground">
                                        Regular monitoring will help identify bottlenecks early and keep the project on
                                        track.
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="rec-3">
                              <AccordionTrigger>Strategic Partnerships</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                    <div>
                                      <p className="font-medium">Engage with technology vendors for custom solutions</p>
                                      <p className="text-sm text-muted-foreground">
                                        Negotiating custom integrations can reduce implementation costs by up to 18%.
                                      </p>
                                    </div>
                                  </li>
                                  <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                    <div>
                                      <p className="font-medium">Consider industry consortium participation</p>
                                      <p className="text-sm text-muted-foreground">
                                        Sharing best practices with industry peers can accelerate learning and
                                        innovation.
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="ai-analysis">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Sparkles className="mr-2 h-5 w-5" />
                            AI Analysis & Recommendations
                          </CardTitle>
                          <CardDescription>
                            Advanced AI insights based on your project parameters and industry benchmarks
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <h3 className="text-lg font-medium">Project Potential Assessment</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
                                  <CardHeader className="py-3">
                                    <CardTitle className="text-sm flex items-center text-green-700 dark:text-green-400">
                                      <CheckCircle2 className="h-4 w-4 mr-1" />
                                      Excellent Potential
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="py-2">
                                    <p className="text-xs text-green-700 dark:text-green-400">
                                      Cost reduction strategy has 87% success probability based on similar industry
                                      cases
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
                                  <CardHeader className="py-3">
                                    <CardTitle className="text-sm flex items-center text-yellow-700 dark:text-yellow-400">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      Risk Factors
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="py-2">
                                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                                      Technical complexity may extend timeline by 15-20% without proper planning
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                                  <CardHeader className="py-3">
                                    <CardTitle className="text-sm flex items-center text-red-700 dark:text-red-400">
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Potential Pitfalls
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="py-2">
                                    <p className="text-xs text-red-700 dark:text-red-400">
                                      Employee resistance could reduce adoption by 35% if change management is not
                                      properly implemented
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h3 className="text-lg font-medium">AI-Powered Optimization Strategies</h3>
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="ai-1">
                                  <AccordionTrigger>
                                    <span className="flex items-center">
                                      <Zap className="h-4 w-4 mr-2 text-amber-500" />
                                      Budget Optimization
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="space-y-3">
                                      <p>Our AI analysis suggests the following budget optimizations:</p>
                                      <ul className="space-y-2">
                                        <li className="flex items-start">
                                          <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                          <div>
                                            <p className="font-medium">Reduce contingency from 15% to 10%</p>
                                            <p className="text-sm text-muted-foreground">
                                              Historical data shows this project type typically requires less buffer
                                            </p>
                                          </div>
                                        </li>
                                        <li className="flex items-start">
                                          <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                          <div>
                                            <p className="font-medium">Increase training allocation by 8%</p>
                                            <p className="text-sm text-muted-foreground">
                                              This will accelerate adoption and reduce long-term support costs
                                            </p>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="ai-2">
                                  <AccordionTrigger>
                                    <span className="flex items-center">
                                      <Zap className="h-4 w-4 mr-2 text-amber-500" />
                                      Timeline Optimization
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="space-y-3">
                                      <p>Based on 250+ similar projects, our AI recommends:</p>
                                      <ul className="space-y-2">
                                        <li className="flex items-start">
                                          <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                          <div>
                                            <p className="font-medium">Front-load technical integration tasks</p>
                                            <p className="text-sm text-muted-foreground">
                                              Addressing technical complexity early reduces overall project risk by 42%
                                            </p>
                                          </div>
                                        </li>
                                        <li className="flex items-start">
                                          <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                          <div>
                                            <p className="font-medium">Implement parallel workstreams</p>
                                            <p className="text-sm text-muted-foreground">
                                              Running 3 key components in parallel can reduce timeline by 22%
                                            </p>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="ai-3">
                                  <AccordionTrigger>
                                    <span className="flex items-center">
                                      <Zap className="h-4 w-4 mr-2 text-amber-500" />
                                      Risk Mitigation Strategies
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="space-y-3">
                                      <p>Our AI has identified these key risk mitigation strategies:</p>
                                      <ul className="space-y-2">
                                        <li className="flex items-start">
                                          <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                          <div>
                                            <p className="font-medium">
                                              Implement early stakeholder engagement program
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                              Reduces employee resistance by up to 65% based on change management data
                                            </p>
                                          </div>
                                        </li>
                                        <li className="flex items-start">
                                          <ChevronRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                                          <div>
                                            <p className="font-medium">Create technical sandbox environment</p>
                                            <p className="text-sm text-muted-foreground">
                                              Early testing reduces integration issues by 78% in similar projects
                                            </p>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start">
                          <p className="text-sm text-muted-foreground mb-3">
                            Ask our AI assistant for more detailed analysis
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-primary/10"
                              onClick={() => handleQuickPrompt("How can I optimize my ROI further?")}
                            >
                              How can I optimize my ROI further?
                            </Badge>
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-primary/10"
                              onClick={() => handleQuickPrompt("What are the biggest risks in my project?")}
                            >
                              What are the biggest risks in my project?
                            </Badge>
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-primary/10"
                              onClick={() => handleQuickPrompt("Is my timeline realistic?")}
                            >
                              Is my timeline realistic?
                            </Badge>
                          </div>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
            </ScrollArea>
          </TabsContent>
          

            <TabsContent value="assistant" className="mt-0">
            <Card className="h-[calc(100vh-220px)] flex flex-col">
              <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                ROI Analysis Assistant
              </CardTitle>
              <CardDescription>Ask questions about your project analysis</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.role === "system" && (
                    <div className="flex items-center mb-1">
                      <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">ROI Assistant</span>
                    </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
              </CardContent>

              <div className="px-6">
              <h3 className="text-lg font-medium mb-3 text-center">Suggested Questions</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("How can I optimize my ROI further?")}
                >
                How can I optimize my ROI further?
                </Badge>
                <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("What are the biggest risks in my project?")}
                >
                What are the biggest risks in my project?
                </Badge>
                <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("Is my timeline realistic?")}
                >
                Is my timeline realistic?
                </Badge>
                <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("How does my ROI compare to industry benchmarks?")}
                >
                How does my ROI compare to industry benchmarks?
                </Badge>
                <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("What are the key success factors for this project?")}
                >
                What are the key success factors for this project?
                </Badge>
                <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("How can I improve employee adoption?")}
                >
                How can I improve employee adoption?
                </Badge>
              </div>
              </div>

              <CardFooter className="pt-0">
              <form
                className="flex w-full items-center space-x-2"
                onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
                }}
              >
                <Input
                placeholder="Ask about your ROI analysis..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
                </Button>
              </form>
              </CardFooter>
            </Card>
            </TabsContent>
            <TabsContent value="form-ai" className="mt-0 space-y-6">
              <Calculator/>
            </TabsContent>
            <TabsContent value="calculator-production" className="mt-0 space-y-6">
              <CalculatorProduction/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

