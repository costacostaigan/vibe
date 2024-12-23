import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { Message } from "@lib/i18n/message"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const t = useTranslations('modules.account')

  const [message, formAction] = useFormState(logCustomerIn, null)

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="login-page">
      <h1 className="text-large-semi uppercase mb-6">
        <Message name="modules.account.sign_in.welcome_back"/>
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        <Message name="modules.account.sign_in.title"/>
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t('inputs.email.label')}
            name="email"
            type="email"
            title={t('inputs.email.title')}
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label={t('inputs.password.label')}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message"/>
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          <Message name="modules.account.sign_in.sign_in"/>
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        <Message name="modules.account.sign_in.not_member"/>
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          <Message name="modules.account.sign_in.join_us"/>
        </button>
        .
      </span>
    </div>
  )
}

export default Login
