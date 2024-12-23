import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"
import { generateMetadataIntl } from "@lib/i18n/generate-metadata"

export async function generateMetadata() {
  return generateMetadataIntl('sign_in')
}

export default function Login() {
  return <LoginTemplate />
}
