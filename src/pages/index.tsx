import { GetStaticProps } from 'next'

import { ExchangeProvider } from 'context/exchange'
import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { Hero } from 'components/Hero'
import { HomeLayout } from 'layouts/Home'
import { Footer } from 'components/Footer'

import { HomeProps } from 'types/pages'

const HomePage = (props: HomeProps) => {
  return (
    <>
      <MetaSEO />

      <ExchangeProvider>
        <Header isHero>
          <Hero />
        </Header>
      </ExchangeProvider>

      <HomeLayout {...props} />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { attributes: suggestions } = await import(
    'content/pages/home/suggestions.md'
  )

  const { attributes: steps } = await import('content/pages/home/steps.md')

  const { attributes: comparisons } = await import(
    'content/pages/home/comparisons.md'
  )

  const { attributes: about, body: aboutBody } = await import(
    'content/pages/home/about.md'
  )

  return {
    props: {
      suggestions,
      steps,
      comparisons,
      about: { ...about, body: aboutBody }
    }
  }
}

export default HomePage
