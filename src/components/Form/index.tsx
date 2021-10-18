import {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  MouseEvent
} from 'react'
import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'

import { changeNow } from 'services'

import * as S from './styles'

export type AvailableCurrenciesProps = {
  ticker: string
  name: string
  image: string
  network: string
  hasExternalId: boolean
}

export const Form = () => {
  const [error, setError] = useState('')
  const [availableCurrencies, setAvailableCurrencies] = useState<
    AvailableCurrenciesProps[]
  >([])
  const [selectedCurrency, setSelectedCurrency] = useState({
    fromCurrencyName: 'Bitcoin',
    fromCurrencyTicker: 'btc',
    fromNetwork: 'btc',
    toCurrencyName: 'Ethereum',
    toCurrencyTicker: 'eth',
    toNetwork: 'eth'
  })
  const [fromAmount, setFromAmount] = useState('0')
  const [toAmount, setToAmount] = useState('0')
  const [minAmount, setMinAmount] = useState('0')

  const handleInputFromAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      if (Number(value) >= 0 && name === 'fromAmount') {
        setFromAmount(value)
      }
    },
    []
  )

  const handleInputSelectChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, name }
      } = event as ChangeEvent<HTMLInputElement>

      const currency = availableCurrencies.find(
        (currency) => currency.name === value
      )

      setSelectedCurrency((state) => {
        const from = state.fromCurrencyName
        const to = state.toCurrencyName

        if (value === from || value === to) {
          return {
            fromCurrencyName: state.toCurrencyName,
            fromCurrencyTicker: state.toCurrencyTicker,
            fromNetwork: state.toNetwork,
            toCurrencyName: state.fromCurrencyName,
            toCurrencyTicker: state.fromCurrencyTicker,
            toNetwork: state.fromNetwork
          }
        }

        if (name === 'fromCurrency') {
          return {
            ...state,
            fromCurrencyName: currency!.name,
            fromCurrencyTicker: currency!.ticker,
            fromNetwork: currency!.network
          }
        }

        if (name === 'toCurrency') {
          return {
            ...state,
            toCurrencyName: currency!.name,
            toCurrencyTicker: currency!.ticker,
            toNetwork: currency!.network
          }
        }

        return state
      })
    },
    [availableCurrencies]
  )

  const handleButtonSelectChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setSelectedCurrency((state) => ({
        fromCurrencyName: state.toCurrencyName,
        fromCurrencyTicker: state.toCurrencyTicker,
        fromNetwork: state.toNetwork,
        toCurrencyName: state.fromCurrencyName,
        toCurrencyTicker: state.fromCurrencyTicker,
        toNetwork: state.fromNetwork
      }))
    },
    []
  )

  const handleSelectedCurrencyClick = useCallback((event: any) => {
    const { name } = event.target

    setSelectedCurrency((state) => {
      if (name === 'fromCurrency') {
        return {
          ...state,
          fromCurrencyName: '',
          fromCurrencyTicker: '',
          fromNetwork: ''
        }
      }

      if (name === 'toCurrency') {
        return {
          ...state,
          toCurrencyName: '',
          toCurrencyTicker: '',
          toNetwork: ''
        }
      }

      return state
    })
  }, [])

  useEffect(() => {
    async function handle() {
      try {
        const response = await changeNow.get<AvailableCurrenciesProps[]>(
          '/exchange/currencies?active=&flow=standard&buy=&sell='
        )

        const data = response.data.map((currency) => ({
          ticker: currency.ticker,
          name: currency.name,
          image: currency.image,
          network: currency.network,
          hasExternalId: currency.hasExternalId
        }))

        setAvailableCurrencies(data)
      } catch (error) {}
    }

    handle()
  }, [])

  useEffect(() => {
    setToAmount('0')
  }, [])

  useEffect(() => {
    const { fromCurrencyTicker, toCurrencyTicker, fromNetwork, toNetwork } =
      selectedCurrency

    async function handle() {
      try {
        const response = await changeNow.get<{ minAmount: number }>(
          `exchange/min-amount?fromCurrency=${fromCurrencyTicker}&toCurrency=${toCurrencyTicker}&fromNetwork=${fromNetwork}&toNetwork=${toNetwork}&flow=standard`
        )

        setMinAmount(String(response.data.minAmount))
        setFromAmount(String(Number(response.data.minAmount) * 10))
      } catch (err: any) {
        setMinAmount('0')
        setFromAmount('0')

        if (err.response.data.error === 'pair_is_inactive') {
          setError('Par está inativo')
        }
      }
    }

    if (fromCurrencyTicker && toCurrencyTicker) handle()
  }, [selectedCurrency])

  return (
    <S.Container>
      <S.WrapperBlock>
        <S.Input
          name="fromAmount"
          value={fromAmount || ''}
          onChange={handleInputFromAmountChange}
          color={minAmount > fromAmount ? 'alert' : ''}
        />

        <S.InputSelect
          list="fromCurrency"
          name="fromCurrency"
          value={selectedCurrency.fromCurrencyName}
          onFocus={handleSelectedCurrencyClick}
          onClick={handleSelectedCurrencyClick}
          onChange={handleInputSelectChange}
        />
        <Select name="fromCurrency" currencies={availableCurrencies} />
      </S.WrapperBlock>

      <S.WrapperBlock>
        <S.WrapperDetails>
          {minAmount > fromAmount && <div>Erro aqui!</div>}

          <S.Button type="button" onClick={handleButtonSelectChange}>
            <BsArrowDownUp />
          </S.Button>
        </S.WrapperDetails>
      </S.WrapperBlock>

      <S.WrapperBlock>
        <S.Input name="toAmount" disabled={true} defaultValue={toAmount} />

        <S.InputSelect
          list="toCurrency"
          name="toCurrency"
          value={selectedCurrency.toCurrencyName}
          onFocus={handleSelectedCurrencyClick}
          onClick={handleSelectedCurrencyClick}
          onChange={handleInputSelectChange}
        />
        <Select name="toCurrency" currencies={availableCurrencies} />
      </S.WrapperBlock>
    </S.Container>
  )
}
