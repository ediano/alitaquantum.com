import { Steps } from 'components/Steps'
import { Suggestion } from 'components/Suggestion'
import { Table } from 'components/Table'
import { About } from 'components/About'

import { HomeProps } from 'types/pages'

import * as S from './styles'

export const HomeLayout = ({
  suggestions,
  steps,
  about,
  comparisons
}: HomeProps) => {
  return (
    <S.Main>
      <Steps {...steps} />
      <Suggestion suggestions={suggestions} />

      <Table title={comparisons.title} table={comparisons.identifications} />
      <Table table={comparisons.functionalities} />

      <About {...about} />
    </S.Main>
  )
}
