import ThemeContainer from '../../src/contexts/theme/ThemeContainer'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  )
}

export default MyApp
