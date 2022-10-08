import '../styles/globals.css'
import MenuLayout from '../componenets/MenuLayout'

function MyApp({ Component, pageProps }) {
  return (
    <MenuLayout exception={['/', '/index', '/register']}>
      <Component {...pageProps} />
    </MenuLayout>
  )
}

export default MyApp
