import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { PagesLayout, Props } from 'layouts/Pages'

const TermsOfUsePage = (props: Props) => {
  return (
    <>
      <MetaSEO title="Termos de uso" pathUrl="/termos-de-uso" />

      <Header />

      <PagesLayout {...props} />

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
