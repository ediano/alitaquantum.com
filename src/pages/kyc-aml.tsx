import { GetStaticProps } from 'next'

import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { PagesLayout, Props } from 'layouts/Pages'
import { Footer } from 'components/Footer'

const KYCAMLPage = (props: Props) => {
  return (
    <>
      <MetaSEO title="KYC/AML" pathUrl="/kyc-aml" />

      <Header />

      <PagesLayout {...props} />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes: kycAml, body: kycAmlBody } = await import(
    'content/pages/kyc-aml.md'
  )

  return {
    props: {
      ...kycAml,
      body: kycAmlBody
    }
  }
}

export default KYCAMLPage
