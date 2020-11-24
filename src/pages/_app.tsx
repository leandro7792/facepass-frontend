import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'
import AuthProvider from './_authProvider'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.300',
        fontFamily: 'sans-serif'
      }
    }
  }
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
