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

const initialProps = {
  fromName: 'Bitcoin',
  fromCurrency: 'btc',
  fromNetwork: 'btc',
  toName: 'Ethereum',
  toCurrency: 'eth',
  toNetwork: 'eth'
}

type FlowCoins = {
  fromAmount: string
  minAmount: string
  maxAmount: string
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
}

type Props = {
  children?: ReactNode
}

export const Form = ({ children }: Props) => {
  const [error, setError] = useState('')
  const [currencies, setCurrencies] = useState<Currencies[]>([])

  const [selectedCurrency, setSelectedCurrency] = useState(initialProps)
  const [flowCoins, setFlowCoins] = useState<FlowCoins>({} as FlowCoins)

  const [fromAmount, setFromAmount] = useState('0')
  const [minAmount, setMinAmount] = useState('0')
  const [estimatedAmount, setEstimatedAmount] = useState('0')

  const [isAlert, setIsAlert] = useState(false)
  const [isAlertFixedRate, setIsAlertFixedRate] = useState(false)

  const handlerInputFromAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      const [natural, tenths] = value.split('.')

      const limit = (!tenths || tenths.length <= 8) && natural.length <= 10

      if (Number(value) >= 0 && name === 'fromAmount' && limit) {
        setFromAmount(value)
        setFlowCoins((state) => ({ ...state, fromAmount: value }))
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

  const handlerButtonSelectedCurrencyChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setSelectedCurrency((state) => ({
        fromName: state.toName,
        fromCurrency: state.toCurrency,
        fromNetwork: state.toNetwork,
        toName: state.fromName,
        toCurrency: state.fromCurrency,
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
    const { fromCurrency, fromNetwork, toCurrency, toNetwork } =
      selectedCurrency

    async function loading() {
      try {
        const response = await Api.getRange({
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork
        })

        const minimumQuantityTimesX = response.data.minAmount * 10

        setFromAmount(String(minimumQuantityTimesX.toFixed(8)))
        setMinAmount(String(response.data.minAmount))

        setFlowCoins({
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork,
          minAmount: String(response.data.minAmount),
          maxAmount: String(response.data.maxAmount),
          fromAmount: String(minimumQuantityTimesX.toFixed(8))
        })
      } catch (err: any) {
        setMinAmount('0')
        setFromAmount(String(Number('0').toFixed(8)))
        console.log(err.response.data)
        setError(err.response?.data?.error)
      }
    }

    if (fromNetwork && toNetwork) loading()
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
        const response = await Api.getEstimatedAmount({
          fromAmount: fromAmountFlow,
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork
        })

        if (!response.data.toAmount) {
          setEstimatedAmount('0')
        } else {
          setEstimatedAmount(String(response.data.toAmount))
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
    <S.Container>
      <S.WrapperBlock alert={isAlert}>
        {isAlert && <S.Alert>Montante mínimo: {minAmount}</S.Alert>}

        {error}

        <S.InputBlock alert={isAlert}>
          <S.Input
            name="fromAmount"
            value={fromAmount || ''}
            onChange={handlerInputFromAmountChange}
          />

          <S.InputSelect
            list="fromCurrency"
            name="fromCurrency"
            value={selectedCurrency.fromName}
            onFocus={handlerSelectedCurrencyClick}
            onClick={handlerSelectedCurrencyClick}
            onChange={handlerInputSelectedCurrencyChange}
          />
          <Select name="fromCurrency" currencies={currencies} />
        </S.InputBlock>
        <S.Network network="from">
          Network: {selectedCurrency.fromNetwork.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>

      <S.WrapperDetails>
        <S.AlertFixedRate
          onClick={() => setIsAlertFixedRate(!isAlertFixedRate)}
        >
          <S.AlertFixedRateText>Sem taxas adicionais</S.AlertFixedRateText>
          <TextTouch
            toggle={isAlertFixedRate}
            setToggle={setIsAlertFixedRate}
            message="As taxas de conexão de rede e todas as outras taxas de câmbio estão incluídas na aposta."
          />
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
            value={selectedCurrency.toName}
            onFocus={handlerSelectedCurrencyClick}
            onClick={handlerSelectedCurrencyClick}
            onChange={handlerInputSelectedCurrencyChange}
          />
          <Select name="toCurrency" currencies={currencies} />
        </S.InputBlock>
        <S.Network network="to">
          Network: {selectedCurrency.toNetwork.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>
    </S.Container>
  )
}