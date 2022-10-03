import NotLoggedinLayout from '../componenets/notloggedinlayout'
import styles from '../styles/register.module.css'
import Head from 'next/head'
import Link from "next/link"



const Register = () => {
    return (
        <>
        <Head>
            <title>회원가입</title>
        </Head>
        <NotLoggedinLayout>
            <h1 style = {{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>회원가입</h1>
            <form  className={styles.form} action="/send-data-here" method="post" style={{ width: '380px', margin: 'auto' }}>
                <input className={styles.inputfield} type="text" placeholder='이름' name="Name" required />
                <br></br>
                <input className={styles.inputfield} type="text" placeholder='군번' name="milnum" required />
                <span className={styles.inputdesc}>22-xxxxxxxx 양식으로 입력</span>
                <br></br>
                <input className={styles.inputfield} type="text" placeholder='초대 코드' name="invcode" required />
                <span className={styles.inputdesc}>부대에서 받은 초대코드 이용</span>
                <br></br>
                <input className={styles.inputfield} type="password" placeholder='비밀번호' name="password" required />
                <span className={styles.inputdesc}>8자리 이상 비밀번호 사용</span>
                <br></br>
                <input className={styles.inputfield} type="password" placeholder='비밀번호 확인' name="password" required />
                <br></br>
            <button className={styles.buttonfield} type="submit">가입하기</button>
            </form>
            <div id={styles.loginfooter}>
                <span className={styles.descfield}>계정이 있으세요? </span><Link href="/" passHref><a className={styles.links}>로그인</a></Link> <br></br>
                <span className={styles.descfield}>비밀번호를 잃어버리셨나요? </span><Link href="/forgotpass" passHref><a className={styles.links}>비밀번호 찾기</a></Link>
            </div>
        </NotLoggedinLayout>
        </>
    )
}

export default Register; 