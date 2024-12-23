import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProductByHandle, getProductsList, getRegion, listRegions, retrievePricedProductById } from "@lib/data"
import { Region } from "@medusajs/medusa"
import ProductTemplate from "@modules/products/templates"
import { getLocale } from "next-intl/server"
import { locales } from "@lib/i18n/locales"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions) =>
    regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params

  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product) {
    notFound()
  }

  const locale = await getLocale()

  let title = product.title?.split('|') as string[] | string | undefined
  if (title)
    if (title.length < 2)
      title = title[0]
    else
      title = title[locales.findIndex(_locale => _locale === locale) ?? 0]

  return {
    title: `${title} | Vibe`,
    description: `${title}`,
    openGraph: {
      title: `${title} | Vube`,
      description: `${title}`,
      images: product.thumbnail ? [product.thumbnail] : []
    }
  }
}

const getPricedProductByHandle = async (handle: string, region: Region) => {
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id
  })

  return pricedProduct
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getPricedProductByHandle(params.handle, region)

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
