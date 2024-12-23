"use client"

import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ReactNode, useState } from "react"
import { clx } from "@medusajs/ui"

const Arrow = (props: { [key: string]: any }) => {
  const right = props.className.includes("slick-next")

  return <button
    className={`absolute z-30 -top-20 md:top-0 text-2xl grid place-content-center border-2 border-yellow-400 w-12 h-12 font-light font-playfair hover:bg-yellow-400 hover:text-white transition-colors ${right ? "right-6" : "right-[6rem]"}`}
    onClick={props.onClick}>
    {right ? ">" : "<"}
  </button>
}

const Slide = ({ currentActiveIndex, ...props }: { currentActiveIndex: number } & {
  [key: string]: any
}) => {
  return <div {...props} className={clx(
    "h-full px-3 transition-[padding] duration-500",
    currentActiveIndex === 0 && "pb-44 pl-6",
    currentActiveIndex === 2 && "pt-32 pr-6",
    props.className
  )} />
}

export default function ProductRail({ children }: { children: ReactNode[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return <>
    <style>{`
      .slick-slide {
        height: 50rem;
      }
      .slick-slide div:first-child {
        height: 100%;
      }
      .slick-track {
        display: flex;
        align-items: end;
      }
    `}</style>

    {/*@ts-ignore*/}
    <Slider {...{
      // dots: false,
      draggable: false,
      infinity: true,
      beforeChange: (_, nextSlideIndex) => setCurrentIndex(nextSlideIndex),
      nextArrow: <Arrow />,
      prevArrow: <Arrow />,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            infinite: true
          }
        }
      ]
    }}>
      {children?.map((children, index) => {
        return (
          <Slide key={index} id={Math.abs(index - currentIndex)} data={index + " , " + currentIndex} {...{
            index,
            currentActiveIndex: Math.abs(index - currentIndex)
          }}>
            {children}
          </Slide>
        )
      })}
    </Slider>
  </>
}
