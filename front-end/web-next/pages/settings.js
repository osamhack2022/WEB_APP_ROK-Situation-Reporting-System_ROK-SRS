import Head from 'next/head'
import Link from "next/link"
import MenuBar from '../componenets/menubar'
import RegisterHeader from '../componenets/registerheader';
import { Dropdown, Menu, Space, PageHeader, Breadcrumb } from 'antd';
import styles from '../styles/settingsmenubar.module.css'
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"




const Settings = () => {
  
    return <>
            <PageHeader className="site-page-header" title="계정설정"
            breadcrumb={  
            <Breadcrumb>
                <Breadcrumb.Item style = {{color: 'black', cursor: 'pointer'}}>계정설정</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="settings/unit">부대설정</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item className = {styles.lastitem}>
                  <a href="settings/reportsystem">보고체계 설정</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a style = {{display: 'none'}}>hi</a>
                </Breadcrumb.Item>
              </Breadcrumb> } style={{backgroundColor: "white",  boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)'}}/>

        
        
    </>
}

export default Settings; 