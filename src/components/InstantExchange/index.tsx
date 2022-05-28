import { BsArrowDownUp } from 'react-icons/bs'

import { Select } from 'components/Select'
import { Input } from 'components/Input'

import { useExchange } from 'context/exchange'

import * as S from './styles'

export const InstantExchange = () => {
  const {
    error,
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
        {!!dataFlow.fromNetwork && (
          <S.Network className="from">
            {dataFlow.fromNetwork?.toUpperCase()}
          </S.Network>
        )}
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
            color="gray"
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
        {!!dataFlow.toNetwork && (
          <S.Network className="to">
            {dataFlow.toNetwork?.toUpperCase()}
          </S.Network>
        )}
      </S.WrapperBlock>
    </S.Container>
  )
}
