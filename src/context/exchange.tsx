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

type ContextProps = {
  currencies: Currencies[]
  dataFlow: DataFlow
  fromAmount: string
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
  const router = useRouter()
  const [currencies, setCurrencies] = useState<Currencies[]>([])

  const [dataFlow, setDataFlow] = useState<DataFlow>(initialProps)

  const [fromAmount, setFromAmount] = useState('0')
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
        setFromAmount(value)
        setDataFlow((state) => ({ ...state, [name]: value }))

        const { fromCurrency, fromNetwork, toCurrency, toNetwork } = dataFlow

        if (Number(value) >= Number(minAmount)) {
          setIsAlert(false)

          const { data: estimated } = await Api.getEstimatedAmount({
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork,
            fromAmount: value
          })

          setEstimatedAmount(String(estimated.toAmount))

          if (router.pathname === '/exchange') {
            const { fromName, toName } = dataFlow

            router.push({
              pathname: '/exchange',
              query: { fromAmount: value, fromName, toName }
            })
          }
        } else {
          setEstimatedAmount('0')
          setIsAlert(true)
        }
      }
    },
    [router, dataFlow, minAmount]
  )

  const handlerInputCurrencyChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      const { value, name } = event.target

      const currency = currencies.find((currency) => currency.name === value)

      setDataFlow((state) => {
        const from = state.fromName
        const to = state.toName

        if (
          (name === 'fromName' && value === to) ||
          (name === 'toName' && value === from)
        ) {
          return {
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
          }
        }

        if (name === 'fromName' && currency?.name) {
          return {
            ...state,
            fromName: currency?.name || value,
            fromCurrency: currency?.ticker || '',
            fromNetwork: currency?.network || '',
            fromId: currency?.hasExternalId || false,
            fromImage: currency?.image || ''
          }
        }

        if (name === 'toName' && currency?.name) {
          return {
            ...state,
            toName: currency?.name || value,
            toCurrency: currency?.ticker || '',
            toNetwork: currency?.network || '',
            toId: currency?.hasExternalId || false,
            toImage: currency?.image || ''
          }
        }

        return state
      })

      if (currency?.name) {
        const { fromName, toName } = dataFlow
        const { fromCurrency, fromNetwork, toCurrency, toNetwork } = dataFlow

        if (
          (name === 'fromName' && value === toName) ||
          (name === 'toName' && value === fromName)
        ) {
          const { data: range } = await Api.getRange({
            fromCurrency: toCurrency,
            fromNetwork: toNetwork,
            toCurrency: fromCurrency,
            toNetwork: fromNetwork
          })

          const minAmount = range.minAmount
          const initialFromAmount = String((minAmount * 10).toFixed(8))

          setMinAmount(String(minAmount))
          setFromAmount(String(initialFromAmount))

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

          if (router.pathname === '/exchange') {
            router.push({
              pathname: '/exchange',
              query: {
                fromAmount: initialFromAmount,
                fromName,
                toName
              }
            })
          }
        }

        if (name === 'fromName') {
          const { data: range } = await Api.getRange({
            fromCurrency: currency.ticker,
            fromNetwork: currency.network,
            toCurrency: fromCurrency,
            toNetwork: fromNetwork
          })

          const minAmount = range.minAmount
          const initialFromAmount = String((minAmount * 10).toFixed(8))

          setMinAmount(String(minAmount))
          setFromAmount(String(initialFromAmount))

          const { data: estimated } = await Api.getEstimatedAmount({
            fromAmount: initialFromAmount,
            fromCurrency: currency.ticker,
            fromNetwork: currency.network,
            toCurrency: fromCurrency,
            toNetwork: fromNetwork
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )

          if (router.pathname === '/exchange') {
            router.push({
              pathname: '/exchange',
              query: {
                fromAmount: initialFromAmount,
                fromName: currency.name,
                toName
              }
            })
          }
        }

        if (name === 'toName') {
          const { data: range } = await Api.getRange({
            fromCurrency: toCurrency,
            fromNetwork: toNetwork,
            toCurrency: currency.ticker,
            toNetwork: currency.network
          })

          const minAmount = range.minAmount
          const initialFromAmount = String((minAmount * 10).toFixed(8))

          setMinAmount(String(minAmount))
          setFromAmount(String(initialFromAmount))

          const { data: estimated } = await Api.getEstimatedAmount({
            fromAmount: initialFromAmount,
            fromCurrency: toCurrency,
            fromNetwork: toNetwork,
            toCurrency: currency.ticker,
            toNetwork: currency.network
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )

          if (router.pathname === '/exchange') {
            router.push({
              pathname: '/exchange',
              query: {
                fromAmount: initialFromAmount,
                fromName,
                toName: currency.name
              }
            })
          }
        }
      }
    },
    [currencies, router, dataFlow]
  )

  const handlerReverseCurrencyClick = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault()

      setDataFlow((state) => ({
        ...state,
        ...{
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
        }
      }))

      const {
        fromName,
        fromCurrency,
        fromNetwork,
        toName,
        toCurrency,
        toNetwork
      } = dataFlow

      const { data: range } = await Api.getRange({
        fromCurrency: toCurrency,
        fromNetwork: toNetwork,
        toCurrency: fromCurrency,
        toNetwork: fromNetwork
      })

      const minAmount = range.minAmount
      const initialFromAmount = String((minAmount * 10).toFixed(8))

      setMinAmount(String(minAmount))
      setFromAmount(String(initialFromAmount))

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

      if (router.pathname === '/exchange') {
        router.push({
          pathname: '/exchange',
          query: {
            fromAmount: initialFromAmount,
            fromName: toName,
            toName: fromName
          }
        })
      }
    },
    [router, dataFlow]
  )

  useEffect(() => {
    const initialData = {
      fromCurrency: 'btc',
      fromNetwork: 'btc',
      toCurrency: 'eth',
      toNetwork: 'eth'
    }

    async function loading() {
      try {
        const [currencies, range] = await Promise.allSettled([
          Api.getCurrencies(),
          Api.getRange(initialData)
        ])

        if (currencies.status === 'fulfilled') {
          setCurrencies(currencies.value.data)
        }

        if (range.status === 'fulfilled') {
          const minAmount = range.value.data.minAmount
          const initialFromAmount = String((minAmount * 10).toFixed(8))

          setMinAmount(String(minAmount))
          setFromAmount(String(initialFromAmount))

          const { data: estimated } = await Api.getEstimatedAmount({
            ...initialData,
            fromAmount: initialFromAmount
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )
        }
      } catch (err) {
        setMinAmount('0')
        setFromAmount('0')
        setEstimatedAmount('0')
      }
    }

    loading()
  }, [])

  return (
    <ExchangeContext.Provider
      value={{
        currencies,
        dataFlow,
        fromAmount,
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
