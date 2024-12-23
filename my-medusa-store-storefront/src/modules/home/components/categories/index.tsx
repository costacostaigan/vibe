import { getProductsByCategoryHandle, listCategories } from "@lib/data"
import Thumbnail from "@modules/products/components/thumbnail"
import Link from "next/link"
import { HandleSplit, Message } from "@lib/i18n/message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Categories = async ({ countryCode }: { countryCode: string }) => {
  const categories = await listCategories()
    .then(categories => Promise.all(categories.map(
      async category => ({
        ...category,
        products: await getProductsByCategoryHandle({ handle: category.handle, countryCode })
          .then(({ response }) => response.products)
      }))))
    .then(categories => categories.filter(category => category.products.length > 0 && category.handle !== 'lingerie'))

  return <section className="content-container">
    <h2 className="font-light mb-12 uppercase text-3xl lg:text-6xl">
      <Message name="modules.categories.title"/>
    </h2>

    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:h-[40rem]">
      {[
        ["sm:row-span-3 md:row-span-2 lg:col-span-2 !col-start-1 !row-start-1", ""],
        ["sm:col-start-2 md:col-span-2 lg:col-span-1 lg:col-start-3 sm:row-start-1", ""],
        ["sm:col-start-2 sm:row-start-2 lg:col-start-4 lg:col-span-2 lg:row-start-1", ""],
        ["lg:col-span-2 lg:col-start-3 md:row-start-2", ""]
      ]
        .slice(0, categories.length)
        .map(([className, absoluteClassName], index) => {
          const category = categories[index]

          return (
            <li key={"category." + index} className={"group relative pb-6 aspect-[4/3] sm:aspect-auto " + className}>
              <LocalizedClientLink href={'/categories/' + category.handle}>
                <Thumbnail
                  thumbnail={category.products[0].thumbnail}
                  isFeatured={category.products[0].isFeatured}
                  size="full"
                  className="h-full aspect-auto"
                />

                <div className="absolute left-0 bottom-0 bg-glass z-40 p-4 lg:p-6 px-9 lg:px-12 text-white">
                  <h3 className="text-xl md:text-2xl font-medium">
                    <HandleSplit text={category.name}/>
                  </h3>
                  {category.description && <p>
                    <HandleSplit text={category.description}/>
                  </p>}
                </div>
              </LocalizedClientLink>
            </li>
          )
        })}

      <Link href="/store"
            className="hidden lg:block ml-auto uppercase w-full h-fit mt-auto mb-6 text-center p-4 border-yellow-400 border font-playfair text-lg hover:bg-yellow-400 hover:text-white transition-colors">
        <Message name="modules.categories.all"/>
      </Link>
    </ul>

    <Link href="/store"
          className="block lg:hidden ml-auto uppercase w-full max-w-sm h-fit mb-6 mt-6 text-center p-4 border-yellow-400 border font-playfair text-lg hover:bg-yellow-400 hover:text-white transition-colors">
      <Message name="modules.categories.all"/>
    </Link>
  </section>
}

export default Categories
