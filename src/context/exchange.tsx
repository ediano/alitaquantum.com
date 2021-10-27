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
  fromId: false,
  toName: 'Ethereum',
  toCurrency: 'eth',
  toNetwork: 'eth',
  toId: false
}

type InitialProps = typeof initialProps

export type DataFlow = {
  fromAmount: string
  minAmount: string
  fromName: string
  fromCurrency: string
  fromNetwork: string
  fromId: boolean
  toName: string
  toCurrency: string
  toNetwork: string
  toId: boolean
}

type ContextProps = {
  currencies: Currencies[]
  selectedCurrency: typeof initialProps
  dataFlow: DataFlow
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

const DATA_FLOW_SESSION_STORAGE = 'alitaquantum.com@data-flow'
export const DATA_FLOW_STORAGE = {
  get: (): DataFlow => {
    const data = sessionStorage.getItem(DATA_FLOW_SESSION_STORAGE)
    return !!data && JSON.parse(data)
  },
  set: (data: DataFlow) => {
    sessionStorage.setItem(DATA_FLOW_SESSION_STORAGE, JSON.stringify(data))
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

  const [isAlert, setIsAlert] = useState(false)

  useEffect(() => {
    if (DATA_FLOW_STORAGE.get()) {
      const {
        fromName,
        fromNetwork,
        fromCurrency,
        fromId,
        toName,
        toNetwork,
        toCurrency,
        toId
      } = DATA_FLOW_STORAGE.get()

      setDataFlow(DATA_FLOW_STORAGE.get())
      setSelectedCurrency({
        fromName,
        fromCurrency,
        fromNetwork,
        fromId,
        toName,
        toCurrency,
        toNetwork,
        toId
      })
      setFromAmount(DATA_FLOW_STORAGE.get().fromAmount)
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
          DATA_FLOW_STORAGE.set({ ...state, fromAmount: value })
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
            fromId: state.toId,
            toName: state.fromName,
            toCurrency: state.fromCurrency,
            toNetwork: state.fromNetwork,
            toId: state.fromId
          }
        }

        if (name === 'fromCurrency') {
          return {
            ...state,
            fromName: currency?.name || value,
            fromCurrency: currency?.ticker || '',
            fromNetwork: currency?.network || '',
            fromId: currency?.hasExternalId || false
          }
        }

        if (name === 'toCurrency') {
          return {
            ...state,
            toName: currency?.name || value,
            toCurrency: currency?.ticker || '',
            toNetwork: currency?.network || '',
            toId: currency?.hasExternalId || false
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
      toName: state.fromName,
      toCurrency: state.fromCurrency,
      toNetwork: state.fromNetwork,
      toId: state.fromId
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
          fromNetwork: '',
          fromId: false
        }
      }

      if (name === 'toCurrency') {
        return {
          ...state,
          toName: '',
          toCurrency: '',
          toNetwork: '',
          toId: false
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
      fromId,
      toName,
      toCurrency,
      toNetwork,
      toId
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

        const { fromAmount, minAmount } = DATA_FLOW_STORAGE.get()

        const isMin = Number(minAmount) !== range.minAmount

        const compareAmount = isMin ? newFromAmount : fromAmount

        setFromAmount(compareAmount)
        setMinAmount(String(range.minAmount))

        setDataFlow({
          fromName,
          fromCurrency,
          fromNetwork,
          fromId,
          toName,
          toCurrency,
          toNetwork,
          toId,
          minAmount: String(range.minAmount),
          fromAmount: compareAmount
        })
        DATA_FLOW_STORAGE.set({
          fromName,
          fromCurrency,
          fromNetwork,
          fromId,
          toName,
          toCurrency,
          toNetwork,
          toId,
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
        } else {
          setEstimatedAmount(String(estimated.toAmount))
        }
      } catch (err) {
        setEstimatedAmount('0')
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
    throw new Error('Cannot use `useExchange` outside of a ExchangeProvider')
  }
  return context
}
