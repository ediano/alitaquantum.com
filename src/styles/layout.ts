import styled, {
  css,
  FlattenInterpolation,
  ThemeProps,
  DefaultTheme
} from 'styled-components'

const sizes = {
  xs: '360px',
  s: '640px',
  m: '800px',
  l: '1024px',
  xl: '1280px'
}

type Sizes = keyof typeof sizes | number

export const Row = styled.div`
  display: flow-root;

  &:after {
    content: '';
    display: table;
    clear: both;
  }
`

export const Container = styled.div`
  width: 90%;
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
`

export const lessThan = (size: Sizes) => {
  const isNumber = typeof size === 'number'
  const maxWidth = isNumber ? `${size}px` : sizes[size]

  return (...styles: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
    css`
      @media (max-width: ${maxWidth}) {
        ${styles}
      }
    `
}

export const between = (firstSize: Sizes, lastSize: Sizes) => {
  const isNumberFirstSize = typeof firstSize === 'number'
  const isNumberLastSize = typeof lastSize === 'number'

  const minWidth = isNumberFirstSize ? `${firstSize}px` : sizes[firstSize]
  const maxWidth = isNumberLastSize ? `${lastSize}px` : sizes[lastSize]

  return (...styles: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
    css`
      @media (min-width: ${minWidth}) and (max-width: ${maxWidth}) {
        ${styles}
      }
    `
}

export const greaterThan = (size: Sizes) => {
  const isNumber = typeof size === 'number'
  const minWidth = isNumber ? `${size}px` : sizes[size]

  return (...styles: FlattenInterpolation<ThemeProps<DefaultTheme>>) =>
    css`
      @media (min-width: ${minWidth}) {
        ${styles}
      }
    `
}
