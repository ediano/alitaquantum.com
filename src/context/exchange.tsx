import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  MouseEvent
} from 'react'
import { useRouter } from 'next/router'

import ChangeNow, { Currencies } from 'services/ChangeNowService'

const initialProps = {
  fromName: 'Bitcoin',
  fromCurrency: 'btc',
  fromNetwork: 'btc',
  fromId: false,
  fromImage: 'https://changenow.io/images/sprite/currencies/btc.svg',
  toName: 'Ethereum',
  toCurrency: 'eth',
  toNetwork: 'eth',
  toId: false,
  toImage: 'https://changenow.io/images/sprite/currencies/eth.svg',
  fromAmount: '0',
  minAmount: '0'
}

type DataFlow = typeof initialProps

type Query = {
  fromAmount?: string
  fromName?: string
  toName?: string
}

type ContextProps = {
  currencies: Currencies[]
  dataFlow: DataFlow
  estimatedAmount: string
  transactionSpeedForecast: string
  isAlert: boolean
  handlerInputFromAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlerInputCurrencyChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlerReverseCurrencyClick: (event: MouseEvent) => void
}

const storage = {
  set: (data: Currencies[]) => {
    localStorage.setItem('alitaquantum.com@currencies', JSON.stringify(data))
  },
  get: (): Currencies[] | null => {
    const data = localStorage.getItem('alitaquantum.com@currencies')
    return data && JSON.parse(data)
  }
}

const multiplies = (value: number, x: number = 250) => {
  return String((value * x).toFixed(8))
}

const ExchangeContext = createContext<ContextProps>({} as ContextProps)

type Props = {
  children: ReactNode
}

