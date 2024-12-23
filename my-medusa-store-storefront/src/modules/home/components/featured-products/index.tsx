import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import { cache } from "react"
import type { ProductCollectionWithPreviews } from "../../../../types/global"
import { Product } from "@medusajs/medusa"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import ProductPreview from "@modules/products/components/product-preview"
import Link from "next/link"
import { Message } from "@lib/i18n/message"

export default async function FeaturedProducts({ countryCode }: { countryCode: string }) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region)
    return null

  return <section className="content-container">
    <h1 className="font-light mb-12 uppercase text-3xl lg:text-6xl">
      <Message name="modules.featured_products.popular" />
    </h1>

    <div className="-mx-6 relative">
      {collections.map((collection) => <>
        <ProductRail key={collection.id}>
          {collection.products?.map((product, index) => (
            <ProductPreview
              key={product.id}
              productPreview={product}
              region={region}
              imageClassName="aspect-auto h-full flex-1"
              aClassName="h-full block"
              divClassName="h-full flex flex-col"
            />
          ))}
        </ProductRail>
        <Link href={`/collections/${collection.handle}`}
              className="block absolute left-6 bottom-0 w-[calc(100%-3rem)] md:max-w-sm md:w-[30%] mb-9 button">
          <Message name="modules.featured_products.all" />
        </Link>
      </>)}
    </div>
  </section>
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)
