import { clx, Text } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <div className="flex gap-3 items-center">
      {price.price_type === "sale" && (
        <Text className="line-through text-ui-fg-muted text-lg" data-testid="original-price">
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-lg", {
          "text-yellow-400": price.price_type === "sale"
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </div>
  )
}