export const ExchangeProvider = ({ children }: Props) => {
  const { pathname, push, asPath } = useRouter()
  const query = useRouter().query as Query

  const [currencies, setCurrencies] = useState<Currencies[]>([])
  const [dataFlow, setDataFlow] = useState<DataFlow>(initialProps)

  const [isQueryLoaded, setIsQueryLoaded] = useState(false)
  const [estimatedAmount, setEstimatedAmount] = useState('')
  const [transactionSpeedForecast, setTransactionSpeedForecast] = useState('')

  const [isAlert, setIsAlert] = useState(false)

  useEffect(() => {
    async function loading() {
      try {
        const response = await ChangeNow.getCurrencies()
        setCurrencies(response.data)

        storage.set(response.data)
      } catch (err) {}
    }
    loading()
  }, [])

  const handlerEstimatedAmountByTheFromAmount = useCallback(
    async (value: string) => {
      if (Number(value) >= Number(dataFlow.minAmount)) {
        try {
          setEstimatedAmount('')
          const { data: estimated } = await ChangeNow.getEstimatedAmount({
            fromCurrency: dataFlow.fromCurrency,
            fromNetwork: dataFlow.fromNetwork,
            toCurrency: dataFlow.toCurrency,
            toNetwork: dataFlow.toNetwork,
            fromAmount: value
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )
        } catch (err) {
          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa indisponivel!')
        }
      } else {
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
      }
    },
    [dataFlow]
  )

  const handlerInputFromAmountChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target
      const [natural, tenths] = value.split('.')
      const limit = (!tenths || tenths.length <= 8) && natural.length <= 10

      const { minAmount } = dataFlow
      if (Number(value) < Number(minAmount)) {
        setIsAlert(true)
      } else {
        setIsAlert(false)
      }

      if (Number(value) >= 0 && name === 'fromAmount' && limit) {
        setDataFlow((state) => ({ ...state, [name]: value }))

        handlerEstimatedAmountByTheFromAmount(value)

        if (pathname === '/exchange') {
          const { fromName, toName } = dataFlow

          push(
            {
              pathname: '/exchange',
              query: { fromAmount: value, fromName, toName }
            },
            undefined,
            { shallow: true }
          )
        }
      }
    },
    [pathname, push, dataFlow, handlerEstimatedAmountByTheFromAmount]
  )

  const handlerEstimatedAmount = useCallback(
    async (state: DataFlow) => {
      const { fromName, toName } = state
      const { fromCurrency, fromNetwork, toCurrency, toNetwork } = state

      if (fromNetwork && toNetwork) {
        try {
          setEstimatedAmount('')
          const { data: range } = await ChangeNow.getRange({
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork
          })

          const minAmount = range.minAmount
          const fromAmount = multiplies(minAmount)

          setDataFlow((state) => ({
            ...state,
            fromAmount,
            minAmount: String(minAmount)
          }))

          if (pathname === '/exchange') {
            push(
              {
                pathname: '/exchange',
                query: {
                  fromAmount,
                  fromName,
                  toName
                }
              },
              undefined,
              { shallow: true }
            )
          }

          const { data: estimated } = await ChangeNow.getEstimatedAmount({
            fromAmount,
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )
        } catch (err) {
          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa indisponivel!')
          setDataFlow((state) => ({
            ...state,
            fromAmount: '0'
          }))

          if (pathname === '/exchange') {
            push(
              {
                pathname: '/exchange',
                query: {
                  fromAmount: '0',
                  fromName,
                  toName
                }
              },
              undefined,
              { shallow: true }
            )
          }
        }
      }
    },
    [pathname, push]
  )

  const handlerInputCurrencyChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      console.log(event.type)

      const isFocus = event.type === 'focus'

      const currency = currencies.find((currency) => currency.name === value)

      setDataFlow((state) => {
        if (name === 'fromName') {
          if (isFocus) setDataFlow((state) => ({ ...state, fromName: '' }))

          const data = {
            ...state,
            fromName: currency?.name || value,
            fromCurrency: currency?.ticker || '',
            fromNetwork: currency?.network || '',
            fromId: currency?.hasExternalId || false,
            fromImage: currency?.image || ''
          }

          if (currency?.network) handlerEstimatedAmount(data)

          return data
        }

        if (name === 'toName') {
          if (isFocus) setDataFlow((state) => ({ ...state, toName: '' }))

          const data = {
            ...state,
            toName: currency?.name || value,
            toCurrency: currency?.ticker || '',
            toNetwork: currency?.network || '',
            toId: currency?.hasExternalId || false,
            toImage: currency?.image || ''
          }

          if (currency?.network) handlerEstimatedAmount(data)

          return data
        }

        if (currency?.network) handlerEstimatedAmount(state)

        return state
      })
    },
    [currencies, handlerEstimatedAmount]
  )

  const handlerReverseCurrencyClick = useCallback(async () => {
    setIsAlert(false)

    const {
      fromName,
      fromCurrency,
      fromNetwork,
      fromId,
      fromImage,
      toName,
      toCurrency,
      toNetwork,
      toId,
      toImage
    } = dataFlow

    setDataFlow((state) => ({
      ...state,
      fromName: toName,
      fromCurrency: toCurrency,
      fromNetwork: toNetwork,
      fromId: toId,
      fromImage: toImage,
      toName: fromName,
      toCurrency: fromCurrency,
      toNetwork: fromNetwork,
      toId: fromId,
      toImage: fromImage
    }))

    try {
      setEstimatedAmount('')
      const { data: range } = await ChangeNow.getRange({
        fromCurrency: toCurrency,
        fromNetwork: toNetwork,
        toCurrency: fromCurrency,
        toNetwork: fromNetwork
      })

      const minAmount = range.minAmount
      const fromAmount = multiplies(minAmount)

      setDataFlow((state) => ({
        ...state,
        fromAmount,
        minAmount: String(minAmount)
      }))

      if (pathname === '/exchange') {
        push(
          {
            pathname: '/exchange',
            query: {
              fromAmount,
              fromName: toName,
              toName: fromName
            }
          },
          undefined,
          { shallow: true }
        )
      }

      const { data: estimated } = await ChangeNow.getEstimatedAmount({
        fromAmount,
        fromCurrency: toCurrency,
        fromNetwork: toNetwork,
        toCurrency: fromCurrency,
        toNetwork: fromNetwork
      })

      setEstimatedAmount(String(estimated.toAmount))
      setTransactionSpeedForecast(
        estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
      )
    } catch (err) {
      setEstimatedAmount('0')
      setTransactionSpeedForecast('Estimativa indisponivel!')
      setDataFlow((state) => ({
        ...state,
        fromAmount: '0',
        minAmount: '0'
      }))

      if (pathname === '/exchange') {
        push(
          {
            pathname: '/exchange',
            query: {
              fromAmount: '0',
              fromName: toName,
              toName: fromName
            }
          },
          undefined,
          { shallow: true }
        )
      }
    }
  }, [pathname, push, dataFlow])

  const handlerInitialStates = useCallback(async () => {
    const initialData = {
      fromCurrency: 'btc',
      fromNetwork: 'btc',
      toCurrency: 'eth',
      toNetwork: 'eth'
    }

    try {
      setEstimatedAmount('')
      const { data: range } = await ChangeNow.getRange(initialData)

      const minAmount = range.minAmount
      const fromAmount = multiplies(minAmount)

      setDataFlow((state) => ({
        ...state,
        fromAmount,
        minAmount: String(minAmount)
      }))

      const { data: estimated } = await ChangeNow.getEstimatedAmount({
        ...initialData,
        fromAmount
      })

      setEstimatedAmount(String(estimated.toAmount))
      setTransactionSpeedForecast(
        estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
      )
    } catch (err) {
      setEstimatedAmount('0')
    }
  }, [])

  useEffect(() => {
    if (pathname === '/' || (pathname === '/exchange' && pathname === asPath)) {
      handlerInitialStates()
    }
  }, [handlerInitialStates, asPath, pathname])

  const handlerStartPageExchangeQuery = useCallback(async () => {
    const { fromAmount, fromName, toName } = query

    const coins = storage.get() || currencies

    const from = coins.find((coin: Currencies) => coin.name === fromName)
    const to = coins.find((coin: Currencies) => coin.name === toName)

    if (from?.ticker && to?.ticker) {
      setIsQueryLoaded(true)

      setDataFlow((state) => ({
        ...state,
        fromAmount: fromAmount || '0',
        fromName: from.name,
        fromCurrency: from.ticker,
        fromNetwork: from.network,
        fromId: from.hasExternalId,
        fromImage: from.image,
        toName: to.name,
        toCurrency: to.ticker,
        toNetwork: to.network,
        toId: to.hasExternalId,
        toImage: to.image
      }))

      try {
        setEstimatedAmount('')
        if (fromAmount) {
          const dataRequest = {
            fromCurrency: from.ticker,
            fromNetwork: from.network,
            toCurrency: to.ticker,
            toNetwork: to.network
          }

          const [range, estimated] = await Promise.allSettled([
            ChangeNow.getRange(dataRequest),
            ChangeNow.getEstimatedAmount({ ...dataRequest, fromAmount })
          ])

          if (range.status === 'fulfilled') {
            setDataFlow((state) => ({
              ...state,
              fromAmount,
              minAmount: String(range.value.data.minAmount)
            }))
          } else {
            setDataFlow((state) => ({ ...state, fromAmount, minAmount: '0' }))
          }

          if (estimated.status === 'fulfilled') {
            const { toAmount, transactionSpeedForecast } = estimated.value.data
            setEstimatedAmount(String(toAmount))
            setTransactionSpeedForecast(
              transactionSpeedForecast || 'Estimativa indisponivel!'
            )
          } else {
            setEstimatedAmount('0')
            setTransactionSpeedForecast('Estimativa indisponivel!')
          }
        } else {
          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa indisponivel!')
        }
      } catch (err) {
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
        setDataFlow((state) => ({ ...state, fromAmount: '0', minAmount: '0' }))
      }
    }
  }, [query, currencies])

  useEffect(() => {
    if (pathname === '/exchange' && pathname !== asPath && !isQueryLoaded) {
      handlerStartPageExchangeQuery()
    }
  }, [handlerStartPageExchangeQuery, asPath, isQueryLoaded, pathname])

  useEffect(() => {
    if (Number(dataFlow.fromAmount) < Number(dataFlow.minAmount)) {
      setEstimatedAmount('0')
    }
  }, [dataFlow.fromAmount, dataFlow.minAmount, estimatedAmount])

  return (
    <ExchangeContext.Provider
      value={{
        currencies,
        dataFlow,
        estimatedAmount,
        transactionSpeedForecast,
        isAlert,
        handlerInputFromAmountChange,
        handlerReverseCurrencyClick,
        handlerInputCurrencyChange
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}

export const useExchange = () => {
  const context = useContext(ExchangeContext)
  if (!context) {
    throw new Error('Cannot use `useExchange` outside of a ExchangeProvider')
  }
  return context
}
