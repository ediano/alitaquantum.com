import Head from 'next/head'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { FullScreen } from 'components/FullScreen'
import { Steps } from 'components/Steps'
import { Suggestion } from 'components/Suggestion'
import { Footer } from 'components/Footer'

import * as S from 'styles/pages/home'

import { HomeProps } from 'types/home'

const Home = ({ suggestions }: HomeProps) => {
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

      <S.Main>
        <S.Container>
          <Steps />

          {suggestions.map((item) => (
            <Suggestion key={item.title} {...item} />
          ))}
        </S.Container>
      </S.Main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes: suggestions } = await import(
    'content/pages/home/suggestions.md'
  )

  return {
    props: { suggestions }
  }
}

export default Home
