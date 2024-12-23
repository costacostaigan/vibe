'use server'

import { cookies } from "next/headers"
import { locales } from "@lib/i18n/locales"

export async function changeLanguage(locale: string) {
  if (locales.includes(locale))
    cookies().set('USER_LOCALE', locale)
}
