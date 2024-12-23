import { ImageResponse } from 'next/og'
import { Playfair_Display } from "next/font/google"

// Route segment config
// export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32
}
export const contentType = 'image/png'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: "swap"
})

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        className={playfair.variable}
        style={{
          fontSize: 24,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgb(253 224 71)',
          fontFamily: 'var(--font-playfair)'
        }}
      >
        V
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size
    }
  )
}
