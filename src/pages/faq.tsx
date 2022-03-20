import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'
import { FAQProps } from 'types/pages'

import { Header } from 'components/Header'
import { FAQLayout } from 'layouts/FAQ'
import { Footer } from 'components/Footer'

const FAQPage = (props: FAQProps) => {
  return (
    <>
      <MetaSEO title="F.A.Q." pathUrl="/faq" />

      <Header />

      <FAQLayout {...props} />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes: faq } = await import('content/pages/faq.md')
  return { props: faq }
}

export default FAQPage
