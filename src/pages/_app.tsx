import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import AppProvider from '../hooks'
import {CookiesProvider} from 'react-cookie'
import { AppProps } from 'next/app'

import '../config/ReactotronConfig'

import { store, persistor } from '../store'

import GlobalStyle from '../styles/global'


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
    <ThemeContainer>
      <CookiesProvider>
       <AppProvider>
      <Component {...pageProps} />
       </AppProvider>
       </CookiesProvider>
       < GlobalStyle />
    </ThemeContainer>
    </PersistGate>
    </Provider>
  )
}

export default MyApp
