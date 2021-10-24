import { Exchange } from 'components/Exchange'
import { AnchorButton } from 'components/AnchorButton'

import { site } from 'config/site'

import * as S from './styles'

export const FullScreen = () => {
  return (
    <S.Container>
      <S.Image
        src="/img/map.svg"
        layout="fill"
        quality={100}
        placeholder="blur"
        blurDataURL="/img/map.svg"
      />

      <S.Wrapper>
        <S.Content>
          <S.Title>{site.description}</S.Title>
        </S.Content>

        <S.ExchangeWrapper>
          <Exchange>
            <AnchorButton
              title="Trocar"
              href="/exchange"
              style={{ marginTop: '25px' }}
            />
          </Exchange>
        </S.ExchangeWrapper>
      </S.Wrapper>
    </S.Container>
  )
}
