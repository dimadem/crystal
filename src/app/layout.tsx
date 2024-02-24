import "./globals.css";

import React from "react";

import { cn } from "@/shared/lib/utils";

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
        )}
      >
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
          {children}
        </main>
      </body>
    </html>
  )
}
