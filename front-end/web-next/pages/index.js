import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import background from '../img/marpat2.jpg'
import logo from '../img/logotransparent.png'

export default function Home() {
  return (
    <>
    <div className={styles.container} style = {{
      backgroundImage: `url(${background.src})`,
      width: '100%',
      height: '100%',
    }}>
      <div id={styles.idcontainer}>
        <div id = {styles.logocontainer}>
          <Image id={styles.logo} src = {logo.src} width = '450px' height = '150px'/>

        </div>
        <form action="/send-data-here" method="post" style = {{display: 'block', width: '450px'}}>
          <input className={styles.inputfield} type="text" name="ID" style = {{margin: 'auto'}} />
          <br></br>
          <input className={styles.inputfield} type="password" name="password" />
          <br></br>
          <button type="submit">Submit</button>
        </form>

      </div>
    </div>
    </>
  )
}
