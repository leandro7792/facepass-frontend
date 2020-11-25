import { AppProps } from 'next/app'
import Router from 'next/router'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'
import MainLayout from '../components/main'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.300',
        fontFamily: 'sans-serif'
      }
    }
  }
})

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  if (router.pathname.startsWith('/auth/')) {
    return (
      <ChakraProvider theme={theme}>
        <CSSReset />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
