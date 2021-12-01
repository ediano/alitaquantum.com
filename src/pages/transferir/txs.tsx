import { MetaSEO } from 'components/MetaSEO'

import { Header } from 'components/Header'
import { TXSLayout } from 'layouts/TXS'
import { Footer } from 'components/Footer'

const TXSPage = () => {
  return (
    <>
      <MetaSEO
        noFollow={true}
        noIndex={true}
        title="Transferir moedas"
        pathUrl="/transferir/txs"
      />

      <Header />

      <TXSLayout />

      <Footer />
    </>
  )
}

export default TXSPage
