import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import { Message } from "@lib/i18n/message"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        <Message name="modules.cart.title"/>
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        <Message name="modules.cart.empty"/>
      </Text>
      <div>
        <InteractiveLink href="/store">
          <Message name="modules.cart.explore"/>
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
