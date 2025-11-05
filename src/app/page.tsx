import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Box, Library, LogIn } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Box className="h-6 w-6" />
          <span className="sr-only">Xietee</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="outline" asChild>
            <Link href="/login">
              Login
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Secure Your Supply Chain with Xietee
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Leverage blockchain technology for transparent, verifiable, and
                  tamper-proof product tracking from source to consumer.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
                 <Button variant="secondary" asChild>
                  <Link href="/register-organization">
                    <Library className="mr-2 h-4 w-4" />
                    Register Organisation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Xietee. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
