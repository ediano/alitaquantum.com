import { createGlobalStyle } from 'styled-components'

type Props = {
  layout?: 'home' | 'pages'
}

export const GlobalStyle = createGlobalStyle<Props>`
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    text-decoration: none;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 65%;
    font-family: ${(props) => props.theme.fonts.family.default};
  }

  html, body, #__next {
    min-height: 100%;
  }

  body {
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fonts.sizes.xs};
  }

  body,
  input,
  textarea,
  button,
  code {
    font-family: ${(props) => props.theme.fonts.family.primary};
  }

  ul li,
  ol li {
    list-style: none;
  } 

  button {
    background: transparent;
  }
`
