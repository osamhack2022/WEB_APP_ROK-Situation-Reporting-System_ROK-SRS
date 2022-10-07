import Link from "next/link"
import MenuBar from '../componenets/menubar'
import { Dropdown, Menu, Space, Divider } from 'antd';
import { AiOutlineMessage, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"
import styles from '../styles/registerheader.module.css'


const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link target="_blank" rel="noopener noreferrer" href="/settings">
              <a style = {{fontSize: '20px'}}>
                개인계정 설정
              </a>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link target="_blank" rel="noopener noreferrer" href="/settings/unit">
              <a style = {{fontSize: '20px'}}>
                부대 설정
              </a>
            </Link>
          ),
        }
      ]}
    />
  );

   

const RegisterHeader = () => {
  const { pathname } = useRouter()
  console.log(pathname) 
    return <>
    <div style = {{display: "flex", height: "44px", paddingTop: '10px'}}>
        <AiOutlineSetting className={styles.icons}/>
        <h1 style = {{fontWeight: 'bold', marginLeft: '10px'}}>세팅</h1>
        <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()} style = {{fontSize: '25px', lineHeight: '44px', marginLeft: '40px'}}>
                <Space>
                    {pathname === '/settings' ? <span>개인계정 설정</span> : <span>부대 설정</span>}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    </div>
    <div className = {styles.line} style = {{marginTop: '10px'}}></div>
       
        
        
    </>
}

export default RegisterHeader; 