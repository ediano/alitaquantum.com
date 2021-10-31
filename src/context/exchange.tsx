import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ChangeEvent
} from 'react'

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
  toImage: 'https://changenow.io/images/sprite/currencies/eth.svg'
}

type InitialProps = typeof initialProps

export type DataFlow = {
  fromAmount: string
  minAmount: string
  fromName: string
  fromCurrency: string
  fromNetwork: string
  fromId: boolean
  fromImage: string
  toName: string
  toCurrency: string
  toNetwork: string
  toId: boolean
  toImage: string
}

type ContextProps = {
  currencies: Currencies[]
  selectedCurrency: typeof initialProps
  dataFlow: DataFlow
  fromAmount: string
  minAmount: string
  estimatedAmount: string
  transactionSpeedForecast: string
  isAlert: boolean
  handlerInputFromAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlerButtonSelectedCurrencyChange: () => void
  handlerInputSelectedCurrencyChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void
}

const DATA_FLOW = {
  get: () => {
    const [name, data] = document.cookie.split('=')
    if (name === 'alitaquantum.com@data-flow') return JSON.parse(data)
    return false
  },
  set: (data: DataFlow) => {
    document.cookie = `alitaquantum.com@data-flow=${JSON.stringify(data)}`
  }
}

const ExchangeContext = createContext<ContextProps>({} as ContextProps)

type Props = {
  children: ReactNode
}

export const ExchangeProvider = ({ children }: Props) => {
  const [currencies, setCurrencies] = useState<Currencies[]>([])

  const [selectedCurrency, setSelectedCurrency] = useState<InitialProps>(
    {} as InitialProps
  )
  const [dataFlow, setDataFlow] = useState<DataFlow>({} as DataFlow)

  const [fromAmount, setFromAmount] = useState('0')
  const [minAmount, setMinAmount] = useState('0')
  const [estimatedAmount, setEstimatedAmount] = useState('0')
  const [transactionSpeedForecast, setTransactionSpeedForecast] = useState('')

  const [isAlert, setIsAlert] = useState(false)

  useEffect(() => {
    if (DATA_FLOW.get()) {
      const {
        fromName,
        fromNetwork,
        fromCurrency,
        fromId,
        fromImage,
        toName,
        toNetwork,
        toCurrency,
        toId,
        toImage
      } = DATA_FLOW.get()

      setDataFlow(DATA_FLOW.get())
      setSelectedCurrency({
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
      })
      setFromAmount(DATA_FLOW.get().fromAmount)
    } else {
      setSelectedCurrency(initialProps)
    }
  }, [])

  const handlerInputFromAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      const [natural, tenths] = value.split('.')

      const limit = (!tenths || tenths.length <= 8) && natural.length <= 10

      if (Number(value) >= 0 && name === 'fromAmount' && limit) {
        setFromAmount(value)
        setDataFlow((state) => {
          DATA_FLOW.set({ ...state, fromAmount: value })
          return { ...state, fromAmount: value }
        })
      }
    },
    []
  )

  const handlerInputSelectedCurrencyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      const currency = currencies.find((currency) => currency.name === value)

      setSelectedCurrency((state) => {
        const from = state.fromName
        const to = state.toName

        if (
          (name === 'fromName' && value === to) ||
          (name === 'toName' && value === from)
        ) {
          return {
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

        if (name === 'fromName') {
          return {
            ...state,
            fromName: currency?.name || value,
            fromCurrency: currency?.ticker || '',
            fromNetwork: currency?.network || '',
            fromId: currency?.hasExternalId || false,
            fromImage: currency?.image || ''
          }
        }

        if (name === 'toName') {
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
    },
    [currencies]
  )

  const handlerButtonSelectedCurrencyChange = useCallback(() => {
    setSelectedCurrency((state) => ({
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
  }, [])

  useEffect(() => {
    async function loading() {
      try {
        const response = await Api.getCurrencies()

        setCurrencies(response.data)
      } catch (err) {}
    }

    loading()
  }, [])

  useEffect(() => {
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
    } = selectedCurrency

    async function loading() {
      try {
        const { data: range } = await Api.getRange({
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork
        })

        const newFromAmount = String((range.minAmount * 10).toFixed(8))

        const { fromAmount, minAmount } = DATA_FLOW.get()

        const isMin = Number(minAmount) !== range.minAmount

        const compareAmount = isMin ? newFromAmount : fromAmount

        setFromAmount(compareAmount)
        setMinAmount(String(range.minAmount))

        setDataFlow({
          fromName,
          fromCurrency,
          fromNetwork,
          fromId,
          fromImage,
          toName,
          toCurrency,
          toNetwork,
          toId,
          toImage,
          minAmount: String(range.minAmount),
          fromAmount: compareAmount
        })
        DATA_FLOW.set({
          fromName,
          fromCurrency,
          fromNetwork,
          fromId,
          fromImage,
          toName,
          toCurrency,
          toNetwork,
          toId,
          toImage,
          minAmount: String(range.minAmount),
          fromAmount: compareAmount
        })
      } catch (err) {
        setMinAmount('0')
        setFromAmount(String(Number('0').toFixed(8)))
        setEstimatedAmount('0')
      }
    }

    if (fromNetwork && toNetwork) {
      loading()
    }
  }, [selectedCurrency])

  useEffect(() => {
    const {
      fromAmount,
      minAmount,
      fromCurrency,
      fromNetwork,
      toCurrency,
      toNetwork
    } = dataFlow

    async function loading() {
      try {
        const { data: estimated } = await Api.getEstimatedAmount({
          fromAmount,
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork
        })

        if (!estimated.toAmount) {
          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa não disponível')
        } else {
          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa não disponível'
          )
        }
      } catch (err) {
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa não disponível')
      }
    }

    const isValidAmount = Number(fromAmount) >= Number(minAmount)

    if (fromNetwork && toNetwork && isValidAmount) {
      loading()
    } else {
      setEstimatedAmount('0')
    }

    const isTheMinValueIsHigher = Number(minAmount) > Number(fromAmount)
    setIsAlert(isTheMinValueIsHigher)
  }, [dataFlow])

  return (
    <ExchangeContext.Provider
      value={{
        currencies,
        selectedCurrency,
        dataFlow,
        fromAmount,
        minAmount,
        estimatedAmount,
        transactionSpeedForecast,
        isAlert,
        handlerInputFromAmountChange,
        handlerButtonSelectedCurrencyChange,
        handlerInputSelectedCurrencyChange
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
