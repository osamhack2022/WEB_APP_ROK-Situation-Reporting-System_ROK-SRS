import NotLoggedinLayout from '../componenets/notloggedinlayout'
import styles from '../styles/register.module.css'
import Head from 'next/head'
import Link from "next/link"
import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { useRouter } from 'next/router';
import { encryptuser, decryptuser } from "../encryption/userencryption"



const Register = () => {
    const router = useRouter()
    const [Name, setName] = useState();
    const [DoDID, setDoDID] = useState();
    const [Invcode, setInvcode] = useState();
    const [Password, setPassword] = useState();
    const [ConfPassword, setConfPassword] = useState();
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const backendroot = process.env.NEXT_PUBLIC_BACKEND_ROOT
    let endpoint = backendroot + 'api/user/register'

    let registeruser = async (event) => {
        console.log("hi")
        const data = {
            DoDID: DoDID,
            password: Password,
            pic: "https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67",
            Invcode: Invcode

        }
        const JSONdata = JSON.stringify(data)
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
        if (result['DoDID']) {
            seterror("")
            setsuccess("계정이 성공적으로 만들어젔습니다.")
        } else {
            setsuccess("")
            seterror(result['message'])
        }
    }
    return (
        <>
            <Head>
                <title>회원가입</title>
            </Head>
            <NotLoggedinLayout>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>회원가입</h1>
                <Form method="post" style={{ width: '400px', margin: 'auto' }} onFinish={registeruser}>
                    <Form.Item className={styles.inputfield} name="이름" rules={[{ required: true, message: '이름을 입력해 주세요' }]}>
                        <Input placeholder="이름" onChange={(event) => { setName(event.target.value) }} />
                    </Form.Item>
                    <Form.Item className={styles.inputfield} name="군번" rules={[{ required: true, message: '군번을 입력해 주세요' }]}>
                        <Input placeholder="군번 (21-xxxxxxx)" onChange={(event) => { setDoDID(event.target.value) }} />
                    </Form.Item>
                    <Form.Item className={styles.inputfield} name="초대코드" rules={[{ required: true, message: '초대코드를 입력해 주세요' }]}>
                        <Input placeholder="초대 코드  (부대에서 받은 초대코드 입력)" onChange={(event) => { setInvcode(event.target.value) }} />
                    </Form.Item>
                    <Form.Item className={styles.inputfield} name="비밀번호" rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}>
                        <Input.Password placeholder="비밀번호" onChange={(event) => { setPassword(event.target.value) }} />
                    </Form.Item>
                    <Form.Item className={styles.inputfield} name="확인비밀번호" rules={[{ required: true, message: '비밀번호 확인 입력해 주세요' }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('비밀번호') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
                        },
                    }),]}>
                        <Input.Password placeholder="비밀번호 확인" onChange={(event) => { setConfPassword(event.target.value) }} />
                    </Form.Item>
                    <br></br>
                    <div style={{ display: 'flex' }}>
                        <button className={styles.buttonfield} type="primary">가입하기</button>
                        <p id={styles.error}>{error}</p>
                        <p id={styles.success}>{success}</p>

                    </div>
                </Form>
                <div id={styles.loginfooter}>
                    <span className={styles.descfield}>계정이 있으세요? </span><Link href="/" passHref><a className={styles.links}>로그인</a></Link> <br></br>
                    <span className={styles.descfield}>비밀번호를 잃어버리셨나요? </span><Link href="/forgotpass" passHref><a className={styles.links}>비밀번호 찾기</a></Link>
                </div>
            </NotLoggedinLayout>
        </>
    )
}

export default Register; 