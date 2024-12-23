import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Message } from "@lib/i18n/message"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          <Message name="modules.account.sign_in.have_account"/>
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          <Message name="modules.account.sign_in.title"/>
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <button
            className="block h-10 uppercase w-full text-center p-2 border-yellow-400 border font-playfair text-base hover:bg-yellow-400 hover:text-white transition-colors"
            data-testid="sign-in-button">
            <Message name="modules.account.sign_in.sign_in"/>
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
