'use client'

import { Disclosure, Transition } from "@headlessui/react"
import { Minus, Plus } from "@medusajs/icons"
import { Message } from "@lib/i18n/message"

const Faq = () => {
  return <section className="content-container grid lg:grid-cols-2 gap-6">
    <h2 className="text-3xl lg:text-6xl uppercase font-light col-span-full">
      <Message name="modules.faq.payment_delivery"/>
    </h2>

    <ul className="lg:col-start-2 grid gap-6">
      {[
        "delivery",
        "methods_of_payments",
        "refund"
      ].map((name, index) => (
        <Disclosure key={index}>
          {({ open }) => <div className="grid gap-3">
            <Disclosure.Button className="flex w-full justify-between items-center text-base lg:text-2xl text-left">
              <Message name={`modules.faq.${name}.question`}/>

              <Plus className="h-5 w-5" style={{ display: open ? "none" : "block" }}/>
              <Minus className="h-5 w-5" style={{ display: !open ? "none" : "block" }}/>
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="text-sm sm:text-base">
                <Message name={`modules.faq.${name}.answer`}/>
              </Disclosure.Panel>
            </Transition>
          </div>}
        </Disclosure>
      ))}
    </ul>
  </section>
}

export default Faq
