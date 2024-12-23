import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { HandleSplit } from "@lib/i18n/message"

export default async function ProductPreview({
                                               productPreview,
                                               region,
                                               imageClassName,
                                               aClassName,
                                               divClassName
                                             }: {
  productPreview: ProductPreviewType
  region: Region,
  imageClassName?: string
  aClassName?: string
  divClassName?: string
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region
  })

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className={`group ${aClassName}`}
    >
      <div data-testid="product-wrapper" className={`relative pb-9 ${divClassName}`}>
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          isFeatured={productPreview.isFeatured}
          size="full"
          className={imageClassName}
        />
        <div
          className="absolute right-0 left-9 bottom-0 bg-glass z-40 p-6 pb-9 text-white flex items-center justify-between">
          <h4 className="font-medium">
            <HandleSplit text={productPreview.title}/>
          </h4>

          <div className="flex items-center gap-x-2 font-medium">
            {cheapestPrice && <PreviewPrice price={cheapestPrice}/>}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
