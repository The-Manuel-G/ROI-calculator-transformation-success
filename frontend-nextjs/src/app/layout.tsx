import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ROI Calculator</title>
        <meta name="description" content="Calculate and analyze return on investment for your projects" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  )
}

