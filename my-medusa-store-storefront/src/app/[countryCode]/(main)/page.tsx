import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Categories from "@modules/home/components/categories"
import About from "@modules/home/components/about"
import Faq from "@modules/home/components/faq"
import { generateMetadataIntl } from "@lib/i18n/generate-metadata"

export async function generateMetadata() {
  return generateMetadataIntl('main')
}

export default async function Home({
                                     params: { countryCode }
                                   }: {
  params: { countryCode: string }
}) {
  return (
    <>
      <Hero/>

      <FeaturedProducts {...{ countryCode }} />

      <Categories {...{ countryCode }} />

      <Faq/>
      <About/>

    </>
  )
}
