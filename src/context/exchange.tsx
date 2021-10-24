import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FocusEvent,
  MouseEvent
} from 'react'

import Api from 'services/ApiService'
import { Currencies } from 'services/ChangeNowService'

const initialProps = {
  fromName: 'Bitcoin',
  fromCurrency: 'btc',
  fromNetwork: 'btc',
  toName: 'Ethereum',
  toCurrency: 'eth',
  toNetwork: 'eth'
}

type InitialProps = typeof initialProps

type FlowCoins = {
  fromAmount: string
  minAmount: string
  fromName: string
  fromCurrency: string
  fromNetwork: string
  toName: string
  toCurrency: string
  toNetwork: string
}

type ContextProps = {
  currencies: Currencies[]
  selectedCurrency: typeof initialProps
  flowCoins: InitialProps
  fromAmount: string
  minAmount: string
  estimatedAmount: string
  isAlert: boolean
  handlerInputFromAmountChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlerButtonSelectedCurrencyChange: () => void
  handlerInputSelectedCurrencyChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void
  handlerSelectedCurrencyClick: (
    event: FocusEvent<HTMLInputElement> & MouseEvent<HTMLInputElement>
  ) => void
}

const flowCoinsStorage = 'alitaquantum.com@flow-coins'
export const storage = {
  get: (key: string): FlowCoins => {
    const data = localStorage.getItem(key)
    return !!data && JSON.parse(data)
  },
  set: (data: FlowCoins) => {
    localStorage.setItem(flowCoinsStorage, JSON.stringify(data))
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
  const [flowCoins, setFlowCoins] = useState<FlowCoins>({} as FlowCoins)

  const [fromAmount, setFromAmount] = useState('0')
  const [minAmount, setMinAmount] = useState('0')
  const [estimatedAmount, setEstimatedAmount] = useState('0')

  const [isAlert, setIsAlert] = useState(false)

  useEffect(() => {
    if (storage.get(flowCoinsStorage)) {
      const {
        fromName,
        fromNetwork,
        fromCurrency,
        toName,
        toNetwork,
        toCurrency
      } = storage.get(flowCoinsStorage)

      setFlowCoins(storage.get(flowCoinsStorage))
      setSelectedCurrency({
        fromName,
        fromCurrency,
        fromNetwork,
        toName,
        toCurrency,
        toNetwork
      })
      setFromAmount(storage.get(flowCoinsStorage).fromAmount)
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
        setFlowCoins((state) => {
          storage.set({ ...state, fromAmount: value })
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

        if (value === from || value === to) {
          return {
            fromName: state.toName,
            fromCurrency: state.toCurrency,
            fromNetwork: state.toNetwork,
            toName: state.fromName,
            toCurrency: state.fromCurrency,
            toNetwork: state.fromNetwork
          }
        }

        if (name === 'fromCurrency') {
          return {
            ...state,
            fromName: currency?.name || value,
            fromCurrency: currency?.ticker || '',
            fromNetwork: currency?.network || ''
          }
        }

        if (name === 'toCurrency') {
          return {
            ...state,
            toName: currency?.name || value,
            toCurrency: currency?.ticker || '',
            toNetwork: currency?.network || ''
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
      toName: state.fromName,
      toCurrency: state.fromCurrency,
      toNetwork: state.fromNetwork
    }))
  }, [])

  const handlerSelectedCurrencyClick = useCallback((event: any) => {
    const { name } = event.target as { name: string }

    setSelectedCurrency((state) => {
      if (name === 'fromCurrency') {
        return {
          ...state,
          fromName: '',
          fromCurrency: '',
          fromNetwork: ''
        }
      }

      if (name === 'toCurrency') {
        return {
          ...state,
          toName: '',
          toCurrency: '',
          toNetwork: ''
        }
      }

      return state
    })
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
      toName,
      toCurrency,
      toNetwork
    } = selectedCurrency

    async function loading() {
      try {
        const { data: range } = await Api.getRange({
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork
        })

        const minimumQuantityTimesX = range.minAmount * 10

        const { fromAmount } = storage.get(flowCoinsStorage)

        setFromAmount(fromAmount || String(minimumQuantityTimesX.toFixed(8)))
        setMinAmount(String(range.minAmount))

        setFlowCoins({
          fromName,
          fromCurrency,
          fromNetwork,
          toName,
          toCurrency,
          toNetwork,
          minAmount: String(range.minAmount),
          fromAmount: fromAmount || String(minimumQuantityTimesX.toFixed(8))
        })
        storage.set({
          fromName,
          fromCurrency,
          fromNetwork,
          toName,
          toCurrency,
          toNetwork,
          minAmount: String(range.minAmount),
          fromAmount: fromAmount || String(minimumQuantityTimesX.toFixed(8))
        })
      } catch (err) {
        setMinAmount('0')
        setFromAmount(String(Number('0').toFixed(8)))
      }
    }

    if (fromNetwork && toNetwork) {
      loading()
    }
  }, [selectedCurrency])

  useEffect(() => {
    const {
      fromAmount: fromAmountFlow,
      minAmount: minAmountFlow,
      fromCurrency,
      fromNetwork,
      toCurrency,
      toNetwork
    } = flowCoins

    async function loading() {
      try {
        const { data: estimated } = await Api.getEstimatedAmount({
          fromAmount: fromAmountFlow,
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork
        })

        if (!estimated.toAmount) {
          setEstimatedAmount('0')
        } else {
          setEstimatedAmount(String(estimated.toAmount))
        }
      } catch (err) {
        setEstimatedAmount('0')
      }
    }

    const isValidAmount = Number(fromAmountFlow) >= Number(minAmountFlow)

    if (fromNetwork && toNetwork && isValidAmount) {
      loading()
    } else {
      setEstimatedAmount('0')
    }

    const isTheMinValueIsHigher = Number(minAmountFlow) > Number(fromAmountFlow)
    setIsAlert(isTheMinValueIsHigher)
  }, [flowCoins])

  return (
    <ExchangeContext.Provider
      value={{
        currencies,
        selectedCurrency,
        flowCoins,
        fromAmount,
        minAmount,
        estimatedAmount,
        isAlert,
        handlerInputFromAmountChange,
        handlerButtonSelectedCurrencyChange,
        handlerInputSelectedCurrencyChange,
        handlerSelectedCurrencyClick
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}

export const useExchange = () => {
  const context = useContext(ExchangeContext)
  if (!context) {
    throw new Error('Cannot use `useAuth` outside of a AuthProvider')
  }
  return context
}
