import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"
import { HandleSplit, Message } from "@lib/i18n/message"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
                                                     option,
                                                     current,
                                                     updateOption,
                                                     title,
                                                     "data-testid": dataTestId,
                                                     disabled
                                                   }) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">
        <Message name="modules.common.product.select"/>{' '}
        <HandleSplit text={title} />
      </span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clx(
                "border border-yellow-400 h-10 p-2 flex-1 ",
                {
                  "bg-yellow-400": v === current,
                  "text-white": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              <HandleSplit text={v} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect