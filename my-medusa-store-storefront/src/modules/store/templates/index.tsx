import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { Message } from "@lib/i18n/message"

const StoreTemplate = ({
                         sortBy,
                         page,
                         countryCode
                       }: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <section className="flex flex-col small:flex-row small:items-start py-6 content-container"
             data-testid="category-container">
      <RefinementList sortBy={sortBy || "created_at"} />

      <div className="w-full">
        <h2 data-testid="store-page-title" className="text-6xl uppercase font-light mb-12">
          <Message name="modules.store.title"/>
        </h2>

        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </section>
  )
}

export default StoreTemplate
