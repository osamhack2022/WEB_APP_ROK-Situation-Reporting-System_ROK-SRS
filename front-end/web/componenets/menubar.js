import styles from '../styles/menubar.module.css'
import Link from "next/link"
import { HomeFilled } from '@ant-design/icons';
import { RiOrganizationChart, RiLogoutBoxLine } from 'react-icons/ri';
import { GrNotes } from 'react-icons/gr';
import { AiOutlineMessage, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from "next/router"


const links = [
    {
        href: "/home",
        icon: HomeFilled,
        label: "Home"
    },
    {
        href: "/orgchart",
        icon: RiOrganizationChart,
        label: "조직도"
    },
    {
        href: "/memonote",
        icon: GrNotes,
        label: "메모보고"
    },
    {
        href: "/messages",
        icon: AiOutlineMessage,
        label: "메세지"
    },
    {
        href: "/notifications",
        icon: AiOutlineBell,
        label: "알림"
    },
    {
        href: "/settings",
        icon: AiOutlineSetting,
        label: "세팅"
    },
]

const MenuBar = ({ children }) => {
    let { pathname } = useRouter()
    pathname = "/" + pathname.split('/')[1]

    return (
        <>
        <div className = {styles.parentdiv}>

            <div className={styles.menubar}>
                {links.map(({
                    href,
                    icon: Icon,
                    label
                }, i) =>
                    <Link href={href} key={href}>
                        <a className={styles.menuitem} style={{
                            ...(pathname === href ? { backgroundColor: "#015c4d" } : {}),
                            marginTop: i === 0 || i === 1 ? '40px' : '12px'
                        }}>
                            <Icon className={styles.icons} />
                            <span>{label}</span>
                        </a>
                    </Link>
                )}
                <Link href="/logout">
                    <a className={styles.logoutitem}>
                        <RiLogoutBoxLine></RiLogoutBoxLine>
                        <span>로그아웃</span>
                    </a>
                </Link>


            </div>
            <div id={styles.child}>
                {children}
            </div>
        </div>
        </>
    )
}
export default MenuBar;