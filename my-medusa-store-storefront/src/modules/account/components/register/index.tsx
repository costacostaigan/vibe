"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Message } from "@lib/i18n/message"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const t = useTranslations('modules.account')

  const [message, formAction] = useFormState(signUp, null)

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="register-page">
      <h1 className="text-large-semi uppercase mb-6">
        <Message name="modules.account.register.title"/>
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        <Message name="modules.account.register.description"/>
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t('inputs.first_name.label')}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={t('inputs.last_name.label')}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={t('inputs.email.label')}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={t('inputs.phone.label')}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={t('inputs.password.label')}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="register-error"/>

        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          <Message name="modules.account.register.policy.title"/>
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            <Message name="modules.account.register.policy.policy"/>
          </LocalizedClientLink>{" "}

          <Message name="modules.account.register.policy.and"/>{" "}

          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            <Message name="modules.account.register.policy.terms"/>
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          <Message name="modules.account.sign_in.join_us"/>
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        <Message name="modules.account.sign_in.have_account"/>{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          <Message name="modules.account.sign_in.sign_in"/>
        </button>
        .
      </span>
    </div>
  )
}

export default Register
