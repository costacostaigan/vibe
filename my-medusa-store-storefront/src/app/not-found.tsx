import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import Link from "next/link"
import { Message } from "@lib/i18n/message"
import { generateMetadataIntl } from "@lib/i18n/generate-metadata"

export async function generateMetadata() {
  return generateMetadataIntl('not_found')
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(90vh)]">
      <h1 className="text-2xl-semi text-ui-fg-base">
        <Message name="not_found.title"/>
      </h1>
      <p className="text-small-regular text-ui-fg-base">
        <Message name="not_found.description"/>
      </p>
      <Link
        className="flex gap-x-1 items-center group"
        href="/"
      >
        <Text className="text-yellow-400">
          <Message name="not_found.go_to_home"/>
        </Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150 text-yellow-300"
        />
      </Link>
    </div>
  )
}
