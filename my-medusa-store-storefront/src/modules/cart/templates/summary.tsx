"use client"

import { Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Message } from "@lib/i18n/message"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        <Message name="modules.cart.summary.title"/>
      </Heading>
      <DiscountCode cart={cart}/>
      <Divider/>
      <CartTotals data={cart}/>
      <LocalizedClientLink href={"/checkout?step=" + cart.checkout_step} data-testid="checkout-button">
        <button
          className="w-full block uppercase text-center p-4 border-yellow-400 border font-playfair text-base bg-yellow-400 text-white hover:bg-transparent hover:text-yellow-400 transition-colors">
          <Message name="modules.cart.summary.go_to_checkout"/>
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
