import NotLoggedinLayout from '../componenets/notloggedinlayout'
import Head from 'next/head'



const Register = () => {
    return (
        <>
        <Head>
            <title>회원가입</title>
        </Head>
        <NotLoggedinLayout>
            <h2 style = {{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>회원가입</h2>

        </NotLoggedinLayout>
        </>
    )
}

export default Register; 