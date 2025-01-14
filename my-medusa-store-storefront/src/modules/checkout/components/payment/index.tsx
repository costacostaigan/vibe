"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { Cart } from "@medusajs/medusa"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, clx, Container, Heading, Text, Tooltip } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { setPaymentMethod } from "@modules/checkout/actions"
import { paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { Message } from "@lib/i18n/message"

const Payment = ({
                   cart
                 }: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = cart?.payment_session?.provider_id === "stripe"
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (cart?.payment_session && cart?.shipping_methods.length !== 0) ||
    paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)"
          }
        }
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out"
      }
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const set = async (providerId: string) => {
    setIsLoading(true)
    await setPaymentMethod(providerId)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        if (providerId === "paypal") return
        setIsLoading(false)
      })
  }

  const handleChange = (providerId: string) => {
    setError(null)
    set(providerId)
  }

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false
    })
  }

  useEffect(() => {
    setIsLoading(false)
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady
            }
          )}
        >
          <Message name="modules.account.inputs.payment.title"/>
          {!isOpen && paymentReady && <CheckCircleSolid/>}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-yellow-400 hover:text-yellow-500"
              data-testid="edit-payment-button"
            >
              <Message name="modules.account.inputs.payment.edit"/>
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && cart?.payment_sessions?.length ? (
            <>
              <RadioGroup
                value={cart.payment_session?.provider_id || ""}
                onChange={(value: string) => handleChange(value)}
              >
                {cart.payment_sessions
                  .sort((a, b) => {
                    return a.provider_id > b.provider_id ? 1 : -1
                  })
                  .map((paymentSession) => {
                    return (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentSession={paymentSession}
                        key={paymentSession.id}
                        selectedPaymentOptionId={
                          cart.payment_session?.provider_id || null
                        }
                      />
                    )
                  })}
              </RadioGroup>
              {isStripe && stripeReady && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  <Text className="txt-medium-plus text-ui-fg-base mb-1">
                    <Message name="modules.account.inputs.payment.enter_details"/>:
                  </Text>

                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                        e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
            </>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                <Message name="modules.account.inputs.payment.method"/>
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                <Message name="modules.account.inputs.payment.gift_card"/>
              </Text>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-ui-fg-base">
              <Spinner/>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6 button bg-yellow-400 hover:bg-white text-white hover:text-yellow-400 text-xs p-3 min-w-[5rem] rounded-none outline-0 outline-none outline-offset-0 shadow-none"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripe && !cardComplete) ||
              (!cart?.payment_session && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            <Message name="modules.account.inputs.payment.to_review"/>
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && cart.payment_session ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  <Message name="modules.account.inputs.payment.method"/>
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[cart.payment_session.provider_id]?.title ||
                    cart.payment_session.provider_id}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  <Message name="modules.account.inputs.payment.details"/>
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover rounded-none">
                    {paymentInfoMap[cart.payment_session.provider_id]?.icon || (
                      <CreditCard/>
                    )}
                  </Container>
                  <Text>
                    {cart.payment_session.provider_id === "stripe" && cardBrand
                      ? cardBrand
                      : <Message name="modules.account.inputs.payment.another_step"/>}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                <Message name="modules.account.inputs.payment.method"/>
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                <Message name="modules.account.inputs.payment.gift_card"/>
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8"/>
    </div>
  )
}

export default Payment
