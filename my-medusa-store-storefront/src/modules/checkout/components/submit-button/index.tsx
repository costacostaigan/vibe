"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  'data-testid': dataTestId
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  'data-testid'?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      className={"button bg-yellow-400 hover:bg-white text-white hover:text-yellow-400 text-xs p-3 min-w-[5rem] " + className}
      type="submit"
      disabled={pending}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
}
