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
      <S.WrapperBlock>
        <S.MessageError
          data-alert={isAlert ? `Montante mínimo: ${dataFlow.minAmount}` : ''}
        ></S.MessageError>

        <S.InputBlock data-alert={isAlert}>
          <Input
            ariaLabel="Quantidade de moedas a enviar?"
            name="fromAmount"
            input={{
              value: dataFlow.fromAmount,
              onChange: handlerInputFromAmountChange
            }}
          />

          <Input
            ariaLabel="Moedas a enviar?"
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
        <S.Button
          type="button"
          aria-label="Inverter posição das moedas"
          onClick={handlerReverseCurrencyClick}
        >
          <BsArrowDownUp />
        </S.Button>
      </S.WrapperDetails>

      <S.WrapperBlock>
        <S.InputBlock>
          <Input
            ariaLabel="Quantidade estimada de moedas a receber?"
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
            ariaLabel="Moedas a receber?"
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
