import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import AppProvider from '../hooks'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
       <AppProvider>
      <Component {...pageProps} />
       </AppProvider>
    </ThemeContainer>
  )
}

export default MyApp
