export type SuggestionsProps = {
  title: string
  link: string
  image: { src: string; alt: string }
  description: string
}

export type StepsProps = {
  title: string
  itens: Array<{ item: string; position: string }>
  description: string
}

export type TransparencyProps = {
  title: string
  content: Array<{ description: string; image: string; alt: string }>
}

export type AboutProps = {
  title: string
  body: string
}
