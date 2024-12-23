import { clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HandleSplit, Message } from "@lib/i18n/message"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return <footer className="content-container grid gap-24 pb-40 pt-20 border-t border-ui-border-base">
    <LocalizedClientLink
      href="/"
      className="mx-auto text-center font-playfair text-2xl text-yellow-300 drop-shadow-sm shadow-white uppercase"
      data-testid="nav-store-link"
    >
      <Message name="modules.layout.store_name"/>
    </LocalizedClientLink>

    <div className="flex flex-wrap items-start gap-12 md:gap-24 lg:gap-36">
      <div>
        {product_categories?.length > 0 && (
          <div>
            <h4 className="font-light mb-4 uppercase">
              <Message name="modules.layout.nav.categories"/>
            </h4>

            <ul className="grid gap-3" data-testid="footer-categories">
              {product_categories?.slice(0, 6).map((c) => {
                if (c.parent_category)
                  return

                const children =
                  c.category_children?.map((child) => ({
                    name: child.name,
                    handle: child.handle,
                    id: child.id
                  })) || null

                return (
                  <li
                    className="flex flex-col gap-2"
                    key={c.id}
                  >
                    <LocalizedClientLink
                      className="text-base font-light"
                      href={`/categories/${c.handle}`}
                      data-testid="category-link"
                    >
                      <HandleSplit text={c.name}/>
                    </LocalizedClientLink>

                    {children?.length > 0 && (
                      <ul className="grid grid-cols-1 ml-3 gap-2">
                        {children.map((child) => (
                          <li key={child.id}>
                            <LocalizedClientLink
                              className="font-light"
                              href={`/categories/${child.handle}`}
                              data-testid="category-link"
                            >
                              <HandleSplit text={child.name}/>
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      <div>
        {collections?.length > 0 && (
          <div>
            <h4 className="font-light mb-4 uppercase">
              <Message name="modules.layout.nav.collections"/>
            </h4>

            <ul
              className={clx(
                "grid grid-cols-1 gap-3",
                {
                  "grid-cols-2": (collections?.length || 0) > 3
                }
              )}
            >
              {collections?.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="font-light"
                    href={`/collections/${c.handle}`}
                  >
                    <HandleSplit text={c.title}/>
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-light mb-4 uppercase">
          <Message name="modules.layout.nav.customer_care"/>
        </h4>

        <ul className="grid gap-3 max-w-[15rem]">
          {[
            [<Message key="withdrawal_form"
                      name="modules.layout.nav.policy.withdrawal_form"/>, "Formulár_na_odstúpenie_od_zmluvy_v2024.pdf"],
            [<Message key="complaint_form"
                      name="modules.layout.nav.policy.complaint_form"/>, "Reklamačný_formulár_v2024.pdf"],
            [<Message key="complaints_procedure"
                      name="modules.layout.nav.policy.complaints_procedure"/>, "Reklamačný_poriadok_v2024.pdf"],
            [<Message key="general_terms_and_conditions"
                      name="modules.layout.nav.policy.general_terms_and_conditions"/>, "Všeobecné_obchodné_podmienky_v2024.pdf"],
            [<Message key="principles"
                      name="modules.layout.nav.policy.principles"/>, "Zasady_spracuvania_a_ochrany_Osobných_údajov_a_poučenie_o_cookies_v2024.pdf"]
          ].map(([label, fileName]) => ( // @ts-ignore
            <li key={fileName} className="font-light">
              <a href={"/documents/" + fileName} target="_blank" rel="noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 ml-auto flex-1 ">
        <h4 className="font-light uppercase">
          <Message name="modules.layout.nav.community.title"/>
        </h4>

        <p className="font-light">
          <Message name="modules.layout.nav.community.description"/>
        </p>

        <div className="flex gap-[inherit] text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="lucide lucide-instagram">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>

          {/*<Input
            label="Email"
            name="email"
            autoComplete="email"
          />
          <button
            className="text-xl grid place-content-center border-2 border-yellow-400 min-h-[2.75rem] max-h-[2.75rem] min-w-[2.75rem] max-w-[2.75rem] font-light font-playfair hover:bg-yellow-400 hover:text-white transition-colors">
            {">"}
          </button>*/}
        </div>
      </div>
    </div>
  </footer>
}
