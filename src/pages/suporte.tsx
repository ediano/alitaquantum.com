import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { PagesLayout, Props } from 'layouts/Pages'
import { Footer } from 'components/Footer'

const SupportPage = (props: Props) => {
  return (
    <>
      <MetaSEO title="Suporte" pathUrl="/suporte" />

      <Header />

      <PagesLayout {...props} />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes: welcome, body: welcomeBody } = await import(
    'content/pages/support/welcome.md'
  )

  return {
    props: {
      ...welcome,
      body: welcomeBody
    }
  }
}

export default SupportPage
