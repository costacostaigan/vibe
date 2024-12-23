import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HandleSplit } from "@lib/i18n/message"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            <HandleSplit text={product.collection.title}/>
          </LocalizedClientLink>
        )}
        <h2 className="font-light uppercase text-6xl mb-3" data-testid="product-title">
          <HandleSplit text={product.title}/>
        </h2>

        <Text className="text-medium text-ui-fg-subtle" data-testid="product-description">
          <HandleSplit text={product.description}/>
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
