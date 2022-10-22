import Head from 'next/head'
import styles from '../styles/chat.module.css'
import Image from 'next/image'
import { Input, PageHeader, Button, Modal, Form } from 'antd';
import React, { useState } from 'react';
import { db } from '../firebaseauth'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, addDoc } from "@firebase/firestore"
import { decodeJwt } from 'jose';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { BsFillChatFill } from 'react-icons/bs';
import Addperson from './additionalpeople';

function getid() {
    const JWTtoken = getCookie('usercookie');
    const { id } = decodeJwt(JWTtoken)
    return id
}

function Menuelement(props) {
    const [snapshot, loading, error] = useCollection(collection(db, "chats"))

    if (loading || !snapshot) return <div>Loading...</div>

    const id = getid()
    const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(chat => chat.users.includes(id))
    const router = useRouter()
    const redirect = (id) => {
        router.push(`/messages/${id}`)

    }
    return (
        chats.map(thechat =>
            <div key={Math.random()} className={styles.menuelem} onClick={() => redirect(thechat.id)}>
                <div className={styles.imagecontainer}>
                    <Image style={{ borderRadius: '20px' }} width='50px' height='50px' src="https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67"></Image>
                </div>
                <div>
                    <div className={styles.firstrow}>
                        <h3 className={styles.menuelemtitle}>{thechat.name}</h3>
                        <p className={styles.date}>{new Date(thechat.rectime.seconds * 1000).toLocaleString([], { hourCycle: 'h23', year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <p className={styles.content}>
                        {thechat.users}
                    </p>
                </div>
            </div>
        )
    )
}
const Sidebar = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [addUser, setAddUser] = useState([]);
    const [errormsg, seterrormsg] = useState([]);

    const [chatTitle, setchatTitle] = useState([]);
    const [fetchedInvitedList, setFetchedInvitedList] = useState([]);


    let submitnewchat = async (event) => {
        console.log(chatTitle)
        console.log(addUser)
        try {
            await addDoc(collection(db, "chats"), {name: chatTitle, rectime: new Date(), users: [getid(), addUser[0].key]})
            setOpen(false);
        } catch {
            seterrormsg('Error when creating chat room')

        }

    }

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return <>
        <Head>
            <title>메세지</title>
        </Head>
        <PageHeader
            className="site-page-header"
            title="Messages"
            extra={[
                <button key="1" type="primary" className={styles.button} onClick={showModal}>
                    <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <BsFillChatFill style = {{height: '16px'}} /> &nbsp;채팅방 만들기
                    </div>
                </button>,
            ]}
            style={{ backgroundColor: "white", boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)' }}
        />
        <Modal title="채팅방 만들기" open={open} onCancel={handleCancel} footer={[]}>
            <Form onFinish={submitnewchat}>
                <h3>채팅방 이름</h3>
                <Form.Item name="채팅 이름" rules={[{ required: true }]}>
                    <Input style = {{width: '440px', marginBottom: '10px'}} onChange={(event) => { setchatTitle(event.target.value) }}></Input>
                </Form.Item>
                <h3>인원 추가</h3>
                <Addperson style = {{margin: '0px'}} addUser={addUser} setAddUser={setAddUser} fetchedInvitedList={fetchedInvitedList} setFetchedInvitedList = {setFetchedInvitedList}></Addperson>
                <div style  = {{display: 'flex', alignItems: 'center'}}>
                    <button className = {styles.button} style = {{marginTop: '20px'}} type="primary">채팅방 만들기</button>
                    <p className = {styles.error}>{errormsg}</p> 
                </div>
            </Form>
            
        </Modal>
        <div className={styles.flexcontainer}>
            <div className={styles.sidebar}>
                <Menuelement />
            </div>
            <div className={styles.chatroom}>
                {children}
            </div>

        </div>

    </>
}

export default Sidebar;