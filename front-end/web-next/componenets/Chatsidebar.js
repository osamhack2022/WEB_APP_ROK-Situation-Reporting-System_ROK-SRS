import Head from 'next/head'
import styles from '../styles/chat.module.css'
import { PageHeader, Image } from 'antd';
import { db } from '../firebaseauth'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection } from "@firebase/firestore"
import { decodeJwt, jwtVerify } from 'jose';
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'

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
const Sidebar = () => {
    return <>
        <Head>
            <title>메세지</title>
        </Head>
        <PageHeader
            className="site-page-header"
            title="Messages"
            style={{ backgroundColor: "white", boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)' }}
        />
        <div className={styles.flexcontainer}>
            <div className={styles.sidebar}>
                <Menuelement/>
            </div>
        </div>

    </>
}

export default Sidebar;