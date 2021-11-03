import { useState, useEffect } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'
import { useRouter } from 'next/router'

import { Select } from 'components/Select'
import { TextTouch } from 'components/TextTouch'

import { Currencies } from 'services/ChangeNowService'
import { useExchange, Query } from 'context/exchange'

import * as S from './styles'

export const Exchange = () => {
  const { fromAmount, fromName, toName } = useRouter().query as Query

  const {
    currencies,
    dataFlow,
    minAmount,
    estimatedAmount,
    isAlert,
    handlerReverseCurrencyClick,
    handlerInputFromAmountChange,
    handlerInputCurrencyChange
  } = useExchange()

  const [isAlertFixedRate, setIsAlertFixedRate] = useState(false)
  const [fromImage, setFromImage] = useState('')
  const [toImage, setToImage] = useState('')

  useEffect(() => {
    const currencies = localStorage.getItem('alitaquantum.com@currencies')

    if (currencies) {
      const coins = JSON.parse(currencies) as Currencies[]

      coins.forEach((coin) => {
        if (coin.name === fromName) setFromImage(coin.image)
        if (coin.name === toName) setToImage(coin.image)
      })
    }
  }, [fromName, toName])

  return (
    <S.Container>
      <S.WrapperBlock alert={isAlert}>
        <S.Alert alert={isAlert || false}>Montante mínimo: {minAmount}</S.Alert>

        <S.InputBlock>
          <S.Input
            name="fromAmount"
            value={fromAmount || dataFlow.fromAmount}
            onChange={handlerInputFromAmountChange}
          />

          <S.Input
            list="fromName"
            name="fromName"
            background="secondary"
            color="whiteIce"
            srcImage={fromName ? fromImage : dataFlow.fromImage}
            value={fromName || dataFlow.fromName}
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
            value={Number(estimatedAmount).toFixed(8)}
          />

          <S.Input
            list="toName"
            name="toName"
            background="secondary"
            color="whiteIce"
            srcImage={toName ? toImage : dataFlow.toImage}
            value={toName || dataFlow.toName}
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
