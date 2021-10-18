import { Form } from 'components/Form'

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

        <S.Form>
          <Form />
        </S.Form>

        <S.Footer>footer</S.Footer>
      </S.Wrapper>
    </S.Container>
  )
}
