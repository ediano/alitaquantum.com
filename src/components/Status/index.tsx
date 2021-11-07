import * as S from './styles'

const keys = {
  new: 'Nova transação',
  waiting: 'Aguardando depósito',
  confirming: 'Confirmando',
  exchanging: 'Tracando',
  sending: 'Enviado',
  finished: 'Transação finalizada',
  failed: 'Transação falhou',
  refunded: 'Devolveu os fundos',
  verifying: 'Verificando'
}

const errors = ['failed', 'refunded']
const start = ['waiting', 'confirming', 'exchanging', 'sending', 'finished']
const finished = ['finished']

type Props = {
  status: keyof typeof keys
}

export const Status = ({ status }: Props) => {
  return (
    <S.Container>
      {errors.includes(status) && <div>error</div>}

      {start.includes(status) && (
        <>
          <span>{keys.waiting}</span>
          <span>{keys.confirming}</span>
          <span>{keys.exchanging}</span>
          <span>{keys.sending}</span>
        </>
      )}

      {finished.includes(status) && <div>finished</div>}
    </S.Container>
  )
}
