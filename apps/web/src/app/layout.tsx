import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@csanwel/ui";
import { ThemeProvider, ThemeToggle } from "@csanwel/ui/theme";
import { Toaster } from "@csanwel/ui/toast";

import { env } from "~/env";

import "~/app/globals.css";

import { PWA } from "./_components/PWA";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Karate rules questions",
  description: "A site for karate rules questions",
  openGraph: {
    title: "Karate rules questions",
    description: "A site for karate rules questions",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Karate rules questions",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {props.children}

          <PWA />
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
