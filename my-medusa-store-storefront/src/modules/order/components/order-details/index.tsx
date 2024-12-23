import { Order } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import { useTranslations } from "next-intl"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const t = useTranslations('modules.order.completed.details')

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text className="mt-2">
        {t('date')}{' '}<span data-testid="order-date">{new Date(order.created_at).toDateString()}</span>
      </Text>
      <Text className="mt-2 text-yellow-400">
        {t('number')}{' '}<span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {t('status')}{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              {t('payment_status')}{" "}
              <span className="text-ui-fg-subtle " sata-testid="order-payment-status">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
