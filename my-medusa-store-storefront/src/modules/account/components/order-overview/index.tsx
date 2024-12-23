"use client"

import { Order } from "@medusajs/medusa"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Message } from "@lib/i18n/message"

const OrderOverview = ({ orders }: { orders: Order[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o}/>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-3"
      data-testid="no-orders-container"
    >
      <h3>
        <Message name="modules.account.orders.no_orders"/>
      </h3>
      <p>
        <Message name="modules.account.orders.no_orders"/>
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <button className="button" data-testid="continue-shopping-button">
            <Message name="modules.account.orders.continue"/>
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
