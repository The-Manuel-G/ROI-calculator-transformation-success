import Link from "next/link"
import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <Link
            href="https://github.com/amanesoft"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Amane Soft, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
