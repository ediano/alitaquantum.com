import { useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'
import { TextTouch } from 'components/TextTouch'
import { Input } from 'components/Input'

import { useExchange, cookieFixedRate } from 'context/exchange'

import * as S from './styles'

export const Exchange = () => {
  const {
    error,
    fixedRate,
    setFixedRate,
    currencies,
    dataFlow,
    estimatedAmount,
    isAlert,
    handlerStartFixedRate,
    handlerReverseCurrencyClick,
    handlerInputFromAmountChange,
    handlerInputCurrencyChange
  } = useExchange()

  const [isAlertFixedRate, setIsAlertFixedRate] = useState(false)

  return (
    <S.Container>
      <S.MessageError
        data-alert={(() => {
          if (isAlert && error) {
            return `Montante mínimo: ${dataFlow.minAmount}. ${error}`
          }

          if (isAlert && !error) {
            return `Montante mínimo: ${dataFlow.minAmount}`
          }

          if (!isAlert && error) {
            return error
          }

          return ''
        })()}
      ></S.MessageError>

      <S.WrapperBlock>
        <S.InputBlock data-alert={isAlert || !!error}>
          <Input
            name="fromAmount"
            input={{
              value: dataFlow.fromAmount,
              onChange: handlerInputFromAmountChange
            }}
          />

          <Input
            name="fromName"
            color="secondary"
            image={dataFlow.fromImage}
            input={{
              list: 'fromName',
              value: dataFlow.fromName,
              onChange: handlerInputCurrencyChange,
              onFocus: handlerInputCurrencyChange
            }}
          />

          <Select name="fromName" currencies={currencies} />
        </S.InputBlock>

        <S.Network className="from">
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

          <button
            onClick={() => {
              cookieFixedRate.set(!fixedRate)
              handlerStartFixedRate(!fixedRate)
              setFixedRate(!fixedRate)
            }}
          >
            <span data-dynamic-rate={!fixedRate}>Taxa dinâmica</span>
            <span data-fixed-rate={fixedRate}>Taxa fixa</span>
          </button>
        </S.AlertFixedRate>
        <S.Button type="button" onClick={handlerReverseCurrencyClick}>
          <BsArrowDownUp />
        </S.Button>
      </S.WrapperDetails>

      <S.WrapperBlock>
        <S.InputBlock>
          <Input
            name="toAmount"
            color="grey"
            isLoading={!estimatedAmount}
            input={{
              value: !estimatedAmount ? '' : Number(estimatedAmount).toFixed(8),
              readOnly: true,
              disabled: true
            }}
          />

          <Input
            name="toName"
            color="secondary"
            image={dataFlow.toImage}
            input={{
              list: 'toName',
              value: dataFlow.toName,
              onChange: handlerInputCurrencyChange,
              onFocus: handlerInputCurrencyChange
            }}
          />

          <Select name="toName" currencies={currencies} />
        </S.InputBlock>

        <S.Network className="to">
          Network: {dataFlow.toNetwork?.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>
    </S.Container>
  )
}
