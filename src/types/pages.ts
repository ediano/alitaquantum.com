import {
  SuggestionsProps,
  StepsProps,
  AboutProps,
  SupportWelcomeProps,
  FAQContentProps,
  ComparisonsProps
} from './components'

export type HomeProps = {
  suggestions: SuggestionsProps[]
  steps: StepsProps
  about: AboutProps
  comparisons: ComparisonsProps
}

export type SupportProps = {
  welcome: SupportWelcomeProps
}

export type FAQProps = {
  title: string
  content: FAQContentProps[]
}
