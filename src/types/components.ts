import { TableType } from 'components/Table'

export type SuggestionsProps = {
  title: string
  link?: string
  image?: { src: string }
  description: string
}

export type StepsProps = {
  title: string
  itens: Array<{ item: string; position: string }>
  description: string
}

export type ComparisonsProps = {
  title?: string
  identifications: TableType
  functionalities: TableType
}

export type AboutProps = {
  title: string
  body: string
}

export type SupportWelcomeProps = {
  title: string
  description: string
  body: string
}

export type FAQContentProps = {
  title: string
  description: string
}
