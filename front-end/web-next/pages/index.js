import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import NotLoggedinLayout from '../componenets/notloggedinlayout'
import { Input, Form } from 'antd';
import React, { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { encryptuser, decryptuser } from "../encryption/userencryption"

const backendroot = process.env.NEXT_PUBLIC_BACKEND_ROOT
//let val = encryptuser('a', 'b')
export default function Home() {
  const router = useRouter()
  const [DoDID, setDoDID] = useState();
  const [Password, setPassword] = useState();
  const [error, setError] = useState('');
  let endpoint = backendroot + 'api/user/login'
  let submitlogin = async (event) => {
    const data = {
      DoDID: DoDID,
      password: Password
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
    if (result.token) {
      setCookie('usercookie', result.token)
      router.push('/home')
    } else {
      if (result.message == '승인된 사용자이나 아직 등록되지 않았습니다. 계정 등록 후 이용해주세요.') {
        setError('계정 등록 후 이용해주세요.')
      } else {
        setError(result.message)
      }
    }
  }
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <NotLoggedinLayout>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>로그인</h1>
        <Form method="post" style={{ width: '400px', margin: 'auto' }} onFinish={submitlogin}>
          <Form.Item name="군번" rules={[{ required: true, message: '군번을 입력해 주세요' }]}>
            <Input placeholder="군번" onChange={(event) => { setDoDID(event.target.value) }} />
          </Form.Item>
          <Form.Item name="password" style={{ marginTop: '15px' }} rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}>
            <Input.Password placeholder="비밀번호" onChange={(event) => { setPassword(event.target.value) }} />
          </Form.Item>
          <br></br>
          <Form.Item>
            <div style={{ display: 'flex' }}>
              <button className={styles.buttonfield} type="primary">로그인</button>
              <p id={styles.error}>{error}</p>
            </div>
          </Form.Item>
        </Form>
        <div id={styles.loginfooter}>
          <span className={styles.descfield}>계정이 없으세요? </span><Link href="/register" passHref><a className={styles.links}>회원가입하기</a></Link> <br></br>
          <span className={styles.descfield}>비밀번호를 잃어버리셨나요? </span><Link href="/forgotpass" passHref><a className={styles.links}>비밀번호 찾기</a></Link>
        </div>
        <div id={styles.demofooter}>
          <h1 id={styles.demofooterh2}>프로젝트 데모</h1>
          <div className={styles.horizontalline}></div>
          <button className={styles.buttonfielddemo}>대대장 계정으로 로그인</button>
          <span className={styles.desctext}>수방사 제1방공여단 3대대 대대장 중령 김기철의 계정 채험하기!</span> <br></br>
          <button className={styles.buttonfielddemo}>용사 계정으로 로그인</button>
          <span className={styles.desctext}>수방 제1방공여단 3대대에서 근무중인 상병 김형민의 계정 채험하기!</span> <br></br>
        </div>
      </NotLoggedinLayout>
    </>
  )
}
