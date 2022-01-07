import Image from 'next/image'
import { Exchange } from 'components/Exchange'
import { AnchorButton } from 'components/AnchorButton'

import { site } from 'config/site'
import { useExchange } from 'context/exchange'

import * as S from './styles'

export const Hero = () => {
  const { dataFlow, estimatedAmount } = useExchange()
  const { fromAmount, fromName, toName } = dataFlow

  return (
    <S.Container>
      <S.Image
        alt="wallpaper map"
        src="/img/map.svg"
        layout="fill"
        quality={100}
        placeholder="blur"
        blurDataURL="/img/map.svg"
      />

      <S.Wrapper>
        <S.Block>
          <div>
            <S.Title>{site.description}</S.Title>

            <S.LinkGuarda
              href="https://grd.to/ref/bfdY"
              target="_blank"
              aria-label="Guarda Wallet"
              title="Guarda Wallet"
              rel="nofollow noopener noreferrer"
            >
              <span>Carteira recomendada</span>
              <Image
                width="22"
                height="22"
                src="/img/logos/guarda.svg"
                alt="Guarda Wallet"
              />
            </S.LinkGuarda>
          </div>

          <S.CoinMarketCap
            href="https://coinmarketcap.com/invite?ref=0FVQPWSC"
            target="_blank"
            aria-label="CoinMarketCap"
            title="CoinMarketCap"
            rel="nofollow noopener noreferrer"
          >
            <Image
              width="42"
              height="42"
              src="/img/logos/coinmarketcap.png"
              alt="CoinMarketCap"
            />
            <span>Ganhe diamantes diariamente e troque por recompensas</span>
          </S.CoinMarketCap>
        </S.Block>

        <S.ExchangeWrapper>
          <Exchange />

          <AnchorButton
            uppercase
            disabled={estimatedAmount === '0'}
            title="Trocar"
            href={{
              pathname: '/trocar',
              query: {
                fromAmount,
                fromName,
                toName
              }
            }}
            style={{ marginTop: '50px' }}
          />
        </S.ExchangeWrapper>
      </S.Wrapper>
    </S.Container>
  )
}
