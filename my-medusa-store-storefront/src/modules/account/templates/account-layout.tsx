import React from "react"

import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
                                                       customer,
                                                       children
                                                     }) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        {customer
          ?
          <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12">
            <div>{customer && <AccountNav customer={customer}/>}</div>
            <div className="flex-1">{children}</div>
          </div>
          :
          <div className="mx-auto">{children}</div>}
        {/*<div
          className="flex flex-col small:flex-row justify-between small:border-t border-gray-200 py-12 gap-4">
          <h3 className="uppercase font-light">
            Got questions?
          </h3>
          <p>
            You can find frequently asked questions and answers on our
            customer service page.
          </p>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>*/}
      </div>
    </div>
  )
}

export default AccountLayout
