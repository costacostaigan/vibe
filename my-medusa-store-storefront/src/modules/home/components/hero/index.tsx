import Image from "next/image"
import { Message } from "@lib/i18n/message"
import BannerImage from "../../../../../public/assets/foto/329+.jpg"

const Hero = () => {
  return (
    <div className="h-[30rem] md:h-[40rem] lg:h-[50rem] w-full relative mb-32 md:mb-64">
      <Image
        src={BannerImage}
        className="object-center object-cover scale-x-[-1]"
        unoptimized
        fill
        alt="Background"
      />

      <div
        className="absolute z-10 -bottom-32 right-0 md:right-auto left-0 top-[25rem] md:top-0 md:-bottom-24 md:w-[53%] bg-glass">
        <div className="px-6 flex flex-col justify-center h-full">
          <h1
            className=" xs:text-[3.4rem] xs:leading-[4rem] sm:text-[4.5rem] sm:leading-[5rem] md:leading-[4rem] md:text-[4rem] lg:leading-[5rem] lg:text-[6rem] xl:leading-[6rem] xl:text-[7rem] uppercase text-background drop-shadow-4xl">
            <Message name="modules.home.title"/>

            <span
              className="font-playfair text-yellow-300 normal-case text-xl tracking-normal justify-center block sm:inline-block w-52 sm:ml-6 drop-shadow-4xl"
              style={{ wordWrap: "break-word" }}
            >
              <Message name="modules.home.subtitle"/>
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
