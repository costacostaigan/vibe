import OrderOverview from "@modules/account/components/order-overview"
import { listCustomerOrders } from "@lib/data"
import { notFound } from "next/navigation"
import { Message } from "@lib/i18n/message"
import { generateMetadataIntl } from "@lib/i18n/generate-metadata"

export async function generateMetadata() {
  return generateMetadataIntl('account.orders')
}

export default async function Orders() {
  const orders = await listCustomerOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1>
          <Message name="modules.account.orders.long_title"/>
        </h1>
        <p>
          <Message name="modules.account.orders.long_title"/>
        </p>
      </div>
      <div>
        <OrderOverview orders={orders}/>
      </div>
    </div>
  )
}
