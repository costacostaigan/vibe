import { getCustomer, listCustomerOrders } from "@lib/data"
import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { generateMetadataIntl } from "@lib/i18n/generate-metadata"

export async function generateMetadata() {
  return generateMetadataIntl('account')
}

export default async function OverviewTemplate() {
  const customer = await getCustomer().catch(() => null)
  const orders = (await listCustomerOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders}/>
}
