import { Steps } from 'components/Steps'
import { Suggestion } from 'components/Suggestion'
import { About } from 'components/About'

import { HomeProps } from 'types/pages'

import * as S from './styles'

export const HomeLayout = ({ suggestions, steps, about }: HomeProps) => {
  return (
    <S.Main>
      <Steps {...steps} />
      <Suggestion suggestions={suggestions} />
      <About {...about} />
    </S.Main>
  )
}
