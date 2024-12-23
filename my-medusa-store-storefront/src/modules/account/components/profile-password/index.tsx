"use client"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { updateCustomerPassword } from "@modules/account/actions"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const t = useTranslations('modules.account.inputs')

  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerPassword, {
    customer,
    success: false,
    error: false
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label={t('password.title')}
        currentInfo={null}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('password.old')}
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
          />
          <Input
            label={t('password.new')}
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            label={t('password.confirm')}
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
