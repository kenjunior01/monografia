import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MonografiaPlus - Monografias Acadêmicas Personalizadas",
  description:
    "Plataforma líder em monografias acadêmicas sob medida com qualidade garantida e normas específicas por país e instituição.",
  generator: 'v0.dev',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MonografiaPlus'
  },
  icons: {
    apple: '/placeholder-logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MonografiaPlus" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <link rel="icon" type="image/png" href="/placeholder-logo.png" />
      </head>
      <body className={`${inter.className} mobile-text-size-adjust mobile-tap-highlight`}>
        {children}
      </body>
    </html>
  )
}
