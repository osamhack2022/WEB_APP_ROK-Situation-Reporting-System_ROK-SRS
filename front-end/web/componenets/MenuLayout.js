import { Layout, Menu, Button } from "antd";
import { HomeFilled, FileTextOutlined } from "@ant-design/icons";
import { RiOrganizationChart, RiLogoutBoxLine } from "react-icons/ri";
import {
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineSetting,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

import styles from "../styles/MenuLayout.module.css";

function MenuLayout(props) {
  const router = useRouter();
  const currentPath = router.pathname;

  const sideMenu = [
    {
      key: "home",
      icon: (
        <HomeFilled className={styles.menuIcon} style={{ fontSize: "18pt" }} />
      ),
      label: <span className={styles.menuLabel}>Home</span>,
    },
    {
      key: "orgchart",
      icon: <RiOrganizationChart className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>조직도</span>,
    },
    {
      key: "memonote",
      icon: (
        <FileTextOutlined
          className={styles.menuIcon}
          style={{ fontSize: "18pt" }}
        />
      ),
      label: <span className={styles.menuLabel}>메모 보고</span>,
    },
    {
      key: "messages",
      icon: <AiOutlineMessage className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>메세지</span>,
    },
    {
      key: "settings",
      icon: <AiOutlineSetting className={styles.menuIcon} />,
      label: <span className={styles.menuLabel}>설정</span>,
    },
  ];

  return (
    <Layout className={styles.bodyLayout}>
      <Layout.Sider className={styles.sideLayout} width="280px">
        <div className="sidebarMenu">
          <Menu
            className={styles.sidebar}
            style={{ width: "280px" }}
            mode="vertical"
            items={sideMenu}
            selectedKeys={currentPath.split("/")[1]}
            onSelect={({ key }) => router.push("/" + key)}
          />
          <Button
            className={styles.signoutButton}
            onClick={() => {
              deleteCookie("usercookie");
              router.replace("/");
            }}
          >
            <RiLogoutBoxLine className={styles.menuIcon} />
            로그아웃
          </Button>
        </div>
      </Layout.Sider>
      <Layout.Content className={styles.contentLayout}>
        {props.children}
      </Layout.Content>
    </Layout>
  );
}

export default MenuLayout;
