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
        <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>로그인</h1>
        <form action="/send-data-here" method="post" style={{ width: '300px', margin: 'auto' }}>
          <input className={styles.inputfield} type="text" placeholder='군번' name="ID" style={{ margin: 'auto', display: 'block' }} required />
          <br></br>
          <input className={styles.inputfield} type="password" placeholder='비밀번호' name="password" required />
          <br></br>
          <button className={styles.buttonfield} type="submit">로그인</button>
        </form>
        <div id={styles.loginfooter}>
          <span className={styles.descfield}>계정이 없으세요? </span><Link href="/register" passHref><a className={styles.links}>회원가입하기</a></Link> <br></br>
          <span className={styles.descfield}>비밀번호를 잃어버리셨나요? </span><Link href="/forgotpass" passHref><a className={styles.links}>비밀번호 찾기</a></Link>

        </div>
      </NotLoggedinLayout>
    </>
  )
}
