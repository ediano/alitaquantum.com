import {
  SuggestionsProps,
  StepsProps,
  AboutProps,
  SupportWelcomeProps,
  FAQContentProps
} from './components'

export type HomeProps = {
  suggestions: SuggestionsProps[]
  steps: StepsProps
  about: AboutProps
}

export type SupportProps = {
  welcome: SupportWelcomeProps
}

export type FAQProps = {
  title: string
  content: FAQContentProps[]
}
