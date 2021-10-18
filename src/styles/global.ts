import { createGlobalStyle } from 'styled-components'

type Props = {
  layout?: 'home' | 'pages'
}

export const GlobalStyle = createGlobalStyle<Props>`
  @font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans_Light.ttf');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans_Regular.ttf');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans_Medium.ttf');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans_Bold.ttf');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Nunito';
    src: url('/fonts/Nunito_Light.ttf');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Nunito';
    src: url('/fonts/Nunito_Regular.ttf');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Nunito';
    src: url('/fonts/Nunito_SemiBold.ttf');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Nunito';
    src: url('/fonts/Nunito_Bold.ttf');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

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
  }

  html, body, #__next {
    min-height: 100vh;
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
    font-family: ${(props) => props.theme.fonts.family.openSans};
  }

  ul li,
  ol li {
    list-style: none;
  } 

  button {
    background: transparent;
  }
`
