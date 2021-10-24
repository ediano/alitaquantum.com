type Op = '*' | '+'

export const theme = {
  colors: {
    primary: '#08b9c1',
    secondary: '#444',
    text: '#333',
    white: '#fff',
    whiteIce: '#f1f5f8',
    black: '#000',
    bg: '#191919',
    alert: '#f9a825'
  },
  spacing: {
    xxs: '0.4rem',
    xs: '0.8rem',
    s: '1.6rem',
    m: '2.2rem',
    l: '3.2rem',
    xl: '4rem',
    xxl: '5rem'
  },
  border: {
    xxs: '0.2rem',
    xs: '0.4rem',
    s: '0.8rem',
    m: '1.6rem',
    l: '2.6rem',
    xl: '3.2rem',
    xxl: '5rem'
  },
  fonts: {
    family: {
      default: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      primary: `'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      secondary: `'Nunito', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
    },
    sizes: {
      xxs: '1rem',
      xs: '1.6rem',
      s: '1.8rem',
      sm: '2rem',
      ms: '2.28rem',
      m: '2.6rem',
      l: '3.4rem',
      xl: '4.2rem',
      xxl: '5rem'
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    }
  },
  calc: (base: string, measure: number, op: Op = '*') => {
    const [explod] = base.split('rem')
    if (op === '+') return `${Number(explod) + measure}rem`
    return `${Number(explod) * measure}rem`
  }
}
