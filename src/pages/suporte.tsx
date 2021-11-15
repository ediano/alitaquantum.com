import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { SupportProps } from 'types/home'

import { Header } from 'components/Header'
import { SupportLayout } from 'layouts/Support'
import { Footer } from 'components/Footer'

const SupportPage = (props: SupportProps) => {
  return (
    <>
      <NextSeo
        title="Suporte"
        canonical={getUrl('/suporte')}
        openGraph={{
          url: site.url,
          title: `Suporte | ${site.title}`,
          description: props.welcome.description,
          site_name: site.name,
          images: [{ url: getUrl(site.favicon), alt: site.name }]
        }}
      />

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
