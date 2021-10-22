export type SuggestionsProps = {
  title: string
  catchphrase: string
  image: { src: string }
  description: string
}

export type StepsProps = {
  title: string
  itens: Array<{ item: string; position: string }>
  description: string
}
