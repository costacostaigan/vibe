'use client'

import { TranslationValues, useLocale, useTranslations } from "next-intl"
import { locales } from "@lib/i18n/locales"

export function Message({ name, args }: { name: string, args?: TranslationValues }) {
  const splitted = name.split('.')

  return <>{useTranslations(splitted.slice(0, -1).join('.'))(splitted.pop(), args)}</>
}

export function HandleSplit({ text }: { text?: string | null }) {
  const locale = useLocale()

  if (!text)
    return null

  const splitted = text.split('|')

  if (splitted.length < 2)
    return <>{text}</>

  return <>{splitted[locales.findIndex(_locale => _locale === locale) ?? 0].trim()}</>
}
