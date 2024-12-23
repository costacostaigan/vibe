import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getCustomer, getRegion } from "@lib/data"

import { headers } from "next/headers"
import { Message } from "@lib/i18n/message"
import { generateMetadataIntl } from "@lib/i18n/generate-metadata"

export async function generateMetadata() {
  return generateMetadataIntl('account.addresses')
}

export default async function Addresses() {
  const nextHeaders = headers()
  const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1>
          <Message name="modules.account.addresses.long_title"/>
        </h1>
        <p>
          <Message name="modules.account.addresses.description"/>
        </p>
      </div>
      <AddressBook customer={customer} region={region}/>
    </div>
  )
}
