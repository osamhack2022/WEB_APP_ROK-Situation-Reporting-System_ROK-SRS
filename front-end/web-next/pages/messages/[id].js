import Sidebar from '../../componenets/Chatsidebar'
import Chatpage from '../messages'
import Head from 'next/head'
import { Avatar, Divider, Tooltip, Button, Popover } from 'antd';
import styles from '../../styles/chatpage.module.css'
import { PageHeader, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router"


function chatpage() {
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    return <>
        <Chatpage>
            <div className={styles.header}>
                <h1 className={styles.title}>Hi!</h1>
                <div className={styles.participants}>
                    <h3>Participants: </h3>
                    <Avatar.Group>
                        <Avatar style={{ backgroundColor: '#F5F5F5', }}> 상영 </Avatar>
                        <Avatar style={{ backgroundColor: '#f56a00', }}> K </Avatar>
                        <Avatar style={{ backgroundColor: '#f56a00', }}> K </Avatar>

                    </Avatar.Group>

                </div>

            </div>
            <div className={styles.chatarea}>
                {generatechatelement('mine', 'regular', 'helloworld!')}
                {generatechatelement('mine', 'report', 'helloworld!')}

                {generatechatelement('theirs', 'regular', 'ajsdf;lahf')}
                {generatechatelement('mine', 'secret', 'ajsdf;lahf')}
                {generatechatelement('theirs', 'secret', 'ajsdf;lahf')}



            </div>

        </Chatpage>
    </>
}

function generatechatelement(which, type, content) {
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
                    <div>
                        <Avatar style={{ backgroundColor: '#F5F5F5', }}> 상영 </Avatar>
                        <div style={{ margin: 0 }}>상영</div>
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
                    <div>
                        <Avatar style={{ backgroundColor: '#F5F5F5', }}> 상영 </Avatar>
                        <div style={{ margin: 0 }}>상영</div>
                    </div>

                </div>
            </>
        } else if (type == 'order') {
            return <>
                <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <div className={styles.theirchatelem}>
                        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>[상황보고]</p>
                        {content}
                    </div>
                    <div>
                        <Avatar style={{ backgroundColor: '#F5F5F5', }}> 상영 </Avatar>
                        <div style={{ margin: 0 }}>상영</div>
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
                    <div>
                        <Avatar style={{ backgroundColor: '#F5F5F5', }}> 상영 </Avatar>
                        <div style={{ margin: 0 }}>상영</div>
                    </div>
                </div></>

            }

            return <ScretText content={content} />

        }


    }

}

export default chatpage;