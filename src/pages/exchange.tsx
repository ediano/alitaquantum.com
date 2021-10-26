import { NextSeo } from 'next-seo'

import { useExchange } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

import { ValidatingTransaction } from 'components/ValidatingTransaction'
import { Exchange } from 'components/Exchange'
import { AnchorButton } from 'components/AnchorButton'

import * as S from 'styles/pages/exchange'

const ExchangePage = () => {
  const { flowCoins } = useExchange()
  return (
    <>
      <NextSeo
        title={'Exchange'}
        canonical={getUrl('/exchange')}
        openGraph={{
          url: getUrl('/exchange'),
          title: `Exchange | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <S.Main>
        <S.Wrapper>
          <div>Pronto para iniciar as traca de seus {flowCoins?.fromName} </div>
          <ValidatingTransaction>
            <Exchange />
          </ValidatingTransaction>

          <AnchorButton
            title="Depositar"
            href="/depositar"
            background="secondary"
            style={{ maxWidth: '300px', margin: '50px auto 0 auto' }}
          />
        </S.Wrapper>
      </S.Main>

      <Footer />
    </>
  )
}

export default ExchangePage
