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

const PrivacyPolicyPage = (props: BodyMarkdownProps) => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={`Politica de privacidade | ${site.name}`}
        description={site.description}
        canonical={getUrl('/politica-de-privacidade')}
        openGraph={{
          title: `Politica de privacidade | ${site.name}`,
          description: site.description,
          images: [{ url: getUrl(site.favicon), alt: site.name }]
        }}
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
