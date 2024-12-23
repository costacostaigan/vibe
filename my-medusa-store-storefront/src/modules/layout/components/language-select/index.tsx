"use client"

import { Popover, Transition } from "@headlessui/react"

import { StateType } from "@lib/hooks/use-toggle-state"
import { Message } from "@lib/i18n/message"
import { useLocale } from "next-intl"
import { locales } from "@lib/i18n/locales"
import { Fragment } from "react"
import { changeLanguage } from "@modules/layout/components/language-select/action"

type LanguageSelectProps = {
  toggleState: StateType
}

const LanguageSelect = ({ toggleState }: LanguageSelectProps) => {
  const locale = useLocale()

  const { state, close } = toggleState

  return (
    <div>
      <Popover as="span">
        <Popover.Button className="p-2 w-full bg-white text-foreground rounded-xl">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>
              <Message name="modules.layout.nav.language.title"/>:
            </span>
            <Message name={"modules.layout.nav.language." + locale}/>
          </div>
        </Popover.Button>
        <div className="flex relative w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-full"
              static
            >
              {locales
                .filter(_locale => _locale !== locale)
                .map((_locale, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => changeLanguage(_locale)}
                      className="py-2 hover:bg-gray-200 px-3 cursor-pointer w-full flex items-center gap-x-2"
                    >
                      <Message name={"modules.layout.nav.language." + _locale}/>
                    </button>
                  )
                })}
            </Popover.Panel>
          </Transition>
        </div>
      </Popover>
    </div>
  )
}

export default LanguageSelect
