import { ReactNode } from 'react'
import Image from 'next/image'

import * as S from './styles'

type Props = {
  children: ReactNode
}

export const HeroBackground = ({ children }: Props) => {
  return (
    <S.Container>
      <S.Background>
        <S.Image
          alt="Capa Alita Quantum"
          src="/img/pages/capa.png"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/img/pages/capa.png"
        />
      </S.Background>

      <S.Wrapper>
        <main>{children}</main>

        <aside>
          <S.CoinMarketCap
            href="https://coinmarketcap.com/invite?ref=0FVQPWSC"
            target="_blank"
            aria-label="CoinMarketCap"
            title="CoinMarketCap"
            rel="nofollow noopener noreferrer"
          >
            <Image
              width="50"
              height="50"
              src="/img/logos/coinmarketcap.png"
              alt="CoinMarketCap"
            />
            <span>Ganhe diamantes diariamente e troque por recompensas</span>
          </S.CoinMarketCap>
        </aside>
      </S.Wrapper>
    </S.Container>
  )
}
