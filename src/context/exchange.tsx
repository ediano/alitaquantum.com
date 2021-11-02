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

import Api from 'services/ApiService'
import { Currencies } from 'services/ChangeNowService'

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

type PreviousCurrency = {
  name: string
  currency: string
  network: string
  id: boolean
  image: string
}

type ContextProps = {
  currencies: Currencies[]
  dataFlow: DataFlow
  minAmount: string
  estimatedAmount: string
  transactionSpeedForecast: string
  isAlert: boolean
  handlerInputFromAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlerInputCurrencyChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlerReverseCurrencyClick: (event: MouseEvent) => void
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
  const [previousCurrency, setPreviousCurrency] = useState<PreviousCurrency>(
    {} as PreviousCurrency
  )

  const [isQueryLoaded, setIsQueryLoaded] = useState(false)
  const [minAmount, setMinAmount] = useState('0')
  const [estimatedAmount, setEstimatedAmount] = useState('0')
  const [transactionSpeedForecast, setTransactionSpeedForecast] = useState('')

  const [isAlert, setIsAlert] = useState(false)

  const handlerInputFromAmountChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()

      const { value, name } = event.target
      const [natural, tenths] = value.split('.')
      const limit = (!tenths || tenths.length <= 8) && natural.length <= 10

      if (Number(value) >= 0 && name === 'fromAmount' && limit) {
        setDataFlow((state) => ({ ...state, [name]: value }))

        const { fromCurrency, fromNetwork, toCurrency, toNetwork } = dataFlow

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

        if (Number(value) >= Number(minAmount)) {
          setIsAlert(false)

          try {
            const { data: estimated } = await Api.getEstimatedAmount({
              fromCurrency,
              fromNetwork,
              toCurrency,
              toNetwork,
              fromAmount: value
            })

            setEstimatedAmount(String(estimated.toAmount))
          } catch (err) {
            setEstimatedAmount('0')
          }
        } else {
          setEstimatedAmount('0')
          setIsAlert(true)
        }
      }
    },
    [pathname, push, dataFlow, minAmount]
  )

  const handlerStartLoadingEstimatedAmount = useCallback(
    async (state: DataFlow) => {
      const { fromName, toName } = state
      const { fromCurrency, fromNetwork, toCurrency, toNetwork } = state

      if (fromNetwork && toNetwork) {
        try {
          const { data: range } = await Api.getRange({
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork
          })

          const minAmount = String(range.minAmount)

          const newFromAmount = (range.minAmount * 10).toFixed(8)

          setDataFlow((state) => ({
            ...state,
            fromAmount: newFromAmount,
            minAmount
          }))

          if (pathname === '/exchange') {
            push(
              {
                pathname: '/exchange',
                query: {
                  fromAmount: newFromAmount,
                  fromName,
                  toName
                }
              },
              undefined,
              { shallow: true }
            )
          }

          const { data: estimated } = await Api.getEstimatedAmount({
            fromAmount: String(newFromAmount),
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
      }
    },
    [pathname, push]
  )

  const handlerInputCurrencyChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      const { value, name } = event.target

      const currency = currencies.find((currency) => currency.name === value)

      if (!previousCurrency.name && name === 'fromName') {
        setPreviousCurrency({
          currency: dataFlow.fromCurrency,
          name: dataFlow.fromName,
          network: dataFlow.fromNetwork,
          id: dataFlow.fromId,
          image: dataFlow.fromImage
        })
      }

      if (!previousCurrency.name && name === 'toName') {
        setPreviousCurrency({
          currency: dataFlow.toCurrency,
          name: dataFlow.toName,
          network: dataFlow.toNetwork,
          id: dataFlow.toId,
          image: dataFlow.toImage
        })
      }

      setDataFlow((state) => {
        if (name === 'fromName' && value === state.toName) {
          if (currency?.network) handlerStartLoadingEstimatedAmount(state)

          return {
            ...state,
            fromName: state.toName,
            fromCurrency: state.toCurrency,
            fromNetwork: state.toNetwork,
            fromId: state.toId,
            fromImage: state.toImage,
            toName: previousCurrency.name,
            toCurrency: previousCurrency.currency,
            toNetwork: previousCurrency.network,
            toId: previousCurrency.id,
            toImage: previousCurrency.image
          }
        } else if (name === 'toName' && value === state.fromName) {
          if (currency?.network) handlerStartLoadingEstimatedAmount(state)

          return {
            ...state,
            fromName: previousCurrency.name,
            fromCurrency: previousCurrency.currency,
            fromNetwork: previousCurrency.network,
            fromId: previousCurrency.id,
            fromImage: previousCurrency?.image,
            toName: state.fromName,
            toCurrency: state.fromCurrency,
            toNetwork: state.fromNetwork,
            toId: state.fromId,
            toImage: state.fromImage
          }
        } else if (name === 'fromName') {
          if (currency?.network) handlerStartLoadingEstimatedAmount(state)

          return {
            ...state,
            fromName: currency?.name || value,
            fromCurrency: currency?.ticker || '',
            fromNetwork: currency?.network || '',
            fromId: currency?.hasExternalId || false,
            fromImage: currency?.image || ''
          }
        } else if (name === 'toName') {
          if (currency?.network) handlerStartLoadingEstimatedAmount(state)

          return {
            ...state,
            toName: currency?.name || value,
            toCurrency: currency?.ticker || '',
            toNetwork: currency?.network || '',
            toId: currency?.hasExternalId || false,
            toImage: currency?.image || ''
          }
        }

        if (currency?.network) handlerStartLoadingEstimatedAmount(state)

        return state
      })

      if (currency?.name) {
        setPreviousCurrency({
          currency: '',
          name: '',
          network: '',
          id: false,
          image: ''
        })
      }
    },
    [currencies, dataFlow, previousCurrency, handlerStartLoadingEstimatedAmount]
  )

  const handlerReverseCurrencyClick = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault()

      const {
        fromName,
        fromCurrency,
        fromNetwork,
        toName,
        toCurrency,
        toNetwork
      } = dataFlow

      setDataFlow((state) => ({
        ...state,
        fromName: state.toName,
        fromCurrency: state.toCurrency,
        fromNetwork: state.toNetwork,
        fromId: state.toId,
        fromImage: state.toImage,
        toName: state.fromName,
        toCurrency: state.fromCurrency,
        toNetwork: state.fromNetwork,
        toId: state.fromId,
        toImage: state.fromImage
      }))

      try {
        const { data: range } = await Api.getRange({
          fromCurrency: toCurrency,
          fromNetwork: toNetwork,
          toCurrency: fromCurrency,
          toNetwork: fromNetwork
        })

        const minAmount = range.minAmount
        const initialFromAmount = String((minAmount * 10).toFixed(8))

        setIsAlert(false)
        setMinAmount(String(minAmount))

        setDataFlow((state) => ({
          ...state,
          minAmount: String(minAmount),
          fromAmount: initialFromAmount
        }))

        if (pathname === '/exchange') {
          push(
            {
              pathname: '/exchange',
              query: {
                fromAmount: initialFromAmount,
                fromName: toName,
                toName: fromName
              }
            },
            undefined,
            { shallow: true }
          )
        }

        const { data: estimated } = await Api.getEstimatedAmount({
          fromAmount: initialFromAmount,
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
    },
    [pathname, push, dataFlow]
  )

  useEffect(() => {
    async function loading() {
      try {
        const response = await Api.getCurrencies()
        setCurrencies(response.data)

        localStorage.setItem(
          'alitaquantum.com@currencies',
          JSON.stringify(response.data)
        )
      } catch (err) {}
    }
    loading()
  }, [])

  const handlerStartLoadingStates = useCallback(async () => {
    const initialData = {
      fromCurrency: 'btc',
      fromNetwork: 'btc',
      toCurrency: 'eth',
      toNetwork: 'eth'
    }

    try {
      const { data: range } = await Api.getRange(initialData)

      const minAmount = range.minAmount
      const initialFromAmount = String((minAmount * 10).toFixed(8))

      setMinAmount(String(minAmount))

      setDataFlow((state) => ({
        ...state,
        minAmount: String(minAmount),
        fromAmount: initialFromAmount
      }))

      const { data: estimated } = await Api.getEstimatedAmount({
        ...initialData,
        fromAmount: initialFromAmount
      })

      setEstimatedAmount(String(estimated.toAmount))
      setTransactionSpeedForecast(
        estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
      )
    } catch (err) {
      setMinAmount('0')
      setEstimatedAmount('0')
    }
  }, [])

  useEffect(() => {
    if (pathname === '/' || (pathname === '/exchange' && pathname === asPath)) {
      handlerStartLoadingStates()
    }
  }, [handlerStartLoadingStates, asPath, pathname])

  const handlerStartExchangeQuery = useCallback(async () => {
    const { fromAmount, fromName, toName } = query

    const storage = localStorage.getItem('alitaquantum.com@currencies')

    const coins = storage ? JSON.parse(storage) : currencies

    const from = coins?.find(
      (currency: Currencies) => currency.name === fromName
    )
    const to = coins?.find((currency: Currencies) => currency.name === toName)

    if (from?.ticker && to?.ticker) {
      setIsQueryLoaded(true)

      try {
        if (fromAmount) {
          setDataFlow((state) => ({ ...state, fromAmount }))

          const { data: estimated } = await Api.getEstimatedAmount({
            fromCurrency: from.ticker,
            fromNetwork: from.network,
            toCurrency: to.ticker,
            toNetwork: to.network,
            fromAmount
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )
        }
      } catch (err) {
        setMinAmount('0')
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
      }

      setDataFlow((state) => ({
        ...state,
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
    }
  }, [query, currencies])

  useEffect(() => {
    if (pathname === '/exchange' && pathname !== asPath && !isQueryLoaded) {
      handlerStartExchangeQuery()
    }
  }, [handlerStartExchangeQuery, asPath, isQueryLoaded, pathname])

  return (
    <ExchangeContext.Provider
      value={{
        currencies,
        dataFlow,
        minAmount,
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
