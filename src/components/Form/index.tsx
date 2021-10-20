import {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  MouseEvent,
  ReactNode
} from 'react'
import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'
import { TextTouch } from 'components/TextTouch'

import { Currencies } from 'services/ChangeNowService'
import Api from 'services/ApiService'

import * as S from './styles'

type Props = {
  children?: ReactNode
}

export const Form = ({ children }: Props) => {
  const [currencies, setCurrencies] = useState<Currencies[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState({
    fromCurrencyName: 'Bitcoin',
    fromCurrencyTicker: 'btc',
    fromNetwork: 'btc',
    toCurrencyName: 'Ethereum',
    toCurrencyTicker: 'eth',
    toNetwork: 'eth'
  })
  const [fromAmount, setFromAmount] = useState('0')
  const [minAmount, setMinAmount] = useState('0')
  const [estimatedAmount, setEstimatedAmount] = useState('0')
  const [isAlert, setIsAlert] = useState(false)

  const handlerInputFromAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      const [natural, tenths] = value.split('.')

      const limit = (!tenths || tenths.length <= 8) && natural.length <= 10

      if (Number(value) >= 0 && name === 'fromAmount' && limit) {
        setFromAmount(value)
      }
    },
    []
  )

  const handlerInputSelectedCurrencyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, name }
      } = event as ChangeEvent<HTMLInputElement>

      const currency = currencies.find((currency) => currency.name === value)

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
            fromCurrencyName: currency?.name || value,
            fromCurrencyTicker: currency?.ticker || '',
            fromNetwork: currency?.network || ''
          }
        }

        if (name === 'toCurrency') {
          return {
            ...state,
            toCurrencyName: currency?.name || value,
            toCurrencyTicker: currency?.ticker || '',
            toNetwork: currency?.network || ''
          }
        }

        return state
      })
    },
    [currencies]
  )

  const handlerButtonSelectedCurrencyChange = useCallback(
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

  const handlerSelectedCurrencyClick = useCallback((event: any) => {
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
    async function effectCurrencies() {
      try {
        const response = await Api.getCurrencies()

        setCurrencies(response.data)
      } catch (err) {}
    }

    effectCurrencies()
  }, [])

  useEffect(() => {
    const { fromNetwork, toNetwork } = selectedCurrency

    async function effectMinAmount() {
      try {
        const response = await Api.getMinAmount(selectedCurrency)

        setMinAmount(String(response.data.minAmount))

        const minimumQuantityTimesX = response.data.minAmount * 10
        setFromAmount(String(minimumQuantityTimesX.toFixed(8)))
      } catch (err) {
        setMinAmount('0')
        setFromAmount('0')
      }
    }

    if (fromNetwork && toNetwork) effectMinAmount()
  }, [selectedCurrency])

  useEffect(() => {
    const { fromNetwork, toNetwork } = selectedCurrency

    async function effectEstimatedAmount() {
      try {
        const response = await Api.getEstimatedAmount({
          fromAmount,
          ...selectedCurrency
        })

        console.log(response)

        setEstimatedAmount(String(response.data.toAmount))
      } catch (err) {
        setEstimatedAmount('0')
      }
    }

    if (fromNetwork && toNetwork && Number(fromAmount) >= Number(minAmount)) {
      effectEstimatedAmount()
    } else {
      setEstimatedAmount('0')
    }
  }, [fromAmount, minAmount, selectedCurrency])

  useEffect(() => {
    const isTheMinValueIsHigher = Number(minAmount) > Number(fromAmount)
    setIsAlert(isTheMinValueIsHigher)
  }, [minAmount, fromAmount])

  return (
    <S.Container>
      <S.WrapperBlock alert={isAlert}>
        {isAlert && <S.Alert>Montante mínimo: {minAmount}</S.Alert>}

        <S.InputBlock alert={isAlert}>
          <S.Input
            name="fromAmount"
            value={fromAmount || ''}
            onChange={handlerInputFromAmountChange}
          />

          <S.InputSelect
            list="fromCurrency"
            name="fromCurrency"
            value={selectedCurrency.fromCurrencyName}
            onFocus={handlerSelectedCurrencyClick}
            onClick={handlerSelectedCurrencyClick}
            onChange={handlerInputSelectedCurrencyChange}
          />
          <Select name="fromCurrency" currencies={currencies} />
        </S.InputBlock>
      </S.WrapperBlock>

      <S.WrapperDetails>
        <S.AlertFixedRate>
          Sem taxas adicionais
          <TextTouch message="As taxas de conexão de rede e todas as outras taxas de câmbio estão incluídas na aposta." />
        </S.AlertFixedRate>

        <S.Button type="button" onClick={handlerButtonSelectedCurrencyChange}>
          <BsArrowDownUp />
        </S.Button>
      </S.WrapperDetails>

      <S.WrapperBlock>
        <S.InputBlock>
          <S.Input
            name="toAmount"
            disabled={true}
            value={Number(estimatedAmount).toFixed(8)}
          />

          <S.InputSelect
            list="toCurrency"
            name="toCurrency"
            value={selectedCurrency.toCurrencyName}
            onFocus={handlerSelectedCurrencyClick}
            onClick={handlerSelectedCurrencyClick}
            onChange={handlerInputSelectedCurrencyChange}
          />
          <Select name="toCurrency" currencies={currencies} />
        </S.InputBlock>
      </S.WrapperBlock>
    </S.Container>
  )
}
