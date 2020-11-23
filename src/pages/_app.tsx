import { AppProps } from 'next/app'
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
