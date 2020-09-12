import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import AppProvider from '../hooks'
import { AppProps } from 'next/app'


import GlobalStyle from '../styles/global'



const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeContainer>
       <AppProvider>
      <Component {...pageProps} />
       </AppProvider>
       < GlobalStyle />
    </ThemeContainer>
  )
}

export default MyApp
