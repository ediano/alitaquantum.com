import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'
import { Input } from 'components/Input'

import { useExchange } from 'context/exchange'

import * as S from './styles'

export const InstantExchange = () => {
  const {
    currencies,
    dataFlow,
    estimatedAmount,
    isAlert,
    handlerReverseCurrencyClick,
    handlerInputFromAmountChange,
    handlerInputCurrencyChange
  } = useExchange()

  return (
    <S.Container>
      <S.WrapperBlock data-alert={isAlert}>
        <S.Alert data-alert={isAlert}>
          Montante mínimo: {dataFlow.minAmount}
        </S.Alert>

        <S.InputBlock>
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
              onFocus: handlerInputCurrencyChange,
              disabled: true
            }}
          />

          <Select name="fromName" currencies={currencies} />
        </S.InputBlock>
        <S.Network className="from">
          Network: {dataFlow.fromNetwork?.toUpperCase()}
        </S.Network>
      </S.WrapperBlock>

      <S.WrapperDetails>
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
              onFocus: handlerInputCurrencyChange,
              disabled: true
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
