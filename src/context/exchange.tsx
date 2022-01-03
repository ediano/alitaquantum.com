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

import { collections } from 'errors/collections'

import { Currencies } from 'services/ChangeNowService'
import * as Api from 'services/ApiService'

import { getImage } from 'utils/getImage'

const envFromCurrency = process.env.NEXT_PUBLIC_FROM_CURRENCY
const envFromNetwork = process.env.NEXT_PUBLIC_FROM_NETWORK
const envFromName = process.env.NEXT_PUBLIC_FROM_NAME
const envToCurrency = process.env.NEXT_PUBLIC_FROM_CURRENCY
const envToNetwork = process.env.NEXT_PUBLIC_TO_NETWORK
const envToName = process.env.NEXT_PUBLIC_TO_NAME
const envFromAmount = process.env.NEXT_PUBLIC_FROM_AMOUNT

const initialProps = {
  fromName: envFromName || 'Bitcoin',
  fromCurrency: envFromCurrency || 'btc',
  fromNetwork: envFromNetwork || 'btc',
  fromId: false,
  fromImage: getImage(envFromCurrency || 'btc'),
  toName: envToName || 'Ethereum',
  toCurrency: envToCurrency || 'eth',
  toNetwork: envToNetwork || 'eth',
  toId: false,
  toImage: getImage(envToCurrency || 'eth'),
  fromAmount: envFromAmount || '0.01',
  minAmount: '0'
}

export type DataFlow = typeof initialProps

type Query = {
  fromAmount?: string
  fromName?: string
  toName?: string
  fixedRate?: 'true' | 'false'
}

type Collections = keyof typeof collections

