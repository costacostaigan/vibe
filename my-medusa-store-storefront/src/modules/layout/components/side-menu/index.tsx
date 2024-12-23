"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import type { Region } from "@medusajs/medusa"
import { clx, Text, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { useTranslations } from "next-intl"
import LanguageSelect from "@modules/layout/components/language-select"

const SideMenuItems = {
  Home: "/",
  Lingerie: "/categories/lingerie",
  Roots: "/categories/roots",
  Account: "/account",
  Cart: "/cart"
}

const SideMenu = ({ regions, className }: { regions: Region[] | null, className?: string }) => {
  const t = useTranslations('modules.layout')

  const toggleState = useToggleState()
  const toggleState2 = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button data-testid="nav-menu-button"
                                className={`relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none ${className}`}>
                  {t('nav.menu')}
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  className="flex flex-col fixed w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min inset-y-0 z-[60] left-0 text-sm text-ui-fg-on-color !m-0 bg-white  border-r border-ui-border-base">
                  <div data-testid="nav-menu-popup"
                       className="flex flex-col h-full justify-between p-6">
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button drop-shadow-lg" onClick={close}>
                        <XMark className="text-foreground"/>
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 text-foreground hover:text-yellow-300 transition-colors"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {t('nav.' + name.toLowerCase())}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex items-center justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-foreground",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      <div
                        className="flex items-center justify-between"
                        onMouseEnter={toggleState2.open}
                        onMouseLeave={toggleState2.close}
                      >
                        <LanguageSelect toggleState={toggleState2}/>
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-foreground",
                            toggleState2.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      <Text className="flex justify-between txt-compact-small text-foreground">
                        {t('rights', { year: new Date().getFullYear() })}
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
