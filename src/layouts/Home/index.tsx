import Steps from 'components/Steps'
import Suggestion from 'components/Suggestion'
import Transparency from 'components/Transparency'
import About from 'components/About'

import { HomeProps } from 'types/home'

import * as S from './styles'

export const HomeLayout = ({
  suggestions,
  steps,
  transparency,
  about
}: HomeProps) => {
  return (
    <S.Main>
      <Steps {...steps} />
      <Suggestion suggestions={suggestions} />
      <Transparency {...transparency} />
      <About {...about} />
    </S.Main>
  )
}