type ContextProps = {
  isAlert: boolean
  error?: string
  fixedRate: boolean
  dataFlow: DataFlow
  estimatedAmount: string
  setFixedRate: (value: boolean) => void
  currencies: Currencies[]
  transactionSpeedForecast: string
  handlerStartFixedRate: (value: boolean) => void
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

const multiplies = (value: number, x: number = 25) => {
  return String((value * x).toFixed(8))
}

export const cookieFixedRate = {
  get() {
    const [key, value] = document.cookie?.split('=')
    if (key === 'fixedRate') return value === 'true'
    return false
  },
  set(value: boolean) {
    document.cookie = `fixedRate=${value}`
    return value
  }
}

const ExchangeContext = createContext<ContextProps>({} as ContextProps)

type Props = {
  props?: Partial<DataFlow>
  children: ReactNode
}

export const ExchangeProvider = ({ props, children }: Props) => {
  const { pathname, push, asPath } = useRouter()
  const query = useRouter().query as Query

  const [error, setError] = useState('')
  const [fixedRate, setFixedRate] = useState(false)
  const [currencies, setCurrencies] = useState<Currencies[]>([])
  const [dataFlow, setDataFlow] = useState<DataFlow>(initialProps)

  const [isQueryLoaded, setIsQueryLoaded] = useState(false)
  const [estimatedAmount, setEstimatedAmount] = useState('')
  const [transactionSpeedForecast, setTransactionSpeedForecast] = useState('')

  const [isAlert, setIsAlert] = useState(false)

  useEffect(() => {
    async function loading() {
      try {
        const response = await Api.getCurrencies()
        setCurrencies(response.data)

        storage.set(response.data)
      } catch (err) {}
    }
    loading()

    setFixedRate(cookieFixedRate.get())
  }, [])

  const handlerEstimatedAmountByTheFromAmount = useCallback(
    async (value: string) => {
      if (Number(value) >= Number(dataFlow.minAmount)) {
        try {
          setEstimatedAmount('')

          const { data: estimated } = await Api.getEstimatedAmount({
            fromCurrency: dataFlow.fromCurrency,
            fromNetwork: dataFlow.fromNetwork,
            toCurrency: dataFlow.toCurrency,
            toNetwork: dataFlow.toNetwork,
            fromAmount: value,
            flow: !fixedRate ? 'standard' : 'fixed-rate'
          })

          setError('')
          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )
        } catch (err: any) {
          const message = err?.response?.data?.message
          const error = err?.response?.data?.error
          if (message) {
            setError(collections[message as Collections].text)
          } else if (error) {
            setError(collections[error as Collections].text)
          }
          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa indisponivel!')
        }
      } else {
        setError('')
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
      }
    },
    [dataFlow, fixedRate]
  )

  const handlerInputFromAmountChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target
      const [natural, tenths] = value.split('.')
      const limit = (!tenths || tenths.length <= 8) && natural.length <= 10

      const { minAmount } = dataFlow
      if (Number(value) < Number(minAmount)) {
        setIsAlert(true)
        setError('')
      } else {
        setIsAlert(false)
      }

      if (Number(value) >= 0 && name === 'fromAmount' && limit) {
        setDataFlow((state) => ({ ...state, [name]: value }))

        handlerEstimatedAmountByTheFromAmount(value)

        if (pathname === '/trocar') {
          const { fromName, toName } = dataFlow

          push(
            {
              pathname: '/trocar',
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
      const { fromName, toName, fromAmount } = state
      const { fromCurrency, fromNetwork, toCurrency, toNetwork } = state

      if (fromNetwork && toNetwork) {
        try {
          setEstimatedAmount('')
          const { data: range } = await Api.getRange({
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork,
            flow: !fixedRate ? 'standard' : 'fixed-rate'
          })

          const minAmount = range.minAmount
          const fromAmount = multiplies(minAmount)

          setIsAlert(false)
          setDataFlow((state) => ({
            ...state,
            fromAmount,
            minAmount: String(minAmount)
          }))

          if (pathname === '/trocar') {
            push(
              {
                pathname: '/trocar',
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

          const { data: estimated } = await Api.getEstimatedAmount({
            fromAmount,
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork,
            flow: !fixedRate ? 'standard' : 'fixed-rate'
          })

          setEstimatedAmount(String(estimated.toAmount))
          setTransactionSpeedForecast(
            estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
          )
        } catch (err: any) {
          const message = err?.response?.data?.message
          const error = err?.response?.data?.error
          if (message) {
            setError(collections[message as Collections].text)
          } else if (error) {
            setError(collections[error as Collections].text)
          }
          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa indisponivel!')

          if (pathname === '/trocar') {
            push(
              {
                pathname: '/trocar',
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
        }
      }
    },
    [pathname, push, fixedRate]
  )

  const handlerInputCurrencyChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setError('')

      const { value, name } = event.target
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
    setError('')

    const {
      fromAmount,
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
      const { data: range } = await Api.getRange({
        fromCurrency: toCurrency,
        fromNetwork: toNetwork,
        toCurrency: fromCurrency,
        toNetwork: fromNetwork,
        flow: !fixedRate ? 'standard' : 'fixed-rate'
      })

      const minAmount = range.minAmount
      const fromAmount = multiplies(minAmount)

      setIsAlert(false)
      setDataFlow((state) => ({
        ...state,
        fromAmount,
        minAmount: String(minAmount)
      }))

      if (pathname === '/trocar') {
        push(
          {
            pathname: '/trocar',
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

      const { data: estimated } = await Api.getEstimatedAmount({
        fromAmount,
        fromCurrency: toCurrency,
        fromNetwork: toNetwork,
        toCurrency: fromCurrency,
        toNetwork: fromNetwork,
        flow: !fixedRate ? 'standard' : 'fixed-rate'
      })

      setEstimatedAmount(String(estimated.toAmount))
      setTransactionSpeedForecast(
        estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
      )
    } catch (err: any) {
      const message = err?.response?.data?.message
      const error = err?.response?.data?.error
      if (message) {
        setError(collections[message as Collections].text)
      } else if (error) {
        setError(collections[error as Collections].text)
      }
      setEstimatedAmount('0')
      setTransactionSpeedForecast('Estimativa indisponivel!')

      if (pathname === '/trocar') {
        push(
          {
            pathname: '/trocar',
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
    }
  }, [pathname, push, dataFlow, fixedRate])

  const handlerInitialStates = useCallback(async () => {
    const initialData = {
      fromCurrency: 'btc',
      fromNetwork: 'btc',
      toCurrency: 'eth',
      toNetwork: 'eth'
    }

    try {
      setEstimatedAmount('')
      const { data: range } = await Api.getRange({
        ...initialData,
        flow: 'standard'
      })

      const minAmount = range.minAmount

      setDataFlow((state) => ({
        ...state,
        minAmount: String(minAmount)
      }))

      const { data: estimated } = await Api.getEstimatedAmount({
        ...initialData,
        fromAmount: initialProps.fromAmount,
        flow: 'standard'
      })

      setEstimatedAmount(String(estimated.toAmount))
      setTransactionSpeedForecast(
        estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
      )
    } catch (err: any) {
      const message = err?.response?.data?.message
      const error = err?.response?.data?.error
      if (message) {
        setError(collections[message as Collections].text)
      } else if (error) {
        setError(collections[error as Collections].text)
      }
      setEstimatedAmount('0')
    }
  }, [])

  useEffect(() => {
    if (pathname === '/' || (pathname === '/trocar' && pathname === asPath)) {
      handlerInitialStates()
    }
  }, [handlerInitialStates, asPath, pathname])

  const handlerStartPageExchangeQuery = useCallback(async () => {
    const { fromAmount, fromName, toName } = query

    push(
      {
        pathname: '/trocar',
        query: {
          fromAmount,
          fromName,
          toName
        }
      },
      undefined,
      { shallow: true }
    )

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
            Api.getRange({
              ...dataRequest,
              flow: !fixedRate ? 'standard' : 'fixed-rate'
            }),
            Api.getEstimatedAmount({
              ...dataRequest,
              fromAmount,
              flow: !fixedRate ? 'standard' : 'fixed-rate'
            })
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
      } catch (err: any) {
        const message = err?.response?.data?.message
        const error = err?.response?.data?.error
        if (message) {
          setError(collections[message as Collections].text)
        } else if (error) {
          setError(collections[error as Collections].text)
        }
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
      }
    }
  }, [query, currencies, push, fixedRate])

  useEffect(() => {
    if (pathname === '/trocar' && pathname !== asPath && !isQueryLoaded) {
      handlerStartPageExchangeQuery()
    }
  }, [handlerStartPageExchangeQuery, asPath, isQueryLoaded, pathname])

  const handlerInitialStatesPages = useCallback(async () => {
    if (
      props?.fromAmount &&
      props?.fromCurrency &&
      props?.fromNetwork &&
      props?.toCurrency &&
      props?.toNetwork
    ) {
      try {
        setDataFlow((state) => ({ ...state, ...props }))

        const { data: estimated } = await Api.getEstimatedAmount({
          fromAmount: props.fromAmount,
          fromCurrency: props.fromCurrency,
          fromNetwork: props.fromNetwork,
          toCurrency: props.toCurrency,
          toNetwork: props.toNetwork,
          flow: !fixedRate ? 'standard' : 'fixed-rate'
        })

        setEstimatedAmount(String(estimated.toAmount))
        setTransactionSpeedForecast(
          estimated.transactionSpeedForecast || 'Estimativa indisponivel!'
        )
      } catch (err: any) {
        const message = err?.response?.data?.message
        const error = err?.response?.data?.error
        if (message) {
          setError(collections[message as Collections].text)
        } else if (error) {
          setError(collections[error as Collections].text)
        }
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
      }
    }
  }, [props, fixedRate])

  useEffect(() => {
    if (props?.fromCurrency && props?.toCurrency) {
      handlerInitialStatesPages()
    }
  }, [props, handlerInitialStatesPages])

  const handlerStartFixedRate = useCallback(
    async (fixedRate: boolean) => {
      const initialData = {
        fromCurrency: dataFlow.fromCurrency,
        fromNetwork: dataFlow.fromNetwork,
        toCurrency: dataFlow.toCurrency,
        toNetwork: dataFlow.toNetwork
      }

      try {
        setEstimatedAmount('')
        const [range, estimated] = await Promise.allSettled([
          Api.getRange({
            ...initialData,
            flow: !fixedRate ? 'standard' : 'fixed-rate'
          }),
          Api.getEstimatedAmount({
            ...initialData,
            fromAmount: dataFlow.fromAmount,
            flow: !fixedRate ? 'standard' : 'fixed-rate'
          })
        ])

        if (range.status === 'fulfilled') {
          setDataFlow((state) => ({
            ...state,
            minAmount: String(range.value.data.minAmount)
          }))
        } else {
          setDataFlow((state) => ({ ...state, minAmount: '0' }))
        }

        if (estimated.status === 'fulfilled') {
          const { toAmount, transactionSpeedForecast } = estimated.value.data
          setEstimatedAmount(String(toAmount))
          setTransactionSpeedForecast(
            transactionSpeedForecast || 'Estimativa indisponivel!'
          )
          setError('')
        } else {
          const error = estimated.reason.response?.data?.message
          setError(collections[error as Collections].text)

          setEstimatedAmount('0')
          setTransactionSpeedForecast('Estimativa indisponivel!')
        }
      } catch (err: any) {
        const message = err?.response?.data?.message
        const error = err?.response?.data?.error
        if (message) {
          setError(collections[message as Collections].text)
        } else if (error) {
          setError(collections[error as Collections].text)
        }
        setEstimatedAmount('0')
        setTransactionSpeedForecast('Estimativa indisponivel!')
      }
    },
    [dataFlow]
  )

  useEffect(() => {
    if (Number(dataFlow.fromAmount) < Number(dataFlow.minAmount)) {
      setEstimatedAmount('0')
      setError('')
    }
  }, [dataFlow.fromAmount, dataFlow.minAmount, estimatedAmount])

  return (
    <ExchangeContext.Provider
      value={{
        error,
        setFixedRate,
        fixedRate,
        currencies,
        dataFlow,
        estimatedAmount,
        transactionSpeedForecast,
        isAlert,
        handlerStartFixedRate,
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
