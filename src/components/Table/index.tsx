import * as S from './styles'

type ColumnType = {
  row: string[]
}

export type TableType = {
  columns: string[]
  rows: ColumnType[]
}

type Props = {
  title?: string
  table: TableType
}

export const Table = ({ title, table }: Props) => {
  return (
    <S.Container as="section">
      {!!title && <S.Title>{title}</S.Title>}

      {!!table.columns.length && !!table.rows.length && (
        <S.Wrapper>
          <S.TitleWrapper>
            {table.columns.map((column, i) => (
              <strong data-title={i === 0} key={column}>
                {column}
              </strong>
            ))}
          </S.TitleWrapper>

          <S.ContentWrapper>
            {table.rows.map((content, index) => (
              <S.Content key={index}>
                {!!content.row.length &&
                  content.row.map((row, i) => (
                    <span
                      data-title={i === 0}
                      className={row === 'Sim' ? 'ok' : ''}
                      key={i}
                    >
                      {row}
                    </span>
                  ))}
              </S.Content>
            ))}
          </S.ContentWrapper>
        </S.Wrapper>
      )}
    </S.Container>
  )
}
