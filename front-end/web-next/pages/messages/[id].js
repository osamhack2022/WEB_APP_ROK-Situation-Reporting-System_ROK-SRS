import Chatpage from '../messages'
import Head from 'next/head'
import { Avatar, Form, Select, Input } from 'antd';
import styles from '../../styles/chatpage.module.css'
import React, { useState } from 'react';
import { useRouter } from "next/router"
import { collection, query } from "@firebase/firestore"
import { getCookie } from 'cookies-next';
import { decodeJwt } from 'jose';

import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { orderBy } from 'firebase/firestore';
import { db } from '../../firebaseauth'


function getid() {
    const JWTtoken = getCookie('usercookie');
    const { id } = decodeJwt(JWTtoken)
    return id
}

function chatpage() {
    const [messagetype, setmessagetype] = useState('regular');
    const [message, setmessage] = useState('regular');

    const router = useRouter()
    const { id } = router.query

    const [snapshot, loading, error] = useCollection(collection(db, "chats"))
    if (loading || !snapshot || !id) return <div>Loading...</div>
    let chatdata = null
    for (let i = 0; i < snapshot.docs.length; i++) {
        if (snapshot.docs[i].id == id) {
            chatdata = snapshot.docs[i].data()
        }
    }
    function Getparticipants() {
        let userdatas = chatdata['userdata']
        return Object.entries(userdatas).map(([key, value]) => <Avatar key={key} style={{ backgroundColor: value.color, }}> {value.name} </Avatar>)
    }
    function Getparticipantbyid(id) {
        let userdatas = chatdata['userdata']
        for (const [key, value] of Object.entries(userdatas)) {
            if (key == id) {
                return value
            }
        }
    }
    function Generatechat({ id }) {
        const q = query(collection(db, "chats", id, "messages"), orderBy("timestamp"))
        const [messages, loading, error] = useCollectionData(q)
        if (loading || !messages) return <div>Loading...</div>
    
        return messages.map(message => {
            let participant = Getparticipantbyid(message.sender)
            if (message.sender != getid()) {
                return generatechatelement('theirs', message.type, message.text, participant.name, participant.color)
            } else {
                return generatechatelement('mine', message.type, message.text, participant.name, participant.color)
    
            }
        })
    
    }
    return <>
        <Chatpage>
            <div className = {styles.container}>

            <div className={styles.header}>
                <div style={{ width: '90%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 className={styles.title}>{chatdata.name}</h1>
                    <div className={styles.participants}>
                        <h3>참가자: </h3>
                        <Avatar.Group>
                            <Getparticipants></Getparticipants>
                        </Avatar.Group>
                    </div>
                </div>
            </div>
            <div className={styles.chatarea} style = {{flex: '1'}}>
                <Generatechat id={id} />
            </div>
            <div className = {styles.footer}>
                <Form style  = {{display: 'flex', alignItems: 'center', width: '90%', height: '55px', margin: 'auto'}}>
                <Select showSearch value = {messagetype} placeholder="메세지 종류" optionFilterProp="children" style={{ width: '140px' }}

                    onChange={(event) => { setmessagetype(event.value) }}
                >
                    <Option value="regular">일반메세지</Option>
                    <Option value="report">상황보고</Option>
                    <Option value="order">지시사항</Option>
                    <Option value="secret">암구호</Option>
                </Select>
                <Input  onChange={(event) => { setmessage(event.target.value) }} placeholder="Basic usage"/>
                </Form>
            </div>
            </div>


        </Chatpage>
    </>
}

function generatechatelement(which, type, content, name, color) {
    if (which == 'mine') {
        if (type == 'regular') {
            return <>
                <div className={styles.mychatelem}>
                    {content}
                </div>
            </>
        } else if (type == 'report') {
            return <>
                <div className={styles.mychatelem}>
                    <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[상황보고]</p>
                    {content}
                </div>
            </>
        } else if (type == 'order') {
            return <>
                <div className={styles.mychatelem}>
                    <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[지시사항]</p>
                    {content}
                </div>
            </>
        } else if (type == 'secret') {
            function ScretText({ content }) {
                const [isVisible, setIsVisible] = useState(false)

                return <div className={styles.mychatelem} onClick={() => setIsVisible(p => !p)} style={{ cursor: 'pointer' }}>
                    <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[기밀사항]</p>
                    {isVisible ? content : <>
                        클릭해 주세요.</>}
                </div>
            }

            return <ScretText content={content} />

        }

    } else if (which == 'theirs') {
        if (type == "regular") {
            return <>
                <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <div className={styles.theirchatelem}>
                        {content}
                    </div>
                    <div style = {{width: '50px', display: 'flex', flexDirection: 'column'}}>
                        <Avatar style={{ backgroundColor: color, margin: 'auto' }}> {name} </Avatar>
                        <div style={{ margin: 0, margin: 'auto' }}>{name}</div>
                    </div>

                </div>
            </>

        }

        else if (type == 'report') {
            return <>
                <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <div className={styles.theirchatelem}>
                        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[상황보고]</p>
                        {content}
                    </div>
                    <div style = {{width: '50px', display: 'flex', flexDirection: 'column'}}>
                        <Avatar style={{ backgroundColor: color, margin: 'auto' }}> {name} </Avatar>
                        <div style={{ margin: 0, margin: 'auto' }}>{name}</div>
                    </div>

                </div>
            </>
        } else if (type == 'order') {
            return <>
                <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <div className={styles.theirchatelem}>
                        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[지시사항]</p>
                        {content}
                    </div>
                    <div style = {{width: '50px', display: 'flex', flexDirection: 'column'}}>
                        <Avatar style={{ backgroundColor: color, margin: 'auto'}}> {name} </Avatar>
                        <div style={{ margin: 0, margin: 'auto' }}>{name}</div>
                    </div>

                </div>
            </>
        } else if (type == 'secret') {
            function ScretText({ content }) {
                const [isVisible, setIsVisible] = useState(false)

                return <><div onClick={() => setIsVisible(p => !p)} style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end', cursor: 'pointer' }}>
                    <div className={styles.theirchatelem}>
                        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[기밀사항]</p>
                        {isVisible ? content : <>
                            클릭해 주세요.</>}
                    </div>
                    <div style = {{width: '50px'}}>
                        <Avatar style={{ backgroundColor: color, margin: 'auto' }}> {name} </Avatar>
                        <div style={{ margin: 0, margin: 'auto' }}>{name}</div>
                    </div>
                </div></>

            }

            return <ScretText content={content} />

        }


    }

}

export default chatpage;