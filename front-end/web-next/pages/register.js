import NotLoggedinLayout from '../componenets/notloggedinlayout'
import styles from '../styles/register.module.css'
import Head from 'next/head'
import Link from "next/link"
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Button, Input, Radio, message, Upload, Image, TreeSelect, Form } from 'antd';
import { useRouter } from 'next/router';



const Register = () => {
    const router = useRouter()
    const [Name, setName] = useState();
    const [DoDID, setDoDID] = useState();
    const [Invcode, setInvcode] = useState();
    const [Password, setPassword] = useState(); 
    const [ConfPassword, setConfPassword] = useState(); 
    const [error, setError] = useState('');

    let registeruser = async (event) => {
        console.log("hi")
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
    }
    return (
        <>
        <Head>
            <title>회원가입</title>
        </Head>
        <NotLoggedinLayout>
            <h1 style = {{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>회원가입</h1>
            <Form method="post" style={{ width: '400px', margin: 'auto' }} onFinish = {registeruser}>
                <Form.Item name="이름" rules={[{ required: true, message: '이름을 입력해 주세요' }]}>
                    <Input placeholder = "이름" onChange={(event) => { setName(event.target.value) }} />
                </Form.Item>
                <br></br>
                <Form.Item name="군번" rules={[{ required: true, message: '군번을 입력해 주세요' }]}>
                    <Input placeholder = "군번" onChange={(event) => { setDoDID(event.target.value) }} />
                </Form.Item>
                <span className={styles.inputdesc}>22-xxxxxxxx 양식으로 입력</span>
                <br></br>
                <Form.Item name="초대코드" rules={[{ required: true, message: '초대코드를 입력해 주세요' }]}>
                    <Input placeholder = "초대 코드" onChange={(event) => { setInvcode(event.target.value) }} />
                </Form.Item>
                <span className={styles.inputdesc}>부대에서 받은 초대코드 이용</span>
                <br></br>
                <Form.Item name="비밀번호" rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}>
                    <Input placeholder = "비밀번호" onChange={(event) => { setPassword(event.target.value) }} />
                </Form.Item>
                <span className={styles.inputdesc}>8자리 이상 비밀번호 사용</span>
                <br></br>
                <Form.Item name="확인비밀번호" rules={[{ required: true, message: '비밀번호 확인 입력해 주세요'}, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('비밀번호') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
            },
          }),] }>
                    <Input placeholder = "비밀번호 확인" onChange={(event) => { setConfPassword(event.target.value) }} />
                </Form.Item>
                <br></br>
                <div style = {{display: 'flex'}}>
                  <button className={styles.buttonfield} type="primary">가입하기</button>
                  <p id = {styles.error}>{error}</p>
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