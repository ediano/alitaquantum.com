import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import {
  BodyMarkdown,
  Props as BodyMarkdownProps
} from 'components/BodyMarkdown'
import { Footer } from 'components/Footer'

const PrivacyPolicyPage = (props: BodyMarkdownProps) => {
  return (
    <>
      <MetaSEO
        title="Politica de privacidade"
        pathUrl="/politica-de-privacidade"
      />

      <Header />

      <BodyMarkdown {...props} />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes, body } = await import('content/pages/privacy-policy.md')

  return {
    props: {
      ...attributes,
      body
    }
  }
}

export default PrivacyPolicyPage
