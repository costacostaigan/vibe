import { clx, Label, RadioGroup } from "@medusajs/ui"
import { ChangeEvent } from "react"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
                            title,
                            items,
                            value,
                            handleChange,
                            "data-testid": dataTestId
                          }: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-3 flex-col">
      <h4 className="uppercase font-light">
        {title}
      </h4>

      <RadioGroup data-testid={dataTestId}>
        {items?.map((i) => (
          <div
            key={i.value}
            className="flex gap-x-2 items-center"
          >
            <RadioGroup.Item
              checked={i.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value
                )
              }
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              placeholder={i.label}
              htmlFor={i.value}
              className={clx(
                "!transform-none hover:cursor-pointer font-light text-base",
                {
                  "text-yellow-400": i.value === value
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
