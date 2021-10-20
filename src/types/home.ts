export type SuggestionsProps = {
  title: string
  image: { src: string; alt?: string }
  description: string
}

export type HomeProps = {
  suggestions: SuggestionsProps[]
}
