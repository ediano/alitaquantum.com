import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { MdDoneAll } from 'react-icons/md'

import ChangeNow, { TransactionStatus } from 'services/ChangeNowService'

import { Spinner } from 'components/Spinner'
import { QRCode } from 'components/QRCode'

import * as S from './styles'

export const TXSLayout = () => {
  const { isReady, push } = useRouter()
  const { id: transactionId } = useRouter().query as { id: string }
  const [dataTransaction, setDataTransaction] = useState<TransactionStatus>(
    {} as TransactionStatus
  )

  const [copyAddress, setCopyAddress] = useState(false)
  const [copyExtraId, setCopyExtraId] = useState(false)

  const handlerLoadTransaction = useCallback(async (id: string) => {
    try {
      const response = await ChangeNow.getTransactionStatus({ id })

      setDataTransaction(response.data)
    } catch (err) {}
  }, [])

  useEffect(() => {
    if (isReady && transactionId) handlerLoadTransaction(transactionId)
    if (isReady && !transactionId) {
      push({ pathname: '/' }, undefined, { shallow: true })
    }
  }, [transactionId, isReady, push, handlerLoadTransaction])

  const handlerCopyText = useCallback(
    (value: string, type: 'address' | 'extraId') => {
      navigator.clipboard.writeText(value)

      if (type === 'address') {
        setCopyAddress(true)
        setCopyExtraId(false)
        setTimeout(() => {
          setCopyAddress(false)
        }, 7500)
      }

      if (type === 'extraId') {
        setCopyExtraId(true)
        setCopyAddress(false)
        setTimeout(() => {
          setCopyExtraId(false)
        }, 7500)
      }
    },
    []
  )

  if (!dataTransaction.id) return <Spinner />

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>
          Por favor, envie os fundos que você gostaria de trocar
        </S.Title>

        <S.Block>
          <S.Info>Envie:</S.Info>
          <S.Info className="primary">
            {dataTransaction.expectedAmountFrom}{' '}
            {dataTransaction.fromCurrency?.toUpperCase()}
          </S.Info>

          <S.WrapperDataFrom>
            <S.ContentDataFrom>
              <S.Info>Para este endereço:</S.Info>
              <S.Copy
                onClick={() =>
                  handlerCopyText(dataTransaction.payinAddress, 'address')
                }
              >
                click para copiar {copyAddress && <MdDoneAll />}{' '}
              </S.Copy>
              <S.Info
                className={copyAddress ? 'primary copy' : 'primary'}
                onClick={() =>
                  handlerCopyText(dataTransaction.payinAddress, 'address')
                }
              >
                {dataTransaction.payinAddress}
              </S.Info>
            </S.ContentDataFrom>

            {dataTransaction.payinAddress && (
              <QRCode value={dataTransaction.payinAddress} />
            )}
          </S.WrapperDataFrom>

          {dataTransaction.payinExtraId && (
            <S.WrapperDataFrom>
              <S.ContentDataFrom>
                <S.Info>
                  Para este ID: ID/MENO/TAG {copyExtraId && <MdDoneAll />}
                </S.Info>
                <S.Copy
                  onClick={() =>
                    handlerCopyText(
                      dataTransaction.payinExtraId as string,
                      'extraId'
                    )
                  }
                >
                  click para copiar {copyAddress && <MdDoneAll />}{' '}
                </S.Copy>
                <S.Info
                  className={copyAddress ? 'primary copy' : 'primary'}
                  onClick={() =>
                    handlerCopyText(
                      dataTransaction.payinExtraId as string,
                      'extraId'
                    )
                  }
                >
                  {dataTransaction.payinExtraId}
                </S.Info>
              </S.ContentDataFrom>

              <QRCode value={dataTransaction.payinExtraId} />
            </S.WrapperDataFrom>
          )}

          {dataTransaction.amountFrom && (
            <S.AmountReceived>
              <S.Info>Recebido:</S.Info>
              <S.Info className="primary">
                {dataTransaction.amountFrom}{' '}
                {dataTransaction.fromCurrency?.toUpperCase()}
              </S.Info>
              <S.Info>Em:</S.Info>
              <S.Info className="primary">
                {dataTransaction.depositReceivedAt}
              </S.Info>
              <S.Info>Às:</S.Info>
              <S.Info className="primary">
                {dataTransaction.depositReceivedAt}
              </S.Info>
            </S.AmountReceived>
          )}
        </S.Block>

        <S.Block>
          <S.Status>status</S.Status>
        </S.Block>

        <S.Block>
          <S.Title>Estimativa</S.Title>

          <div>
            <S.Info>Você recebe:</S.Info>
            <S.Info className="primary">
              {dataTransaction.expectedAmountTo}{' '}
              {dataTransaction.toCurrency?.toUpperCase()}
            </S.Info>

            <S.Info>Carteira do destinatário:</S.Info>
            <S.Info className="primary">{dataTransaction.payoutAddress}</S.Info>

            {dataTransaction.payoutExtraId && (
              <>
                <S.Info>ID/MENO/TAG:</S.Info>
                <S.Info className="primary">
                  {dataTransaction.payoutExtraId}
                </S.Info>
              </>
            )}
          </div>
        </S.Block>

        {dataTransaction.refundAddress && (
          <S.Block>
            <S.Title>Dados de reembolso</S.Title>

            <div>
              <S.Info>Endereço:</S.Info>
              <S.Info className="primary">
                {dataTransaction.refundAddress}
              </S.Info>

              {dataTransaction.refundExtraId && (
                <>
                  <S.Info>ID/MENO/TAG:</S.Info>
                  <S.Info className="primary">
                    {dataTransaction.refundExtraId}
                  </S.Info>
                </>
              )}
            </div>
          </S.Block>
        )}
      </S.Wrapper>
    </S.Container>
  )
}
