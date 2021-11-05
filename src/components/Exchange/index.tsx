import { useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'
import { TextTouch } from 'components/TextTouch'

import { useExchange } from 'context/exchange'

import * as S from './styles'

export const Exchange = () => {
  const {
    currencies,
    dataFlow,
    estimatedAmount,
    isAlert,
    handlerReverseCurrencyClick,
    handlerInputFromAmountChange,
    handlerInputCurrencyChange
  } = useExchange()

  const [isAlertFixedRate, setIsAlertFixedRate] = useState(false)

  return (
    <S.Container>
      <S.WrapperBlock alert={isAlert}>
        <S.Alert alert={isAlert || false}>
          Montante mínimo: {dataFlow.minAmount}
        </S.Alert>

        <S.InputBlock>
          <S.Input
            name="fromAmount"
            value={dataFlow.fromAmount}
            onChange={handlerInputFromAmountChange}
          />

          <S.Input
            list="fromName"
            name="fromName"
            background="secondary"
            color="whiteIce"
            srcImage={dataFlow.fromImage}
            value={dataFlow.fromName}
            onChange={handlerInputCurrencyChange}
          />
          <Select name="fromName" currencies={currencies} />
        </S.InputBlock>
        <S.Network network="from">
          Network: {dataFlow.fromNetwork?.toUpperCase()}
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

        <S.Button type="button" onClick={handlerReverseCurrencyClick}>
          <BsArrowDownUp />
        </S.Button>
      </S.WrapperDetails>

      <S.WrapperBlock>
        <S.InputBlock>
          <S.Input
            readOnly
            disabled
            name="toAmount"
            color="white"
            background="grey"
            value={
              !estimatedAmount
                ? 'Carregando...'
                : Number(estimatedAmount).toFixed(8)
            }
          />

          <S.Input
            list="toName"
            name="toName"
            background="secondary"
            color="whiteIce"
            srcImage={dataFlow.toImage}
            value={dataFlow.toName}
            onChange={handlerInputCurrencyChange}
          />
          <Select name="toName" currencies={currencies} />
        </S.InputBlock>
        <S.Network network="to">
          Network: {dataFlow.toNetwork?.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>
    </S.Container>
  )
}
