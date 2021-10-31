import { NextSeo } from 'next-seo'

import { ExchangeProvider } from 'context/exchange'

import { site } from 'config/site'
import { getUrl } from 'utils/getUrl'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const TXSPage = () => {
  return (
    <ExchangeProvider>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="Trocando moedas"
        canonical={getUrl('/exchange/txs')}
        openGraph={{
          url: getUrl('/exchange/txs'),
          title: `Trocando moedas | ${site.name}`,
          description: site.description,
          site_name: site.name
        }}
      />

      <Header />

      <div>
        Consectetur eiusmod elit cupidatat deserunt amet Lorem adipisicing anim
        adipisicing labore dolore ea nulla labore. Occaecat do officia voluptate
        esse cillum id sint adipisicing. Anim velit et deserunt sit cupidatat
        culpa. Id mollit proident do cupidatat. Deserunt veniam excepteur magna
        officia reprehenderit eu. Exercitation sit mollit qui labore dolore aute
        esse eiusmod incididunt nisi officia laborum ipsum. In qui ut aliquip
        officia ad pariatur voluptate voluptate. Consequat ex ut velit nostrud
        est cupidatat. Elit deserunt mollit amet veniam voluptate deserunt
        ullamco. Qui sit irure consectetur ut eu ex culpa dolor commodo. Fugiat
        reprehenderit ea consectetur ad est fugiat non non adipisicing
        consectetur exercitation pariatur. Aute dolor cupidatat occaecat est
        reprehenderit amet incididunt commodo ipsum. Commodo reprehenderit
        cillum ullamco sint ipsum labore. Incididunt mollit voluptate consequat
        mollit pariatur nulla fugiat aliquip. Id ad ipsum duis proident laborum
        mollit. Irure dolor quis reprehenderit excepteur occaecat. Pariatur nisi
        anim eiusmod proident enim. Commodo eiusmod ad consectetur deserunt
        laboris mollit pariatur sunt aliquip minim excepteur voluptate
        consequat. Incididunt eu non in sunt non reprehenderit mollit aliquip
        et. Aliquip Lorem pariatur dolor reprehenderit duis nostrud id duis.
      </div>

      <Footer />
    </ExchangeProvider>
  )
}

export default TXSPage
