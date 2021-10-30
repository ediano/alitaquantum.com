import { useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'
import { TextTouch } from 'components/TextTouch'

import { useExchange } from 'context/exchange'

import * as S from './styles'

export const Exchange = () => {
  const {
    currencies,
    selectedCurrency,
    fromAmount,
    minAmount,
    estimatedAmount,
    isAlert,
    handlerSelectedCurrencyClick,
    handlerButtonSelectedCurrencyChange,
    handlerInputFromAmountChange,
    handlerInputSelectedCurrencyChange
  } = useExchange()

  const [isAlertFixedRate, setIsAlertFixedRate] = useState(false)

  return (
    <S.Container>
      <S.WrapperBlock alert={isAlert}>
        <S.Alert alert={isAlert || false}>Montante mínimo: {minAmount}</S.Alert>

        <S.InputBlock>
          <S.Input
            name="fromAmount"
            value={fromAmount || ''}
            onChange={handlerInputFromAmountChange}
          />

          <S.Input
            list="fromName"
            name="fromName"
            background="secondary"
            color="whiteIce"
            srcImage={selectedCurrency?.fromImage}
            value={selectedCurrency?.fromName || ''}
            onFocus={handlerSelectedCurrencyClick}
            onClick={handlerSelectedCurrencyClick}
            onChange={handlerInputSelectedCurrencyChange}
          />
          <Select name="fromName" currencies={currencies} />
        </S.InputBlock>
        <S.Network network="from">
          Network: {selectedCurrency?.fromNetwork?.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>

      <S.WrapperDetails>
        <S.AlertFixedRate>
          <S.AlertFixedRateText
            onClick={() => setIsAlertFixedRate(!isAlertFixedRate)}
          >
            Sem taxas adicionais.
          </S.AlertFixedRateText>
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
            disabled
            color="white"
            background="grey"
            value={Number(estimatedAmount).toFixed(8)}
          />

          <S.Input
            list="toName"
            name="toName"
            background="secondary"
            color="whiteIce"
            srcImage={selectedCurrency?.toImage}
            value={selectedCurrency?.toName || ''}
            onFocus={handlerSelectedCurrencyClick}
            onClick={handlerSelectedCurrencyClick}
            onChange={handlerInputSelectedCurrencyChange}
          />
          <Select name="toName" currencies={currencies} />
        </S.InputBlock>
        <S.Network network="to">
          Network: {selectedCurrency?.toNetwork?.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>
    </S.Container>
  )
}
