import Head from 'next/head'
import Link from "next/link"
import MenuBar from '../../componenets/menubar'
import RegisterHeader from '../../componenets/registerheader';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"
import styles from '../../styles/unitsettings.module.css'






const UnitSettings = () => {
  
    return <>
        <MenuBar>
            <div className = {styles.background}>
                <RegisterHeader></RegisterHeader>
                <div className = {styles.line} style = {{marginTop: '10px'}}></div>
                <form className = {styles.formarea}>

                </form>

            </div>
        
        
        </MenuBar>
    </>
}

export default UnitSettings; 