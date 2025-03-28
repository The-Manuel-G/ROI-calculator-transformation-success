import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import MouseMoveEffect from "@/components/mouse-move-effect"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background text-foreground antialiased">
      <head>
        <title>ROI Calculator</title>
        <meta name="description" content="Calculate and analyze return on investment for your projects" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <MouseMoveEffect />
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  )
}

