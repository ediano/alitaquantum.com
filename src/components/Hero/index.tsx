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
          <S.Title>{site.description}</S.Title>
        </S.Block>

        <S.ExchangeWrapper>
          <Exchange />

          <AnchorButton
            uppercase
            disabled={estimatedAmount === '0'}
            title="Trocar"
            href={{
              pathname: '/trocar',
              query: { fromAmount, fromName, toName }
            }}
            style={{ marginTop: '50px' }}
          />
        </S.ExchangeWrapper>
      </S.Wrapper>
    </S.Container>
  )
}
