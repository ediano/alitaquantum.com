import {
  SuggestionsProps,
  StepsProps,
  AboutProps,
  TransparencyProps,
  SupportWelcomeProps
} from './components'

export type HomeProps = {
  suggestions: SuggestionsProps[]
  steps: StepsProps
  about: AboutProps
  transparency: TransparencyProps
}

export type SupportProps = {
  welcome: SupportWelcomeProps
}
