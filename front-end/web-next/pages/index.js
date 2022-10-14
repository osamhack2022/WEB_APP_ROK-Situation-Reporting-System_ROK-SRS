import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import NotLoggedinLayout from '../componenets/notloggedinlayout'
import { Avatar, Divider, List, Skeleton, Button, Input, Radio, message, Upload, Image, TreeSelect, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const backendroot = process.env.NEXT_PUBLIC_BACKEND_ROOT

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
    console.log(result)
    if (result.token) {
      setCookie('usercookie', result.token)
      router.push('/home')
    } else {
      setError(result.message)
    }
  }
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <NotLoggedinLayout>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>로그인</h1>
        <Form method="post" style={{ width: '400px', margin: 'auto' }} onFinish = {submitlogin}>
          <Form.Item name="군번" rules={[{ required: true, message: '군번을 입력해 주세요' }]}>
            <Input placeholder = "군번" onChange={(event) => { setDoDID(event.target.value) }} />
          </Form.Item>
          <Form.Item name="password" style = {{marginTop: '15px'}}rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}>
            <Input.Password placeholder = "비밀번호" onChange={(event) => { setPassword(event.target.value) }} />
          </Form.Item>
          <br></br>
          <Form.Item>
              <div style = {{display: 'flex'}}>
                  <button className={styles.buttonfield} type="primary">로그인</button>
                  <p id = {styles.error}>{error}</p>
              </div>
          </Form.Item>
        </Form>
        <div id={styles.loginfooter}>
          <span className={styles.descfield}>계정이 없으세요? </span><Link href="/register" passHref><a className={styles.links}>회원가입하기</a></Link> <br></br>
          <span className={styles.descfield}>비밀번호를 잃어버리셨나요? </span><Link href="/forgotpass" passHref><a className={styles.links}>비밀번호 찾기</a></Link>
        </div>
        <div id = {styles.demofooter}>
          <h2 id = {styles.demofooterh2}>데모</h2>
          <span className={styles.descfield}>대대장님 계정 데모: </span> <button>대대장 계정으로 로그인</button> <br></br>
          <span className={styles.desctext}>수도방위사령부 제1방공여단 3대대 대대장 중령 김기철의 계정을 채험해 보세요!</span> <br></br>
          <span className={styles.descfield}>용사 계정 데모: </span> <button>용사 계정으로 로그인</button> <br></br>
          <span className={styles.desctext}>수도방위사령부 제1방공여단 3대대에서 근무중인 상병 김형민의 계정을 채험해 보세요!</span> <br></br>

        </div>
      </NotLoggedinLayout>
    </>
  )
}
