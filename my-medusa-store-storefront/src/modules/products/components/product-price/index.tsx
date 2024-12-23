import { PricedProduct, PricedVariant } from "@medusajs/medusa/dist/types/pricing"
import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { RegionInfo } from "types/global"
import { Message } from "@lib/i18n/message"
import React from "react"

export default function ProductPrice({
                                       product,
                                       variant,
                                       region
                                     }: {
  product: PricedProduct
  variant?: PricedVariant
  region: RegionInfo
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse"/>
  }

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx("text-xl-semi !font-light", {
          "text-yellow-400": selectedPrice.price_type === "sale"
        })}
      >
        {!variant && <>
          <Message name="modules.common.product.from_price"/>{' '}
        </>}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-ui-fg-subtle">
              <Message name="modules.layout.cart.original"/>:
            </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-yellow-400">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
