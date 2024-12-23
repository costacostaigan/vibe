'use client'

import { useLocale } from "next-intl"
import Image from "next/image"
import SizesEN from "../../../../../../public/assets/foto/ENG.png"
import SizesSK from "../../../../../../public/assets/foto/SK.png"

export default function ChooseASize() {
  const locale = useLocale()

  switch (locale) {
    case 'sk':
      return <ChooseASizeSlovak/>
    case 'en':
      return <ChooseASizeEnglish/>
  }
}

function ChooseASizeEnglish() {
  return <section className="content-container prose mx-auto lg:max-w-4xl">
    <div className="grid lg:grid-cols-2 gap-6">
      <div>
        <h2 className="font-medium">
          How to Measure Your Size Correctly?
        </h2>

        <h5 className="font-medium">
          STEP 1: Measure the under-bust circumference
        </h5>

        <ul>
          <li>
            Use a soft measuring tape or a special lingerie tape.
          </li>
          <li>
            Stand in front of a mirror and hold the tape horizontally around your body, under your bust.
          </li>
          <li>
            Ensure the tape is snug but not too tight against your skin.
          </li>
          <li>
            Take a deep breath and measure the under-bust circumference. Make sure the tape is neither loose nor
            slanted.
          </li>
        </ul>

        <h5 className="font-medium">
          STEP 2: Measure your bust at the fullest point and compare it with the under-bust circumference:
        </h5>

        <ul>
          <li>
            Continue holding the tape around your body, this time placing the tape at the fullest point of your bust
            (usually corresponds to the largest circumference of your bust).
          </li>
          <li>
            Measure the bust circumference, ensuring the tape is snug but not too tight.
          </li>
        </ul>

        <h5 className="font-medium">
          STEP 3: Measure the hip circumference:
        </h5>
        <li>
          Place the tape around your hips at the widest part of your thighs.
        </li>
        <li>
          Ensure the tape is horizontal and snug, but not too tight against your skin.
        </li>
        <li>
          Measure the hip circumference.
        </li>
      </div>

      <Image src={SizesEN} width={SizesEN.width} height={SizesEN.height} alt="Sizes" className="md:mt-auto"/>
    </div>

    <h4 className="font-medium">
      Bra size
    </h4>
    <table>
      <thead>
      <tr>
        <th>Under-breast circumference</th>
        <th>68-72 cm</th>
        <th>73-77 cm</th>
        <th>78-82 cm</th>
        <th>83-87 cm</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Your size</td>
        <td>70</td>
        <td>75</td>
        <td>80</td>
        <td>85</td>
      </tr>
      </tbody>
    </table>
    <table>
      <thead>
      <tr>
        <th>Bust circumference</th>
        <th>12.5 cm</th>
        <th>15 cm</th>
        <th>17.5 cm</th>
        <th>20 cm</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Your size</td>
        <td>A</td>
        <td>B</td>
        <td>C</td>
        <td>D</td>
      </tr>
      </tbody>
    </table>

    <h4 className="font-medium">
      Panty size
    </h4>
    <table>
      <thead>
      <tr>
        <th>Hip circumference</th>
        <th>87-90 cm</th>
        <th>91-94 cm</th>
        <th>95-98 cm</th>
        <th>99-104 cm</th>
        <th>105-109 cm</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Your size</td>
        <td>XS</td>
        <td>S</td>
        <td>M</td>
        <td>L</td>
        <td>XL</td>
      </tr>
      </tbody>
    </table>
  </section>
}


function ChooseASizeSlovak() {
  return (
    <section className="content-container prose mx-auto lg:max-w-4xl">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-medium">
            Ako správne merať svoju veľkosť?
          </h2>

          <h5 className="font-medium">
            KROK 1: Zmerajte obvod pod prsami
          </h5>

          <ul>
            <li>
              Použite mäkkú meraciu pásku alebo špeciálnu spodnú pásku.
            </li>
            <li>
              Stojte pred zrkadlom a držte pásku vodorovne okolo tela, pod prsami.
            </li>
            <li>
              Uistite sa, že páska je pevná, ale nie príliš tesná proti pokožke.
            </li>
            <li>
              Dýchajte hlboko a zmerajte obvod pod prsami. Uistite sa, že páska nie je ani voľná, ani šikmá.
            </li>
          </ul>

          <h5 className="font-medium">
            KROK 2: Zmerajte obvod prsníka na najplnšom mieste a porovnajte ho s obvodom pod prsami:
          </h5>

          <ul>
            <li>
              Pokračujte v držaní pásky okolo tela, tentoraz umiestnite pásku na najplnšie miesto prsníka
              (zvyčajne zodpovedá najväčšiemu obvodu prsníka).
            </li>
            <li>
              Zmerajte obvod prsníka, zabezpečte, aby páska bola pevná, ale nie príliš tesná.
            </li>
          </ul>

          <h5 className="font-medium">
            KROK 3: Zmerajte obvod bokov:
          </h5>
          <ul>
            <li>
              Umiestnite pásku okolo bokov na najs širošom mieste stehien.
            </li>
            <li>
              Uistite sa, že páska je vodorovná a pevná, ale nie príliš tesná proti pokožke.
            </li>
            <li>
              Zmerajte obvod bokov.
            </li>
          </ul>
        </div>

        <Image src={SizesSK} width={SizesSK.width} height={SizesSK.height} alt="Veľkosť" className="md:mt-auto"/>
      </div>

      <h4 className="font-medium">
        Veľkosť podprsenky
      </h4>
      <table>
        <thead>
        <tr>
          <th>Obvod pod prsiami</th>
          <th>68-72 cm</th>
          <th>73-77 cm</th>
          <th>78-82 cm</th>
          <th>83-87 cm</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Vaša veľkosť</td>
          <td>70</td>
          <td>75</td>
          <td>80</td>
          <td>85</td>
        </tr>
        </tbody>
      </table>
      <table>
        <thead>
        <tr>
          <th>Obvod prsníka</th>
          <th>12,5 cm</th>
          <th>15 cm</th>
          <th>17,5 cm</th>
          <th>20 cm</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Vaša veľkosť</td>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
        </tr>
        </tbody>
      </table>

      <h4 className="font-medium">
        Veľkosť nohavíc
      </h4>
      <table>
        <thead>
        <tr>
          <th>Obvod bokov</th>
          <th>87-90 cm</th>
          <th>91-94 cm</th>
          <th>95-98 cm</th>
          <th>99-104 cm</th>
          <th>105-109 cm</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Vaša veľkosť</td>
          <td>XS</td>
          <td>S</td>
          <td>M</td>
          <td>L</td>
          <td>XL</td>
        </tr>
        </tbody>
      </table>

    </section>
  )
}
