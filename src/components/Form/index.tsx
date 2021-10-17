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

export const Form = () => {
  const [selectedCurrency, setSelectedCurrency] = useState({
    currencyToSend: 'btc',
    currencyReceived: 'eth'
  })
  const [amountToSend, setAmountToSend] = useState('0')
  const [amountReceived, setAmountReceived] = useState('0')

  const handleInputAmountToSendChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      if (Number(value) >= 0 && name === 'amountToSend') {
        setAmountToSend(value)
      }
    },
    []
  )

  const handleInputSelectChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, name }
      } = event as ChangeEvent<HTMLInputElement>

      setSelectedCurrency((state) => {
        const toSend = state.currencyToSend
        const received = state.currencyReceived
        if (value === toSend || value === received) {
          return {
            currencyToSend: state.currencyReceived,
            currencyReceived: state.currencyToSend
          }
        }

        return { ...state, [name]: value }
      })
    },
    []
  )

  const handleButtonSelectChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setSelectedCurrency((state) => ({
        currencyToSend: state.currencyReceived,
        currencyReceived: state.currencyToSend
      }))
    },
    []
  )

  const handleSelectedCurrencyClick = useCallback((event: any) => {
    const { name } = event.target
    setSelectedCurrency((state) => ({ ...state, [name]: '' }))
  }, [])

  useEffect(() => {
    async function handle() {
      try {
        const response = await changeNow.get(
          '/exchange/available-pairs?fromCurrency=&toCurrency=&fromNetwork=&toNetwork=&flow='
        )

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    handle()
  }, [])

  return (
    <S.Container>
      <S.WrapperBlock>
        <S.Input
          name="amountToSend"
          value={amountToSend || ''}
          onChange={handleInputAmountToSendChange}
        />

        <Select name="currencyToSend">
          <S.InputSelect
            list="currencyToSend"
            name="currencyToSend"
            value={selectedCurrency.currencyToSend}
            onFocus={handleSelectedCurrencyClick}
            onClick={handleSelectedCurrencyClick}
            onChange={handleInputSelectChange}
          />
        </Select>
      </S.WrapperBlock>

      <S.WrapperBlock>
        <S.WrapperDetails>
          <div></div>

          <S.Button type="button" onClick={handleButtonSelectChange}>
            <BsArrowDownUp />
          </S.Button>
        </S.WrapperDetails>
      </S.WrapperBlock>

      <S.WrapperBlock>
        <S.Input
          name="amountReceived"
          disabled={true}
          defaultValue={amountReceived}
        />

        <Select name="currencyReceived">
          <S.InputSelect
            list="currencyReceived"
            name="currencyReceived"
            value={selectedCurrency.currencyReceived}
            onFocus={handleSelectedCurrencyClick}
            onClick={handleSelectedCurrencyClick}
            onChange={handleInputSelectChange}
          />
        </Select>
      </S.WrapperBlock>
    </S.Container>
  )
}
