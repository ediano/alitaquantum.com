import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { PagesLayout, Props } from 'layouts/Pages'

const PrivacyPolicyPage = (props: Props) => {
  return (
    <>
      <MetaSEO
        title="Politica de privacidade"
        pathUrl="/politica-de-privacidade"
      />

      <Header />

      <PagesLayout {...props} />

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
