import Head from 'next/head'
import Link from "next/link"
import MenuBar from '../../componenets/menubar'
import RegisterHeader from '../../componenets/registerheader';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"





const Settings = () => {
  
    return <>
        <MenuBar>
          <RegisterHeader></RegisterHeader>
            Hello!
        
        
        </MenuBar>
    </>
}

export default Settings; 