import styles from '../styles/menubar.module.css'
import Link from "next/link"
import { HomeFilled, TeamOutlined } from '@ant-design/icons';
import { RiOrganizationChart, RiLogoutBoxLine } from 'react-icons/ri';
import { GrNotes } from 'react-icons/gr';
import { AiOutlineMessage, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';


const links = [
    {
        href: "/userhome",
        icon: HomeFilled,
        label: "Home"
    },
    {
        href: "/userhome",
        icon: RiOrganizationChart,
        label: "조직도"
    },
    {
        href: "/userhome",
        icon: GrNotes,
        label: "메모보고"
    },
    {
        href: "/userhome",
        icon: AiOutlineMessage,
        label: "메세지"
    },
    {
        href: "/userhome",
        icon: AiOutlineBell,
        label: "알림"
    },
    {
        href: "/userhome",
        icon: AiOutlineSetting,
        label: "세팅"
    }, 
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
                            marginTop: i === 0 || i === 1 ? '40px' : '12px'

                        }}>
                            <Icon className={styles.icons} />
                            <span>{label}</span>
                        </a>
                    </Link>
                )}
                <Link href = "/userhome">
                    <a className={styles.logoutitem}>
                        <RiLogoutBoxLine></RiLogoutBoxLine>
                        <span>로그아웃</span>
                    </a>
                </Link>


            </div>
            <div id={styles.child}>
                {children}
            </div>
        </>
    )
}
export default MenuBar;