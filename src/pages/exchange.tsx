import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { ExchangeProvider } from 'context/exchange'
import { Exchange } from 'components/Exchange'

const ExchangePage = () => {
  const router = useRouter()
  if (router.isFallback) return

  return (
    <ExchangeProvider>
      <Exchange />
    </ExchangeProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export default ExchangePage
