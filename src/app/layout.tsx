import "./globals.css";

import React from "react";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/shared/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
          {children}
        </main>
      </body>
    </html>
  )
}
