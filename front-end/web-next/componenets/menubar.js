import styles from '../styles/menubar.module.css'
import Link from "next/link"
import { HomeFilled, TeamOutlined } from '@ant-design/icons';

const links = [
    {
        href: "/userhome",
        icon: HomeFilled,
        label: "Home"
    },
    {
        href: "/userhome",
        icon: TeamOutlined,
        label: "조직도"
    },
    {
        href: "/userhome",
        icon: HomeFilled,
        label: "메모보고"
    },
    {
        href: "/userhome",
        icon: HomeFilled,
        label: "메세지"
    },
    {
        href: "/userhome",
        icon: HomeFilled,
        label: "알림"
    },
    {
        href: "/userhome",
        icon: HomeFilled,
        label: "세팅"
    }
]

const MenuBar = ({ children }) => {
    return (
        <>
            <div className={styles.menubar}>
                {links.map(({
                    href,
                    icon: Icon,
                    label
                }, i) =>
                    <Link href={href} >
                        <a className={styles.menuitem} style={{
                            marginTop: i === 0 || i === 1 ? '55px' : '32px'

                        }}>
                            <Icon className={styles.icons} />
                            <span>{label}</span>
                        </a>
                    </Link>
                )}


            </div>
            <div id={styles.child}>
                {children}
            </div>
        </>
    )
}
export default MenuBar;