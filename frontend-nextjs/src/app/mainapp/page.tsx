"use client"

import { useState, useEffect } from "react"
import Calculator from "../calculator/page"
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

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
      setShowResults(true)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    setMessages([...messages, { role: "user", content: inputMessage }])
    setInputMessage("")

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
    <div className="flex bg-background">
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
              <Separator className="my-2" />
              <h3 className="text-sm font-medium mb-2">Older Conversations</h3>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

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

          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6" defaultValue="calculator-production">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="calculator-production" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                AI InputData
              </TabsTrigger>
            </TabsList>

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

