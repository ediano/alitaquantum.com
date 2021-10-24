import Head from 'next/head'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { FullScreen } from 'components/FullScreen'
import { Steps } from 'components/Steps'
import { Suggestion } from 'components/Suggestion'
import { Transparency } from 'components/Transparency'
import { About } from 'components/About'
import { Footer } from 'components/Footer'

import * as S from 'styles/pages/home'

import { HomeProps } from 'types/home'

const HomePage = ({ suggestions, steps, transparency, about }: HomeProps) => {
  return (
    <ExchangeProvider>
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
        <Steps {...steps} />
        <Suggestion suggestions={suggestions} />
        <Transparency {...transparency} />
        <About {...about} />
      </S.Main>

      <Footer />
    </ExchangeProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes: suggestions } = await import(
    'content/pages/home/suggestions.md'
  )

  const { attributes: steps } = await import('content/pages/home/steps.md')

  const { attributes: transparency } = await import(
    'content/pages/home/transparency.md'
  )

  const { attributes: about, body: aboutBody } = await import(
    'content/pages/home/about.md'
  )

  return {
    props: {
      suggestions,
      steps,
      transparency,
      about: { ...about, body: aboutBody }
    }
  }
}

export default HomePage
