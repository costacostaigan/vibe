"use client"

import { Customer, Region } from "@medusajs/medusa"
import React, { useEffect, useMemo } from "react"

import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"

import AccountInfo from "../account-info"
import { useFormState } from "react-dom"
import { updateCustomerBillingAddress } from "@modules/account/actions"
import { useTranslations } from "next-intl"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
  regions: Region[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
                                                               customer,
                                                               regions
                                                             }) => {
  const t = useTranslations('modules.account.inputs')

  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerBillingAddress, {
    error: false,
    success: false
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return t('billings.no')
    }

    const country =
      regionOptions?.find(
        (country) => country.value === customer.billing_address.country_code
      )?.label || customer.billing_address.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {customer.billing_address.first_name}{" "}
          {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2
            ? `, ${customer.billing_address.address_2}`
            : ""}
        </span>
        <span>
          {customer.billing_address.postal_code},{" "}
          {customer.billing_address.city}
        </span>
        <span>{country}</span>
      </div>
    )
  }, [customer, regionOptions])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label={t('billings.label')}
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label={t('first_name.label')}
              name="billing_address.first_name"
              defaultValue={customer.billing_address?.first_name || undefined}
              required
              data-testid="billing-first-name-input"
            />
            <Input
              label={t('last_name.label')}
              name="billing_address.last_name"
              defaultValue={customer.billing_address?.last_name || undefined}
              required
              data-testid="billing-last-name-input"
            />
          </div>
          <Input
            label={t('billings.company')}
            name="billing_address.company"
            defaultValue={customer.billing_address?.company || undefined}
            data-testid="billing-company-input"
          />
          <Input
            label={t('billings.address_1')}
            name="billing_address.address_1"
            defaultValue={customer.billing_address?.address_1 || undefined}
            required
            data-testid="billing-address-1-input"
          />
          <Input
            label={t('billings.address_2')}
            name="billing_address.address_2"
            defaultValue={customer.billing_address?.address_2 || undefined}
            data-testid="billing-address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label={t('billings.postal')}
              name="billing_address.postal_code"
              defaultValue={customer.billing_address?.postal_code || undefined}
              required
              data-testid="billing-postcal-code-input"
            />
            <Input
              label={t('billings.city')}
              name="billing_address.city"
              defaultValue={customer.billing_address?.city || undefined}
              required
              data-testid="billing-city-input"
            />
          </div>
          <Input
            label={t('billings.province')}
            name="billing_address.province"
            defaultValue={customer.billing_address?.province || undefined}
            data-testid="billing-province-input"
          />
          <NativeSelect
            name="billing_address.country_code"
            defaultValue={customer.billing_address?.country_code || undefined}
            required
            data-testid="billing-country-code-select"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </NativeSelect>
        </div>
      </AccountInfo>
    </form>
  )
}

const mapBillingAddressToFormData = ({ customer }: MyInformationProps) => {
  return {
    billing_address: {
      first_name: customer.billing_address?.first_name || undefined,
      last_name: customer.billing_address?.last_name || undefined,
      company: customer.billing_address?.company || undefined,
      address_1: customer.billing_address?.address_1 || undefined,
      address_2: customer.billing_address?.address_2 || undefined,
      city: customer.billing_address?.city || undefined,
      province: customer.billing_address?.province || undefined,
      postal_code: customer.billing_address?.postal_code || undefined,
      country_code: customer.billing_address?.country_code || undefined
    }
  }
}

export default ProfileBillingAddress
