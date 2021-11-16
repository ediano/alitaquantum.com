import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import {
  BodyMarkdown,
  Props as BodyMarkdownProps
} from 'components/BodyMarkdown'
import { Footer } from 'components/Footer'

const TermsOfUsePage = (props: BodyMarkdownProps) => {
  return (
    <>
      <MetaSEO
        noIndex={true}
        noFollow={true}
        title="Termos de uso"
        pathUrl="/termos-de-uso"
      />

      <Header />

      <BodyMarkdown {...props} />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes, body } = await import('content/pages/terms-of-use.md')

  return {
    props: {
      ...attributes,
      body
    }
  }
}

export default TermsOfUsePage
