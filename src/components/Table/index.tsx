import * as S from './styles'

type ColumnType = {
  columns: string[]
}

export type TableType = {
  titles: string[]
  contents: ColumnType[]
}

type Props = {
  title?: string
  table: TableType
}

export const Table = ({ title, table }: Props) => {
  return (
    <S.Container as="section">
      {!!title && <S.Title>{title}</S.Title>}

      {!!table.titles.length && !!table.contents.length && (
        <S.Wrapper>
          <S.TitleWrapper>
            {table.titles.map((title, i) => (
              <strong data-title={i === 0} key={title}>
                {title}
              </strong>
            ))}
          </S.TitleWrapper>

          <S.ContentWrapper>
            {table.contents.map((content, index) => (
              <S.Content key={index}>
                {!!content.columns.length &&
                  content.columns.map((column, i) => (
                    <span
                      data-title={i === 0}
                      className={column === 'Sim' ? 'ok' : ''}
                      key={i}
                    >
                      {column}
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
