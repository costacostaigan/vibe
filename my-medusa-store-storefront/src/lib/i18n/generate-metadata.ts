import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadataIntl(name: string): Promise<Metadata> {
  const t = await getTranslations(`meta.${name}`)

  return ({
    title: t('title'),
    description: t('description')
  })
}
