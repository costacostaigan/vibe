"use client"

import { clx } from "@medusajs/ui"
import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function NavLayout({ children, className, isScrolledClassName, notScrolledClassName }: {
  children: ReactNode,
  className?: string,
  isScrolledClassName?: string,
  notScrolledClassName?: string
}) {
  const isMainPage = usePathname()?.split("").filter(v => v === "/").length < 2

  const isScrolledClassNames = (isScrolled: boolean) => isScrolled ? "" + isScrolledClassName : "" + notScrolledClassName

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 0)

    window.addEventListener("scroll", checkScroll)

    return () => window.removeEventListener("scroll", checkScroll)
  }, [])


  return <header
    className={clx("transition-colors", className, isMainPage ? isScrolledClassNames(isScrolled) : isScrolledClassName + ' static')}>
    {children}
  </header>
}
