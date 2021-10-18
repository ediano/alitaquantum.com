import Head from 'next/head'
import { NextSeo } from 'next-seo'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { FullScreen } from 'components/FullScreen'
import { Footer } from 'components/Footer'

const Home = () => {
  return (
    <>
      <Head>
        <title>{site.name}</title>
      </Head>

      <NextSeo
        title={site.description}
        canonical={getUrl('/')}
        openGraph={{
          url: site.url,
          title: `${site.name} | ${site.title}`,
          description: site.description,
          site_name: site.name,
          images: [
            {
              url: getUrl(site.favicon),
              alt: site.name
            }
          ]
        }}
      />

      <Header>
        <FullScreen />
      </Header>

      <Footer />
    </>
  )
}

export default Home
