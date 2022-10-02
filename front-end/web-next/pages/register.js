import NotLoggedinLayout from '../componenets/notloggedinlayout'
import styles from '../styles/register.module.css'
import Head from 'next/head'



const Register = () => {
    return (
        <>
        <Head>
            <title>회원가입</title>
        </Head>
        <NotLoggedinLayout>
            <h1 style = {{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>회원가입</h1>
            <form action="/send-data-here" method="post" style={{ width: '300px', margin: 'auto' }}>
                <input className={styles.inputfield} type="text" placeholder='이름' name="Name" style={{ margin: 'auto', display: 'block' }} required />
                <br></br>
                <input className={styles.inputfield} type="text" placeholder='군번' name="milnum" style={{ margin: 'auto', display: 'block' }} required />
                <br></br>
                <input className={styles.inputfield} type="text" placeholder='초대 코드' name="invcode" style={{ margin: 'auto', display: 'block' }} required />
                <br></br>
                <input className={styles.inputfield} type="password" placeholder='비밀번호' name="password" required />
                <br></br>
                <input className={styles.inputfield} type="confpassword" placeholder='비밀번호 확인' name="password" required />
                <br></br>
            <button className={styles.buttonfield} type="submit">가입하기</button>
            </form>
        </NotLoggedinLayout>
        </>
    )
}

export default Register; 