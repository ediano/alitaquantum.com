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
          <S.BlockAside>
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
          </S.BlockAside>

          <S.BlockAside>
            <S.LinkGuarda
              href="https://grd.to/ref/bfdY"
              target="_blank"
              aria-label="Guarda Wallet"
              title="Guarda Wallet"
              rel="nofollow noopener noreferrer"
            >
              <span>Carteira recomendada</span>
              <Image
                width="32"
                height="32"
                src="/img/logos/guarda.svg"
                alt="Guarda Wallet"
              />
            </S.LinkGuarda>
          </S.BlockAside>
        </aside>
      </S.Wrapper>
    </S.Container>
  )
}
