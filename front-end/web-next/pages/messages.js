import Sidebar from '../componenets/Chatsidebar'
import Head from 'next/head'
import { PageHeader, Image } from 'antd';

function Chatpage({children}) {
    return <>
        <Sidebar>{children}</Sidebar>
</>
}

export default Chatpage;