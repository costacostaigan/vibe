import { getRequestConfig } from 'next-intl/server'
import { cookies } from "next/headers"
import { defaultLocale, locales } from "@lib/i18n/locales"

export default getRequestConfig(async () => {
  let locale = cookies().get('USER_LOCALE')?.value

  if (!locale || !locales.includes(locale))
    locale = defaultLocale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
