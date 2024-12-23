import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { NavLayout } from "@modules/layout/templates/nav/layout"
import { Message } from "@lib/i18n/message"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <NavLayout
      className="h-16 duration-200 fixed top-0 inset-x-0 z-50 group"
      isScrolledClassName="bg-white border-b border-ui-border-base"
      notScrolledClassName="bg-transparent text-gray-100"
    >
      <nav
        className="content-container pr-0 flex items-center justify-between w-full h-full relative">
        <div className="basis-0 h-full flex items-center">
          <div className="h-full">
            <SideMenu regions={regions}/>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center h-full">
          <LocalizedClientLink
            href="/"
            className="font-playfair text-xl lg:text-2xl text-yellow-300 drop-shadow-sm shadow-white uppercase"
            data-testid="nav-store-link"
          >
            <Message name="modules.layout.store_name"/>
          </LocalizedClientLink>
        </div>

        <div className="flex items-center gap-x-6 h-full basis-0 justify-end">
          {/*<div className="hidden small:flex items-center gap-x-6 h-full">
            <LocalizedClientLink
              className="hover:text-ui-fg-base"
              href="/account"
              data-testid="nav-account-link"
            >
              <Message name="modules.layout.nav.account"/>
            </LocalizedClientLink>
          </div>*/}
          <Suspense
            fallback={
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex gap-2"
                href="/cart"
                data-testid="nav-cart-link"
              >
                <Message name="modules.layout.nav.cart"/> (0)
              </LocalizedClientLink>
            }
          >
            <CartButton/>
          </Suspense>
        </div>
      </nav>
    </NavLayout>
  )
}
