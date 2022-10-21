import Sidebar from '../../componenets/Chatsidebar'
import Head from 'next/head'
import styles from '../../styles/chat.module.css'
import { PageHeader, Image } from 'antd';

function chatpage() {
    return <>
        <Sidebar></Sidebar>
    </>
}

export default chatpage;