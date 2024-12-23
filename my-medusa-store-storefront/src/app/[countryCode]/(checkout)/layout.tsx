import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import { Message } from "@lib/i18n/message"

export default function CheckoutLayout({
                                         children
                                       }: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b ">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16}/>
            <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
              <Message name="modules.cart.back_to_cart"/>
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
              <Message name="modules.cart.back"/>
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-playfair text-xl lg:text-2xl text-yellow-300 drop-shadow-sm shadow-white uppercase"
            data-testid="store-link"
          >
            <Message name="modules.layout.store_name"/>
          </LocalizedClientLink>
          <div className="flex-1 basis-0"/>
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}
