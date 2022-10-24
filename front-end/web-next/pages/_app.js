import '../styles/globals.css'
import { useState } from 'react';
import MenuLayout from '../componenets/MenuLayout';
import SettingHeader from '../componenets/SettingHeader';

function MyApp({ Component, pageProps, router }) {
  const [headerExtra, setHeaderExtra] = useState(null);

  if (router.pathname == '/' || router.pathname.startsWith('/index') || router.pathname.startsWith('/register'))
    return <Component {...pageProps} />

  if (router.pathname.startsWith('/settings'))
    return (
      <MenuLayout>
        <SettingHeader extra={headerExtra} />
          <Component {...pageProps} setHeaderExtra={setHeaderExtra} />
      </MenuLayout>
    )

  return (
    <MenuLayout>
      <Component {...pageProps} />
    </MenuLayout>
  )
}

export default MyApp
