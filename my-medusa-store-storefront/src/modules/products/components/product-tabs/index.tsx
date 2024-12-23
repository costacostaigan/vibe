"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HandleSplit, Message } from "@lib/i18n/message"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const t = useTranslations('modules.common.product.tabs')

  const tabs = [
    {
      label: t('product_information'),
      component: <ProductInfoTab product={product}/>
    },
    {
      label: t('shipping_returns'),
      component: <ShippingInfoTab/>
    }
  ]

  return (
    <div className="w-full flex flex-col">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
            className="border-none"
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>

      <LocalizedClientLink href="/choose-a-size"
                           className="mx-1 py-4 font-normal font-sans txt-medium text-ui-fg-subtle text-sm w-fit">
        <Message name="modules.common.product.size_table"/>
      </LocalizedClientLink>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.material"/>
            </span>
            <p>{product.material ? <HandleSplit text={product.material}/> : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.country_of_origin"/>
            </span>
            <p>{product.origin_country ? <HandleSplit text={product.origin_country}/> : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.type"/>
            </span>
            <p>{product.type ? <HandleSplit text={product.type.value}/> : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.weight"/>
            </span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.dimensions"/>
            </span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">
            <Message name="modules.common.product.tags"/>
          </span>
        </div>
      ) : null}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery/>
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.tabs.fast_delivery.title"/>
            </span>
            <p className="max-w-sm">
              <Message name="modules.common.product.tabs.fast_delivery.description"/>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh/>
          <div>
            <span className="font-semibold">
              <Message name="modules.common.product.tabs.exchanges.title"/>
            </span>
            <p className="max-w-sm">
              <Message name="modules.common.product.tabs.exchanges.description"/>
            </p>
          </div>
        </div>
        {/*<div className="flex items-start gap-x-2">
          <Back/>
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>*/}
      </div>
    </div>
  )
}

export default ProductTabs
