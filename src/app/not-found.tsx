import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <AlertTriangle className="h-16 w-16 text-primary" />
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-4">
        <Button asChild>
          <Link href="/dashboard">Go back to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/feedback">Contact support</Link>
        </Button>
      </div>
    </div>
  )
}
