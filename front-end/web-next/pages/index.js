import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import NotLoggedinLayout from '../componenets/notloggedinlayout'

export default function Home() {
  return (
    <>
    <Head>
      <title>로그인</title>
    </Head>
      <NotLoggedinLayout>
        <h2 style = {{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>로그인</h2>
        <form action="/send-data-here" method="post" style = {{width: '250px', margin: 'auto'}}>
          <input className={styles.inputfield} type="text" placeholder='군번' name="ID" style = {{margin: 'auto', display: 'block'}} required/>
          <br></br>
          <input className={styles.inputfield} type="password" placeholder='비밀번호' name="password" required/>
          <br></br>
          <button className={styles.buttonfield} type="submit">로그인</button>
        </form>
        <div id={styles.loginfooter}>
          <Link className={styles.links} href = "/register" style = {{color: "skyblue"}}>회원가입하기</Link>
        </div>
      </NotLoggedinLayout>
    </>
  )
}
