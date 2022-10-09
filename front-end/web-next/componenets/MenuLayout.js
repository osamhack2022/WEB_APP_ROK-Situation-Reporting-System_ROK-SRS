import { Layout, Menu, Button } from 'antd';
import { HomeFilled, FileTextOutlined } from '@ant-design/icons';
import { RiOrganizationChart, RiLogoutBoxLine } from 'react-icons/ri';
import { AiOutlineMessage, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from "next/router"
import styles from '../styles/MenuLayout.module.css';

function MenuLayout(props) {
  const router = useRouter()
  const currentPath = router.pathname;

  const sideMenu = [
    {
      key: 'home',
      icon: <HomeFilled className={styles.menuIcon} style={{ fontSize: '18pt' }} />,
      label: <span className={styles.menuLabel}>Home</span>
    },
    {
      key: 'orgchart',
      icon: <RiOrganizationChart className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>조직도</span>
    },
    {
      key: 'memonote',
      icon: <FileTextOutlined className={styles.menuIcon} style={{ fontSize: '18pt' }} />,
      label: <span className={styles.menuLabel}>메모 보고</span>
    },
    {
      key: 'messeges',
      icon: <AiOutlineMessage className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>메세지</span>
    },
    {
      key: 'notifications',
      icon: <AiOutlineBell className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>알림</span>
    },
    {
      key: 'settings',
      icon: <AiOutlineSetting className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>설정</span>
    }
  ];

  if (props.exception && props.exception.includes(currentPath)) {
    return props.children;
  }

  return (
    <Layout className={styles.bodyLayout}>
      <Layout.Sider className={styles.sideLayout}>
        <div className="sidebarMenu">
          <Menu
            className={styles.sidebar}
            mode="vertical"
            items={sideMenu}
            selectedKeys={currentPath.substring(1, (currentPath.indexOf('/', 1) === -1 ? currentPath.length : currentPath.indexOf('/')))}
            onSelect={({ key }) => router.push('/' + key)}  
          />
        </div>
      </Layout.Sider>
      <Layout.Content className={styles.contentLayout}>
        {props.children}
      </Layout.Content>
    </Layout>
  )
}

export default MenuLayout;