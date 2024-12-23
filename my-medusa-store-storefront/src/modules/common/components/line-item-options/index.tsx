import { ProductVariant } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import { HandleSplit, Message } from "@lib/i18n/message"

type LineItemOptionsProps = {
  variant: ProductVariant
  'data-testid'?: string
  'data-value'?: ProductVariant
}

const LineItemOptions = ({ variant, 'data-testid': dataTestid, 'data-value': dataValue }: LineItemOptionsProps) => {
  return (
    <Text data-testid={dataTestid} data-value={dataValue} className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis">
      <Message name="modules.layout.cart.variant"/>{': '}
      <HandleSplit text={variant.title} />
    </Text>
  )
}

export default LineItemOptions
