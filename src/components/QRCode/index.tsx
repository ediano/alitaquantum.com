import QRC from 'qrcode.react'

type Props = {
  value: string
}

export const QRCode = ({ value }: Props) => {
  return <QRC value={value} level="H" />
}
