import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import {
  BodyMarkdown,
  Props as BodyMarkdownProps
} from 'components/BodyMarkdown'
import { Footer } from 'components/Footer'

const TermsOfUsePage = (props: BodyMarkdownProps) => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="Termos de uso"
        canonical={getUrl('/termos-de-uso')}
        openGraph={{
          title: `Termos de uso | ${site.title}`
        }}
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
