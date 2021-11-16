import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { SupportProps } from 'types/home'

import { Header } from 'components/Header'
import { SupportLayout } from 'layouts/Support'
import { Footer } from 'components/Footer'

const SupportPage = (props: SupportProps) => {
  return (
    <>
      <MetaSEO title="Suporte" pathUrl="/suporte" />

      <Header />

      <SupportLayout {...props} />

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
      welcome: { ...welcome, body: welcomeBody }
    }
  }
}

export default SupportPage
