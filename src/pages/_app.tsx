import React from 'react'
import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import AppProvider from '../hooks'
import { CookiesProvider } from 'react-cookie'
import { AppProps } from 'next/app'

// import '../config/ReactotronConfig';

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { store, persistor } from '../store'

import GlobalStyle from '../styles/global'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (

    <ThemeContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CookiesProvider>
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </CookiesProvider>
        </PersistGate>

      </Provider>
      < GlobalStyle />
    </ThemeContainer>

  )
}

export default MyApp
