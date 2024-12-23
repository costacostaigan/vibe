import { Metadata } from "next"

import { Montserrat, Playfair_Display } from "next/font/google"
import { getLocale, getMessages } from "next-intl/server"

import { NextIntlClientProvider } from "next-intl"

import "styles/globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: "swap"
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: "swap"
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL)
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale()

  const messages = await getMessages()

  return (
    <html lang={locale} data-mode="light" className={`${montserrat.variable} ${playfair.variable}`}>
    <body>
    <main className="relative flex flex-col gap-16 md:gap-24 lg:gap-32">
      <NextIntlClientProvider messages={messages}>
        {props.children}
      </NextIntlClientProvider>
    </main>
    </body>
    </html>
  )
}
