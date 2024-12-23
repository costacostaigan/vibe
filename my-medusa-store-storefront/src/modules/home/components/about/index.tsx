import Link from "next/link"
import Image from "next/image"
import { Message } from "@lib/i18n/message"
import AboutImage from "../../../../../public/assets/about_3.jpeg"

const About = () => {
  return <section className="content-container grid lg:grid-cols-2 gap-6">
    <div className="flex flex-col gap-4">
      <div className="flex-1 space-y-4">
        <h2 className="text-[2rem] sm:text-[3rem] lg:text-[4.7rem] uppercase font-light">
          <Message name="modules.about.title"/>
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          <p>
            <Message name="modules.about.content_1"/>
          </p>
          <p>
            <Message name="modules.about.content_2"/>
          </p>
        </div>
      </div>

      <Link href="/store"
            className="block uppercase w-full text-center p-4 border-yellow-400 border font-playfair text-lg hover:bg-yellow-400 hover:text-white transition-colors">
        <Message name="modules.about.catalog"/>
      </Link>
    </div>

    <div className="relative w-full aspect-square">
      <Image
        src={AboutImage}
        className="object-center object-cover"
        fill
        alt="background"
      />

      <div
        className="absolute -bottom-12 left-12 p-12 pb-24 text-yellow-400 font-playfair text-xl md:text-3xl lg:text-5xl bg-glass">
        <Message name="modules.about.subtitle"/>
      </div>
    </div>
  </section>
}

export default About
