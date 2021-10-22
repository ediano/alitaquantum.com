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

const Home = ({ suggestions, steps }: HomeProps) => {
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
          <Steps {...steps} />

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

  const { attributes: steps } = await import('content/pages/home/steps.md')

  return {
    props: { suggestions, steps }
  }
}

export default Home
