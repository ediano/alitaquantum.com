const statusKey = {
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

type Props = {
  status: keyof typeof statusKey
}

export const Status = ({ status }: Props) => {
  return <></>
}
