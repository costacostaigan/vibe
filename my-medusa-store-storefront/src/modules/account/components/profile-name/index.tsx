"use client"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { updateCustomerName } from "@modules/account/actions"

import AccountInfo from "../account-info"
import { useTranslations } from "next-intl"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const t = useTranslations('modules.account.inputs')

  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerName, {
    error: false,
    success: false
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label={t('name.label')}
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label={t('first_name.label')}
            name="first_name"
            required
            defaultValue={customer.first_name}
            data-testid="first-name-input"
          />
          <Input
            label={t('last_name.label')}
            name="last_name"
            required
            defaultValue={customer.last_name}
            data-testid="last-name-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
