import {
  SuggestionsProps,
  StepsProps,
  AboutProps,
  TransparencyProps,
  SupportWelcomeProps,
  FAQContentProps
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

export type FAQProps = {
  title: string
  content: FAQContentProps[]
}
